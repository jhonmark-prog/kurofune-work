import type { Application } from '../types/activity.types';
import type { Job } from '@/features/browse/types/browse.types';

const BASE_JOB: Omit<Job, 'id' | 'title' | 'company_name' | 'location' | 'prefecture' | 'salary_min' | 'is_saved'> = {
  posted_at: '1d ago',
  thumbnail_url: null,
  industry: 'Manufacturing',
  visa_type: ['Specified Skilled Worker'],
};

export const DUMMY_APPLICATIONS: Application[] = [
  {
    id: 'app-1',
    status: 'Pending',
    applied_at: '2025-11-10',
    job: {
      ...BASE_JOB,
      id: '1',
      title: 'Job Title',
      company_name: 'BlackShip Inc.',
      location: 'Nagoya, Aichi',
      prefecture: 'Aichi-ken',
      salary_min: 250000,
      is_saved: true,
    },
  },
  {
    id: 'app-2',
    status: 'Accepted',
    applied_at: '2025-11-08',
    job: {
      ...BASE_JOB,
      id: '2',
      title: 'Job Title',
      company_name: 'DataCorp Ltd.',
      location: 'Osaka, Osaka',
      prefecture: 'Osaka',
      salary_min: 400000,
      is_saved: false,
    },
  },
  {
    id: 'app-3',
    status: 'Sent',
    applied_at: '2025-11-05',
    job: {
      ...BASE_JOB,
      id: '3',
      title: 'Job Title',
      company_name: 'BlackShip Inc.',
      location: 'Job Title',
      prefecture: 'Tokyo',
      salary_min: 250000,
      is_saved: true,
    },
  },
  {
    id: 'app-4',
    status: 'Rejected',
    applied_at: '2025-10-28',
    job: {
      ...BASE_JOB,
      id: '4',
      title: 'Job Title',
      company_name: 'TechBase Co.',
      location: 'Tokyo, Tokyo',
      prefecture: 'Tokyo',
      salary_min: 350000,
      is_saved: false,
    },
  },
];

export const DUMMY_SAVED_JOBS: Job[] = [
  {
    ...BASE_JOB,
    id: '1',
    title: 'Job Title',
    company_name: 'BlackShip Inc.',
    location: 'Nagoya, Aichi',
    prefecture: 'Aichi-ken',
    salary_min: 250000,
    is_saved: true,
  },
  {
    ...BASE_JOB,
    id: '5',
    title: 'Job Title',
    company_name: 'BlackShip Inc.',
    location: 'Job Title',
    prefecture: 'Aichi-ken',
    salary_min: 250000,
    is_saved: true,
  },
];