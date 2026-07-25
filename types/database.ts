/**
 * IEEE-MUSB Hub: Database TypeScript Models
 * Organization: IEEE - Mapúa University Student Branch (IEEE-MUSB)
 * Scope: Strictly Mapúa School of EECE Students (EE, ECE, CpE)
 */

export type UserStatus = 'Active' | 'Expiring' | 'Expired' | 'Inactive';

export type UserRole =
  | 'Non-member'
  | 'SB_Member'
  | 'IEEE_Intl_Member'
  | 'Officer'
  | 'Admin';

export type EECEProgram = 'EE' | 'ECE' | 'CpE';

export type AnnouncementCategory =
  | 'General'
  | 'Workshops'
  | 'Competitions'
  | 'Membership Notices'
  | 'Urgent';

export type EventStatus = 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';

export type EventCategory =
  | 'Workshop'
  | 'Seminar'
  | 'Technical'
  | 'Social'
  | 'Competition';

export type CommitteeName =
  | 'Executive Committee'
  | 'Board of Directors'
  | 'Finance Committee'
  | 'Membership Committee'
  | 'Program Committee'
  | 'Publicity Committee'
  | 'Research & Development Committee';

export interface Profile {
  id: string;
  full_name: string;
  student_number?: string | null;
  program?: EECEProgram | string | null; // Strictly Mapúa EECE: 'EE', 'ECE', 'CpE'
  year_level?: number | null; // 1 - 5
  ieee_membership_no?: string | null;
  status: UserStatus;
  role: UserRole;
  volunteer_hours: number;
  avatar_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Committee {
  id: string;
  name: CommitteeName | string;
  description?: string | null;
  created_at: string;
}

export interface Officer {
  id: string;
  user_id?: string | null;
  full_name: string;
  committee_name: CommitteeName | string;
  position_title: string;
  term_start: string;
  term_end?: string | null;
  photo_url?: string | null;
  is_current: boolean;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<Profile>;
        Update: Partial<Profile>;
      };
      committees: {
        Row: Committee;
        Insert: Partial<Committee>;
        Update: Partial<Committee>;
      };
      officers: {
        Row: Officer;
        Insert: Partial<Officer>;
        Update: Partial<Officer>;
      };
    };
  };
}
