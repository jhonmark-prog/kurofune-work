import type { JobDetail, JobDetailTab } from '../types/job-detail.types';

export const JOB_DETAIL_TABS: JobDetailTab[] = [
  'Overview',
  'Job Description',
  'Working Conditions',
  'Housing and Living Support',
  'Application Conditions',
  'Selection Process',
  'Others',
];

export const DUMMY_JOB_DETAIL: JobDetail = {
  id: '5',
  title: '251210_Specified Skilled Worker No. 1_Customer Service and Food Serving_Axel One Co., Ltd.',
  company_name: 'Accel One Co., Ltd.',
  company_website: 'http://www.axlone.co.jp/',
  location: 'Aichi Prefecture, Shizuoka Prefecture',
  industry: 'Eating and drinking',
  japanese_level: 'N3',
  visa_type: ['Specified Skilled Worker'],
  posted_at: '1d ago',
  hero_image_url: undefined,
  is_saved: false,

  overview: {
    business_name: 'CoCo Ichibanya',
    company_website: 'http://www.axlone.co.jp/',
    job_type: 'Food and beverage industry (customer service and catering)',
    eligible_residence_status: 'Specific skill No. 1',
    number_of_people: '1 person',
    recruitment_range_nationality: 'Vietnamese preferred',
    foreigner_acceptance_status: 'Yes (multiple Vietnamese with specific skills No. 1)',
  },

  job_description: 'Responsible for customer service and food serving at CoCo Ichibanya restaurants across Aichi and Shizuoka prefectures. You will assist customers, take orders, prepare food, and maintain cleanliness of the work area.',

  working_conditions: {
    working_hours: '8 hours / day (shift work)',
    days_off: '2 days per week (based on shift schedule)',
    overtime: 'Occasionally required',
    trial_period: '3 months',
    employment_type: 'Full-time',
    insurance: 'Health, pension, employment, and workers compensation',
  },

  housing_support: {
    moving_support: 'We can help with luggage transportation if you are near one of our stores.',
    dormitory: 'One-room apartment (Leopalace, furnished) or standard apartment',
    dormitory_fees: 'One-room apartment: 25,000 yen / Shared apartment: 20,000 yen',
    furniture_and_appliances: 'Stove, refrigerator, air conditioner, microwave (only some beds)',
  },

  application_conditions: {
    japanese_level: 'JLPT N3 or above',
    experience: 'No experience required',
    age: 'No age restriction',
    visa_types: 'Specified Skilled Worker No. 1',
  },

  selection_process: '1. Document screening\n2. Online interview\n3. Final decision\n\nTypically 2–3 weeks from application to offer.',

  others: 'Uniform provided. Meals available at discounted price during shifts. Japanese language support available for new employees.',
};