import { HubSpotJob } from './jobListApi';
import { fetchJobListAPI } from './jobListApi';
import { Job } from '../types/browse.types';
import { HubSpotResponse } from './jobListApi';

/**
 * Converts HubSpot job data to browse-compatible Job format
 */
const convertApiJobToBrowseJob = (apiJob: HubSpotJob): Job => {
  // Check if apiJob and its properties are defined
  if (!apiJob || !apiJob.properties) {
    console.error('Invalid API job data:', apiJob);
    // Return a default job object to avoid breaking the app
    return {
      id: '',
      title: 'Unknown Job',
      company_name: 'Unknown Company',
      location: 'N/A',
      prefecture: 'N/A',
      salary_min: 0,
      posted_at: '',
      thumbnail_url: null,
      industry: 'Other',
      visa_type: ['Others'],
      is_saved: false,
    };
  }

  // Extract prefecture from work_place_area (which is actually the region/area in the API)
  const { location, prefecture } = extractLocationAndPrefecture(
    apiJob.properties.work_place || '', 
    apiJob.properties.work_place_area || ''
  );

  // Extract salary from the salary field
  const salary_min = apiJob.properties.salary 
    ? extractSalaryMin(apiJob.properties.salary) 
    : 0;

  // Extract visa types from status_of_residence
  const visa_type = apiJob.properties.status_of_residence 
    ? [apiJob.properties.status_of_residence] 
    : ['Others'];

  return {
    id: apiJob.id,
    title: apiJob.properties.job_name,
    company_name: apiJob.properties.company_name || 'Unknown Company',
    location: location || 'N/A',
    prefecture: prefecture || 'N/A',
    salary_min: salary_min,
    posted_at: apiJob.createdAt,
    thumbnail_url: null, // Thumbnail not available in HubSpot data
    industry: apiJob.properties.industry_category || 
              apiJob.properties.industry || 
              'Other',
    visa_type: visa_type,
    is_saved: false,
  };
};

/**
 * Extract minimum salary from salary string
 */
const extractSalaryMin = (salaryStr: string): number => {
  if (!salaryStr) return 0;
  
  // Match patterns like "¥220,000 - ¥383,000" or "220,000 yen" or "166000円"
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
 * Keeping this for backward compatibility, though we now use status_of_residence directly
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
  if (!workPlace && !workLocationArea) {
    return { location: 'N/A', prefecture: 'N/A' };
  }
  
  // Use workPlace if available, otherwise use workLocationArea
  const location = workPlace || workLocationArea || 'N/A';
  
  // Try to extract prefecture from location
  let prefecture = workLocationArea || 'N/A';
  if (location) {
    // Try to extract prefecture from work_place (e.g., "東京都", "大阪府")
    const prefectureMatch = location.match(/.+?[都道府県]/);
    if (prefectureMatch) {
      prefecture = prefectureMatch[0];
    }
    // If no prefecture found in location, use workLocationArea
    else if (!prefecture || prefecture === 'N/A') {
      prefecture = workLocationArea || 'N/A';
    }
  }
  
  return { location, prefecture };
};

/**
 * Fetches job list and converts to browse format
 */
export const fetchBrowseJobs = async (): Promise<Job[]> => {
  const result = await fetchJobListAPI({ search: '', page: 1, with_pagination: 'yes' });
  
  if (!result || !result.data) {
    console.log('No job data available');
    return [];
  }
  
  const jobs = result.data.map(convertApiJobToBrowseJob);
  console.log(`Converted ${jobs.length} jobs to browse format`);
  
  return jobs;
};

/**
 * Fetches job list with full response for pagination handling
 */
export const fetchBrowseJobsWithResponse = async (params?: { search?: string; page?: number; with_pagination?: string } | undefined): Promise<{ jobs: Job[]; response: HubSpotResponse } | null> => {
  const response = await fetchJobListAPI(params ?? {});
  
  if (!response || !response.data || !Array.isArray(response.data)) {
    console.log('No job data available or invalid data format');
    return null;
  }
  
  const jobs = response.data.map(convertApiJobToBrowseJob);
  console.log(`Converted ${jobs.length} jobs to browse format`);
  
  return { jobs, response };
};

/**
 * Refreshes jobs in the store
 */
export const refreshBrowseJobs = async (params?: { search?: string; page?: number; with_pagination?: string } | undefined): Promise<Job[]> => {
  const result = await fetchJobListAPI(params ?? {});
  
  if (!result || !result.data) {
    console.log('No job data available');
    return [];
  }
  
  const jobs = result.data.map(convertApiJobToBrowseJob);
  console.log(`Converted ${jobs.length} jobs to browse format`);
  
  return jobs;
};