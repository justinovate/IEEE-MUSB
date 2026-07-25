-- ==============================================================================
-- IEEE-MUSB HUB: SUPABASE POSTGRESQL DATABASE SCHEMA & POLICIES
-- Organization: IEEE - Mapúa University Student Branch (IEEE-MUSB)
-- Established: 2002 | Location: Muralla St., Intramuros, Manila, Philippines
-- ==============================================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. ENUM TYPES
-- ------------------------------------------------------------------------------

CREATE TYPE user_status AS ENUM ('Active', 'Expiring', 'Expired');

CREATE TYPE user_role AS ENUM (
    'Non-member',
    'SB_Member',
    'IEEE_Intl_Member',
    'Officer',
    'Admin'
);

CREATE TYPE announcement_category AS ENUM (
    'General',
    'Event',
    'Academic',
    'Opportunity',
    'Urgent'
);

CREATE TYPE event_status AS ENUM ('Upcoming', 'Ongoing', 'Completed', 'Cancelled');

CREATE TYPE event_category AS ENUM (
    'Workshop',
    'Seminar',
    'Technical',
    'Social',
    'Competition',
    'General Assembly'
);

-- ------------------------------------------------------------------------------
-- 2. TABLES DEFINITIONS
-- ------------------------------------------------------------------------------

-- A. PROFILES TABLE (Extends auth.users)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    student_number TEXT,
    program TEXT, -- e.g., 'CpE', 'EE', 'ECE', 'CS', 'IT'
    year_level INT CHECK (year_level BETWEEN 1 AND 5),
    ieee_membership_no TEXT,
    status user_status NOT NULL DEFAULT 'Active',
    role user_role NOT NULL DEFAULT 'Non-member',
    volunteer_hours NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- B. COMMITTEES TABLE
CREATE TABLE public.committees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- C. OFFICERS TABLE
CREATE TABLE public.officers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    full_name TEXT NOT NULL,
    committee_name TEXT NOT NULL REFERENCES public.committees(name) ON UPDATE CASCADE ON DELETE RESTRICT,
    position_title TEXT NOT NULL,
    term_start DATE NOT NULL,
    term_end DATE,
    photo_url TEXT,
    is_current BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- D. ANNOUNCEMENTS TABLE
CREATE TABLE public.announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category announcement_category NOT NULL DEFAULT 'General',
    is_pinned BOOLEAN NOT NULL DEFAULT FALSE,
    image_url TEXT,
    author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- E. EVENTS TABLE
CREATE TABLE public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    poster_url TEXT,
    venue TEXT NOT NULL,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    capacity INT CHECK (capacity > 0),
    status event_status NOT NULL DEFAULT 'Upcoming',
    category event_category NOT NULL DEFAULT 'Technical',
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 3. SEEDING REQUIRED COMMITTEES
-- ------------------------------------------------------------------------------

INSERT INTO public.committees (name, description) VALUES
    ('Executive Committee', 'Top leadership responsible for overall branch administration and strategy.'),
    ('Board of Directors', 'Advisory and oversight body providing governance and strategic direction.'),
    ('Finance', 'Manages branch budget, sponsorships, financial records, and resource allocation.'),
    ('Membership', 'Oversees student recruitment, membership renewals, orientation, and member welfare.'),
    ('Program', 'Plans and organizes technical workshops, seminars, competitions, and flagship events.'),
    ('Publicity', 'Handles brand identity, social media presence, graphics, press releases, and outreach.'),
    ('Research and Development', 'Drives technical innovation, student projects, hackathons, and research initiatives.')
ON CONFLICT (name) DO NOTHING;

-- ------------------------------------------------------------------------------
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.committees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.officers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- PROFILES POLICIES
CREATE POLICY "Public profiles are viewable by everyone" 
    ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" 
    ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
    ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can update any profile" 
    ON public.profiles FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role IN ('Admin', 'Officer')
        )
    );

-- COMMITTEES POLICIES
CREATE POLICY "Committees are viewable by everyone" 
    ON public.committees FOR SELECT USING (true);

CREATE POLICY "Officers and Admins can manage committees" 
    ON public.committees FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role IN ('Admin', 'Officer')
        )
    );

-- OFFICERS POLICIES
CREATE POLICY "Officers list is viewable by everyone" 
    ON public.officers FOR SELECT USING (true);

CREATE POLICY "Officers and Admins can manage officers" 
    ON public.officers FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role IN ('Admin', 'Officer')
        )
    );

-- ANNOUNCEMENTS POLICIES
CREATE POLICY "Announcements are viewable by everyone" 
    ON public.announcements FOR SELECT USING (true);

CREATE POLICY "Officers and Admins can manage announcements" 
    ON public.announcements FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role IN ('Admin', 'Officer')
        )
    );

-- EVENTS POLICIES
CREATE POLICY "Events are viewable by everyone" 
    ON public.events FOR SELECT USING (true);

CREATE POLICY "Officers and Admins can manage events" 
    ON public.events FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role IN ('Admin', 'Officer')
        )
    );

-- ------------------------------------------------------------------------------
-- 5. SUPABASE STORAGE BUCKETS & POLICIES
-- ------------------------------------------------------------------------------

-- Create Storage Buckets
INSERT INTO storage.buckets (id, name, public) VALUES 
    ('officer-photos', 'officer-photos', true),
    ('announcement-images', 'announcement-images', true),
    ('event-posters', 'event-posters', true)
ON CONFLICT (id) DO NOTHING;

-- Public Storage Access Policies
CREATE POLICY "Public Read Access for Officer Photos" 
    ON storage.objects FOR SELECT 
    USING (bucket_id = 'officer-photos');

CREATE POLICY "Public Read Access for Announcement Images" 
    ON storage.objects FOR SELECT 
    USING (bucket_id = 'announcement-images');

CREATE POLICY "Public Read Access for Event Posters" 
    ON storage.objects FOR SELECT 
    USING (bucket_id = 'event-posters');

-- Officer/Admin Storage Upload Policies
CREATE POLICY "Authorized Uploads for Officer Photos" 
    ON storage.objects FOR INSERT 
    WITH CHECK (
        bucket_id = 'officer-photos' AND 
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('Admin', 'Officer'))
    );

CREATE POLICY "Authorized Uploads for Announcement Images" 
    ON storage.objects FOR INSERT 
    WITH CHECK (
        bucket_id = 'announcement-images' AND 
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('Admin', 'Officer'))
    );

CREATE POLICY "Authorized Uploads for Event Posters" 
    ON storage.objects FOR INSERT 
    WITH CHECK (
        bucket_id = 'event-posters' AND 
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('Admin', 'Officer'))
    );

-- ------------------------------------------------------------------------------
-- 6. AUTOMATIC TRIGGER FOR NEW USERS
-- ------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, avatar_url, role, status)
    VALUES (
        new.id,
        COALESCE(new.raw_user_meta_data->>'full_name', new.email),
        new.raw_user_meta_data->>'avatar_url',
        'Non-member',
        'Active'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger to auto-update updated_at field
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_officers_updated_at BEFORE UPDATE ON public.officers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON public.announcements FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
