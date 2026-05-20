import type { Job, JobFilters } from '../types/browse.types';

export const DUMMY_JOBS: Job[] = [
  {
    id: '1',
    title: 'English Teacher',
    company_name: 'BlackShip Inc.',
    location: 'Nagoya, Aichi',
    prefecture: 'Aichi-ken',
    salary_min: 250000,
    posted_at: '1d ago',
    thumbnail_url: null,
    industry: 'Education',
    visa_type: ['Specified Skilled Worker'],
    is_saved: false,
  },
  {
    id: '2',
    title: 'Software Engineer',
    company_name: 'Tech Innovators',
    location: 'Tokyo, Tokyo',
    prefecture: 'Tokyo',
    salary_min: 500000,
    posted_at: '3d ago',
    thumbnail_url: null,
    industry: 'IT',
    visa_type: ['Engineer/Specialist in Humanities/Intl. Services'],
    is_saved: false,
  },
  {
    id: '3',
    title: 'Graphic Designer',
    company_name: 'Creative Minds',
    location: 'Osaka, Osaka',
    prefecture: 'Osaka',
    salary_min: 300000,
    posted_at: '5d ago',
    thumbnail_url: null,
    industry: 'Design',
    visa_type: ['Specified Skilled Worker'],
    is_saved: true,
  },
  {
    id: '4',
    title: 'Data Analyst',
    company_name: 'Insight Corp.',
    location: 'Yokohama, Kanagawa',
    prefecture: 'Kanagawa',
    salary_min: 400000,
    posted_at: '2d ago',
    thumbnail_url: null,
    industry: 'IT',
    visa_type: ['Others'],
    is_saved: false,
  },
  {
    id: '5',
    title: '251210_Specified Skilled Worker...',
    company_name: 'Accel One Co., Ltd.',
    location: 'Aichi Prefecture, Shizuo...',
    prefecture: 'Aichi-ken',
    salary_min: 250000,
    posted_at: '1d ago',
    thumbnail_url: null,
    industry: 'Manufacturing',
    visa_type: ['Specified Skilled Worker'],
    is_saved: false,
  },
];

export const INDUSTRY_OPTIONS = [
  'All',
  'IT',
  'Education',
  'Manufacturing',
  'Design',
  'Food & Beverage',
  'Healthcare',
] as const;

export const VISA_TYPE_OPTIONS = [
  'All',
  'Specified Skilled Worker',
  'Engineer/Specialist in Humanities/Intl. Services',
  'Others',
] as const;

export const PROFILE_COMPLETION_PCT = 100;

export const DEFAULT_FILTERS: JobFilters = {
  location: '',
  industry: 'All',
  visaType: 'All',
};