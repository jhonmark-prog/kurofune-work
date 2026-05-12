export interface Application {
  id: number;
  user_id: number;
  job_id: string;
  job_name: string;
  job_title: string;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected' | 'cancelled';
  applied_at: string;
  updated_at: string;
}

export interface ApplicationCreateData {
  user_id: number;
  job_id: string;
  job_name: string;
  job_title: string;
  status?: 'in_progress' | 'pending';
}

export type ApplicationsState = {
  applications: Application[];
  loading: boolean;
  error: string | null;
};
