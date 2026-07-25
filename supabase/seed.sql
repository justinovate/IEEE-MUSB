-- ==============================================================================
-- IEEE-MUSB HUB: SUPERADMIN SEED SCRIPT
-- Superadmin: Justin Andre De Leon
-- Email: webdev.ieeemusb@gmail.com
-- Role: Admin (Sole Superadmin)
-- Position: Web Developer
-- Committee: Research and Development
-- ==============================================================================

-- Enable pgcrypto for password hashing
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DO $$
DECLARE
    superadmin_uid UUID := '00000000-0000-0000-0000-000000000001';
BEGIN
    -- 1. Insert Superadmin User into auth.users (if not already exists)
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'webdev.ieeemusb@gmail.com') THEN
        INSERT INTO auth.users (
            id,
            instance_id,
            email,
            encrypted_password,
            email_confirmed_at,
            raw_app_meta_data,
            raw_user_meta_data,
            created_at,
            updated_at,
            role,
            aud
        ) VALUES (
            superadmin_uid,
            '00000000-0000-0000-0000-000000000000',
            'webdev.ieeemusb@gmail.com',
            crypt('ItripsMUSB2026', gen_salt('bf')),
            NOW(),
            '{"provider": "email", "providers": ["email"]}',
            '{"full_name": "Justin Andre De Leon", "role": "Admin"}',
            NOW(),
            NOW(),
            'authenticated',
            'authenticated'
        );
    ELSE
        SELECT id INTO superadmin_uid FROM auth.users WHERE email = 'webdev.ieeemusb@gmail.com';
    END IF;

    -- 2. Upsert Superadmin Profile in public.profiles
    INSERT INTO public.profiles (
        id,
        full_name,
        student_number,
        program,
        year_level,
        ieee_membership_no,
        status,
        role,
        volunteer_hours,
        avatar_url,
        created_at,
        updated_at
    ) VALUES (
        superadmin_uid,
        'Justin Andre De Leon',
        '2022109876',
        'CpE',
        4,
        'IEEE-99887766',
        'Active',
        'Admin',
        120.50,
        'https://api.dicebear.com/7.x/avataaars/svg?seed=JustinDeLeon',
        NOW(),
        NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        role = 'Admin',
        status = 'Active',
        updated_at = NOW();

    -- 3. Insert Officer Roster Entry under Research and Development Committee
    INSERT INTO public.officers (
        user_id,
        full_name,
        committee_name,
        position_title,
        term_start,
        photo_url,
        is_current
    ) VALUES (
        superadmin_uid,
        'Justin Andre De Leon',
        'Research and Development',
        'Web Developer',
        '2026-01-01',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=JustinDeLeon',
        TRUE
    )
    ON CONFLICT DO NOTHING;

END $$;
