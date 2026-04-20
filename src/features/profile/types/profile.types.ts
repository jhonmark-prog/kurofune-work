export interface Profile {
  id: string;
  full_name: string;
  email: string;
  job_title: string | null;
  nationality: string | null;
  phone: string | null;
  location: string | null;
  about_me: string | null;
  gender: string | null;
  current_visa_type: string | null;
  avatar_url: string | null;
  cv_url: string | null;
  cv_filename: string | null;
  cv_uploaded_at: string | null;
  completion_pct: number;
}

export interface Experience {
  id: string;
  job_title: string;
  company: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  description: string | null;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  graduation_year: string | null;
  is_current: boolean;
}

export type ProfileEditTab = 'Personal' | 'Experience' | 'Education';

export type ProfileStatus = 'idle' | 'loading' | 'succeeded' | 'failed';