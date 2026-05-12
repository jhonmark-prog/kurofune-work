import { useSelector, useDispatch } from 'react-redux';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import {
  selectJobs,
  selectAppliedFilters,
  selectSavedJobIds,
  selectLoading,
  selectError,
  setAppliedFilters,
  updateFilter,
  clearFilter,
  clearAllFilters,
  toggleSavedJob,
  loadJobsAsync,
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

  const hasActiveFilters =
    appliedFilters.location !== '' ||
    appliedFilters.industry !== 'All' ||
    appliedFilters.visaType !== 'All';

  const getFilteredJobs = () => {
    return jobs.filter((job) => {
      if (
        appliedFilters.location &&
        !job.location.toLowerCase().includes(appliedFilters.location.toLowerCase()) &&
        !job.prefecture.toLowerCase().includes(appliedFilters.location.toLowerCase())
      )
        return false;
      if (appliedFilters.industry !== 'All' && job.industry !== appliedFilters.industry) return false;
      if (appliedFilters.visaType !== 'All' && !job.visa_type.includes(appliedFilters.visaType))
        return false;
      return true;
    });
  };

  // Load jobs on mount
  useEffect(() => {
    dispatch(loadJobsAsync());
  }, [dispatch]);

  // Apply URL params filters
  useEffect(() => {
    if (params.location !== undefined || params.industry !== undefined || params.visaType !== undefined) {
      dispatch(updateFilter({ key: 'location', value: params.location ?? '' }));
      dispatch(updateFilter({ key: 'industry', value: params.industry ?? 'All' }));
      dispatch(updateFilter({ key: 'visaType', value: params.visaType ?? 'All' }));
    }
  }, [params.location, params.industry, params.visaType]);

  const setFilters = (filters: JobFilters) => {
    dispatch(setAppliedFilters({ filters }));
  };

  const handleUpdateFilter = (key: keyof JobFilters, value: string) => {
    dispatch(updateFilter({ key, value }));
  };

  const handleClearFilter = (key: keyof JobFilters) => {
    dispatch(clearFilter({ key }));
  };

  const handleClearAllFilters = () => {
    dispatch(clearAllFilters());
  };

  const toggleSaved = (jobId: string) => {
    dispatch(toggleSavedJob({ jobId }));
  };

  const refreshJobs = () => {
    dispatch(loadJobsAsync());
  };

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

  return {
    router,
    jobs,
    appliedFilters,
    savedJobIds,
    loading,
    error,
    hasActiveFilters,
    getFilteredJobs,
    setFilters,
    updateFilter: handleUpdateFilter,
    clearFilter: handleClearFilter,
    clearAllFilters: handleClearAllFilters,
    toggleSaved,
    refreshJobs,
    handleFilterPress,
  };
};