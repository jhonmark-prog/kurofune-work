import { useSelector, useDispatch } from 'react-redux';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useCallback } from 'react';
import {
  selectJobs,
  selectAppliedFilters,
  selectSavedJobIds,
  selectLoading,
  selectError,
  selectHasMore,
  selectPage,
  setAppliedFilters,
  updateFilter,
  clearFilter,
  clearAllFilters,
  toggleSavedJob,
  loadJobsAsync,
  loadMoreJobsAsync,
  resetPagination,
} from '../../../store/browseSlice';
import type { RootState } from '../../../store/types';
import type { AppDispatch } from '../../../store/store';
import type { JobFilters } from '../types/browse.types';

export const useBrowse = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
   
  const params = useLocalSearchParams<{
    location?: string;
    industry?: string;
    visaType?: string;
  }>();
   
  const jobs = useSelector((state: RootState) => selectJobs(state));
  const appliedFilters = useSelector((state: RootState) => selectAppliedFilters(state));
  const savedJobIds = useSelector((state: RootState) => selectSavedJobIds(state));
  const loading = useSelector((state: RootState) => selectLoading(state));
  const error = useSelector((state: RootState) => selectError(state));
  const hasMore = useSelector((state: RootState) => selectHasMore(state));
  const page = useSelector((state: RootState) => selectPage(state));
   
  const hasActiveFilters =
    appliedFilters.location !== '' ||
    appliedFilters.industry !== 'All' ||
    appliedFilters.visaType !== 'All';
   
   // Load jobs on mount, when filters change, or when pagination changes
   useEffect(() => {
     dispatch(loadJobsAsync());
   }, [dispatch, appliedFilters.location, appliedFilters.industry, appliedFilters.visaType]);
   
   // Apply URL params filters and reload jobs
   useEffect(() => {
     if (params.location !== undefined || params.industry !== undefined || params.visaType !== undefined) {
       dispatch(setAppliedFilters({
         filters: {
           location: params.location ?? '',
           industry: params.industry ?? 'All',
           visaType: params.visaType ?? 'All',
         }
       }));
       // Reset pagination when filters change via URL
       dispatch(resetPagination());
       // Reload jobs with new filters
       dispatch(loadJobsAsync());
     }
   }, [params.location, params.industry, params.visaType, dispatch]);
   
  const setFilters = (filters: JobFilters) => {
    dispatch(setAppliedFilters({ filters }));
    // Reset pagination when filters change
    dispatch(resetPagination());
  };
   
  const handleUpdateFilter = (key: keyof JobFilters, value: string) => {
    dispatch(updateFilter({ key, value }));
    // Reset pagination when filters change
    dispatch(resetPagination());
  };
   
  const handleClearFilter = (key: keyof JobFilters) => {
    dispatch(clearFilter({ key }));
    // Reset pagination when filters change
    dispatch(resetPagination());
  };
   
  const handleClearAllFilters = () => {
    dispatch(clearAllFilters());
    // Reset pagination when filters change
    dispatch(resetPagination());
  };
   
  const toggleSaved = (jobId: string) => {
    dispatch(toggleSavedJob({ jobId }));
  };
   
  const refreshJobs = () => {
    dispatch(loadJobsAsync());
  };
   
  const loadMoreJobs = useCallback(() => {
    if (hasMore && !loading) {
      dispatch(loadMoreJobsAsync());
    }
  }, [dispatch, hasMore, loading]);
   
  const handleFilterPress = () => {
    router.push({
      pathname: '/browse/filter',
      params: {
        location: appliedFilters.location,
        industry: appliedFilters.industry,
        visaType: appliedFilters.visaType,
      },
    });
  };
  
  // Filter jobs based on applied filters
  const getFilteredJobs = useCallback(() => {
    return jobs.filter(job => {
      // Location filter
      if (appliedFilters.location && job.location.toLowerCase().indexOf(appliedFilters.location.toLowerCase()) === -1) {
        return false;
      }
      
      // Industry filter
      if (appliedFilters.industry && appliedFilters.industry !== 'All' && 
          job.industry.toLowerCase().indexOf(appliedFilters.industry.toLowerCase()) === -1) {
        return false;
      }
      
      // Visa type filter
      if (appliedFilters.visaType && appliedFilters.visaType !== 'All') {
        const visaMatch = job.visa_type.some(visa => 
          visa.toLowerCase().indexOf(appliedFilters.visaType.toLowerCase()) !== -1
        );
        if (!visaMatch) {
          return false;
        }
      }
      
      return true;
    });
  }, [jobs, appliedFilters]);

  return {
    router,
    jobs,
    appliedFilters,
    savedJobIds,
    loading,
    error,
    hasActiveFilters,
    hasMore,
    page,
    setFilters,
    updateFilter: handleUpdateFilter,
    clearFilter: handleClearFilter,
    clearAllFilters: handleClearAllFilters,
    toggleSaved,
    refreshJobs,
    loadMoreJobs,
    handleFilterPress,
    getFilteredJobs,
  };
};