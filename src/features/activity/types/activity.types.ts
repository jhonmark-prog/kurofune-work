import type { Job } from '@/features/browse/types/browse.types';

export type ApplicationStatus = 'Pending' | 'Sent' | 'Accepted' | 'Rejected';

export interface Application {
  id: string;
  job: Job;
  status: ApplicationStatus;
  applied_at: string;
}

export type ActivityTab = 'Applications' | 'Saved';

export type ActivityStatus = 'idle' | 'loading' | 'succeeded' | 'failed';