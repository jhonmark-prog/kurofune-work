import type { Profile, Experience, Education } from '../types/profile.types';

export const GENDER_OPTIONS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
  { label: 'Prefer not to say', value: 'prefer_not_to_say' },
] as const;

export const VISA_TYPE_OPTIONS = [
  { label: 'Specified Skilled Worker', value: 'Specified Skilled Worker' },
  { label: 'Engineer/Specialist in Humanities/Intl. Services', value: 'Engineer/Specialist in Humanities/Intl. Services' },
  { label: 'Working Holiday', value: 'Working Holiday' },
  { label: 'Student Visa', value: 'Student Visa' },
  { label: 'Others', value: 'Others' },
] as const;

export const COMPLETION_REQUIRED_FIELDS: (keyof Profile)[] = [
  'full_name',
  'email',
  'phone',
  'location',
  'job_title',
  'nationality',
];

export const DUMMY_PROFILE: Profile = {
  id: '1',
  full_name: 'Zaira Cadainggan',
  email: 'zaira@email.com',
  job_title: 'UX Designer',
  nationality: 'Philippines',
  phone: '000-0000-0000',
  location: 'Nagoya, Aichi',
  about_me:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  gender: 'female',
  current_visa_type: 'Engineer/Specialist in Humanities/Intl. Services',
  avatar_url: null,
  cv_url: null,
  cv_filename: 'zaira_cadainggan_resume.pdf',
  cv_uploaded_at: 'Nov 17 2025',
  completion_pct: 100,
};

export const DUMMY_EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    job_title: 'English Tutor',
    company: 'ABC University',
    start_date: 'Dec 2019',
    end_date: 'Nov 2024',
    is_current: false,
    description: null,
  },
  {
    id: 'exp-2',
    job_title: 'Associate Faculty',
    company: 'XYZ Academy',
    start_date: 'May 2018',
    end_date: 'May 2019',
    is_current: false,
    description: null,
  },
];

export const DUMMY_EDUCATIONS: Education[] = [
  {
    id: 'edu-1',
    degree: 'Masters in Education',
    institution: 'De La Salle University',
    graduation_year: 'May 2019',
    is_current: false,
  },
  {
    id: 'edu-2',
    degree: 'BS Information Technology',
    institution: 'La Salle University',
    graduation_year: 'Mar 2017',
    is_current: false,
  },
];

export const EMPTY_EXPERIENCE: Omit<Experience, 'id'> = {
  job_title: '',
  company: '',
  start_date: '',
  end_date: '',
  is_current: false,
  description: '',
};

export const EMPTY_EDUCATION: Omit<Education, 'id'> = {
  degree: '',
  institution: '',
  graduation_year: '',
  is_current: false,
};