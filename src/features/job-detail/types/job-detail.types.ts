export interface JobDetail {
  id: string;
  title: string;
  company_name: string;
  company_website?: string;
  location: string;
  industry: string;
  japanese_level?: string;
  visa_type: string[];
  salary_min?: number;
  salary_max?: number;
  posted_at: string;
  closing_date?: string;
  hero_image_url?: string;
  is_saved: boolean;

  // Direct fields mapped from API (used by JobInfoBlock pills)
  working_hours?: string;
  holiday?: string;
  overtime?: string;
  remarks?: string;

  overview?: JobOverview;
  job_description?: string;
  working_conditions?: JobWorkingConditions;
  housing_support?: JobHousingSupport;
  application_conditions?: JobApplicationConditions;
  selection_process?: string;
  others?: string;
}

export interface JobOverview {
  business_name?: string;
  company_website?: string;
  job_type?: string;
  eligible_residence_status?: string;
  number_of_people?: string;
  recruitment_range_nationality?: string;
  foreigner_acceptance_status?: string;
}

export interface JobWorkingConditions {
  working_hours?: string;
  days_off?: string;
  overtime?: string;
  trial_period?: string;
  employment_type?: string;
  insurance?: string;
}

export interface JobHousingSupport {
  moving_support?: string;
  dormitory?: string;
  dormitory_fees?: string;
  furniture_and_appliances?: string;
}

export interface JobApplicationConditions {
  japanese_level?: string;
  experience?: string;
  age?: string;
  visa_types?: string;
}

export type JobDetailTab =
  | 'Overview'
  | 'Job Description'
  | 'Working Conditions'
  | 'Housing and Living Support'
  | 'Application Conditions'
  | 'Selection Process'
  | 'Others';