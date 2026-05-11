import { JobListAPIData, JobListAPIResponse, fetchJobListAPI } from '@/utils/services';

export const getJobList = async (): Promise<JobListAPIResponse | null> => {
  console.log('🚀 Job List: Fetching job list data...');
  const result = await fetchJobListAPI();
  
  if (result && result.data) {
    console.log(`✅ Job List: Successfully retrieved ${result.data.length} jobs`);
  } else {
    console.warn('⚠️ Job List: Failed to fetch job list');
  }
  
  return result;
};

/**
 * Filters job list by specific criteria
 * 
 * @param jobs - Array of job data to filter
 * @param filters - Filter criteria
 */
export const filterJobList = (jobs: JobListAPIData[], filters: {
  location?: string;
  industry?: string;
  job_type?: string;
  minSalary?: number;
}) => {
  console.log('🔍 Job List: Applying filters:', filters);
  
  const filteredJobs = jobs.filter(job => {
    if (filters.location && !job.work_place.includes(filters.location)) return false;
    if (filters.industry && !job.industry.includes(filters.industry)) return false;
    if (filters.job_type && !job.job_type.includes(filters.job_type)) return false;
    return true;
  });
  
  console.log(`📊 Job List: Filtered from ${jobs.length} to ${filteredJobs.length} jobs`);
  return filteredJobs;
};

/**
 * Formats job list data for display
 * 
 * @param jobs - Array of job data to format
 */
export const formatJobListForDisplay = (jobs: JobListAPIData[]) => {
  console.log('📝 Job List: Formatting job data for display...');
  
  return jobs.map(job => ({
    ...job,
    displayTitle: `${job.job_title} at ${job.company_name}`,
    salaryInfo: job.salary,
    isNewlyPosted: job.object_creation_date_and_time.includes(new Date().getFullYear().toString())
  }));
};