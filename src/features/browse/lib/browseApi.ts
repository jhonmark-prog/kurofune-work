import { HubSpotJob } from '@/features/browse/lib/jobListApi';
import { fetchJobListAPI } from '@/features/browse/lib/jobListApi';
import { Job } from '../types/browse.types';

/**
 * Converts HubSpot job data to browse-compatible Job format
 */
const convertApiJobToBrowseJob = (apiJob: HubSpotJob): Job => {
  // Extract prefecture from work_place_area
  const { location, prefecture } = extractLocationAndPrefecture(apiJob.properties.work_place_area || '', '');
   
  return {
    id: apiJob.id,
    title: apiJob.properties.job_name,
    company_name: apiJob.properties.company_name || 'Unknown Company',
    location: location,
    prefecture: prefecture,
    salary_min: 0, // Salary not available in HubSpot data
    posted_at: apiJob.createdAt,
    thumbnail_url: null, // Thumbnail not available in HubSpot data
    industry: apiJob.properties.industry_category || apiJob.properties.industry || 'Other',
    visa_type: extractVisaTypes(apiJob.properties.job_name), // Extract visa type from job name
    is_saved: false,
  };
};

/**
 * Extract minimum salary from salary string
 */
const extractSalaryMin = (salaryStr: string): number => {
  if (!salaryStr) return 0;
  
  // Match patterns like "¥220,000 - ¥383,000" or "220,000 yen"
  const matches = salaryStr.match(/[\d,]+/g);
  if (matches && matches.length > 0) {
    const firstMatch = matches[0].replace(/,/g, '');
    const num = parseInt(firstMatch, 10);
    return isNaN(num) ? 0 : num;
  }
  return 0;
};

/**
 * Extract visa types from target status string
 */
const extractVisaTypes = (targetStatus: string): string[] => {
  if (!targetStatus) return ['Others'];
  
  const visaTypes: string[] = [];
  
  if (targetStatus.includes('Specified Skilled Worker')) {
    visaTypes.push('Specified Skilled Worker');
  }
  if (targetStatus.includes('Engineer') || targetStatus.includes('Specialist') || targetStatus.includes('Humanities') || targetStatus.includes('Intl')) {
    visaTypes.push('Engineer/Specialist in Humanities/Intl. Services');
  }
  if (targetStatus.includes('Highly Skilled') || targetStatus.includes('Permanent')) {
    visaTypes.push('Others');
  }
  
  return visaTypes.length > 0 ? visaTypes : ['Others'];
};

/**
 * Extract location and prefecture from work place string
 */
const extractLocationAndPrefecture = (workPlace: string, workLocationArea: string): { location: string; prefecture: string } => {
  if (!workPlace) {
    return { location: workLocationArea || 'N/A', prefecture: workLocationArea || 'N/A' };
  }
  
  // Try to extract prefecture from work_place
  const prefectureMatch = workPlace.match(/(.+?[都道府県])/);
  if (prefectureMatch) {
    return { location: workPlace, prefecture: prefectureMatch[1] };
  }
  
  return { location: workPlace, prefecture: workLocationArea || 'N/A' };
};

/**
 * Fetches job list and converts to browse format
 */
export const fetchBrowseJobs = async (): Promise<Job[]> => {
  const result = await fetchJobListAPI();
  
  if (!result || !result.results) {
    console.log('No job data available');
    return [];
  }
  
  const jobs = result.results.map(convertApiJobToBrowseJob);
  console.log(`Converted ${jobs.length} jobs to browse format`);
  
  return jobs;
};

/**
 * Refreshes jobs in the store
 */
export const refreshBrowseJobs = async (): Promise<Job[]> => {
  const jobs = await fetchBrowseJobs();
  return jobs;
};