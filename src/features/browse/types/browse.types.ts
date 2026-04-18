export interface Job {
  id: string;
  title: string;
  company_name: string;
  location: string;
  prefecture: string;
  salary_min: number;
  posted_at: string;
  thumbnail_url: string | null;
  industry: string;
  visa_type: string[];
  is_saved: boolean;
}

export interface JobFilters {
  location: string;
  industry: string;
  visaType: string;
}

export type FilterVisaOption =
  | 'All'
  | 'Specified Skilled Worker'
  | 'Engineer/Specialist in Humanities/Intl. Services'
  | 'Others';