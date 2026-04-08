import { useState, useMemo } from 'react';
import { DUMMY_JOBS } from '../constants/browseData';
import type { Job, JobFilters } from '../types/browse.types';

const DEFAULT_FILTERS: JobFilters = {
  location: '',
  industry: 'All',
  visaType: 'All',
};

export function useBrowse() {
  const [jobs, setJobs] = useState<Job[]>(DUMMY_JOBS);
  const [appliedFilters, setAppliedFilters] = useState<JobFilters>(DEFAULT_FILTERS);
  const [pendingFilters, setPendingFilters] = useState<JobFilters>(DEFAULT_FILTERS);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const hasActiveFilters =
    appliedFilters.location !== '' ||
    appliedFilters.industry !== 'All' ||
    appliedFilters.visaType !== 'All';

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (
        appliedFilters.location &&
        !job.location.toLowerCase().includes(appliedFilters.location.toLowerCase()) &&
        !job.prefecture.toLowerCase().includes(appliedFilters.location.toLowerCase())
      ) {
        return false;
      }
      if (appliedFilters.industry !== 'All' && job.industry !== appliedFilters.industry) {
        return false;
      }
      if (appliedFilters.visaType !== 'All' && !job.visa_type.includes(appliedFilters.visaType)) {
        return false;
      }
      return true;
    });
  }, [jobs, appliedFilters]);

  function openFilter() {
    setPendingFilters(appliedFilters);
    setIsFilterVisible(true);
  }

  function closeFilter() {
    setIsFilterVisible(false);
  }

  function applyFilters() {
    setAppliedFilters(pendingFilters);
    setIsFilterVisible(false);
  }

  function resetFilters() {
    setPendingFilters(DEFAULT_FILTERS);
  }

  function toggleSaved(jobId: string) {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, is_saved: !j.is_saved } : j))
    );
  }

  function clearFilter(key: keyof JobFilters) {
    setAppliedFilters((prev) => ({
      ...prev,
      [key]: key === 'location' ? '' : 'All',
    }));
  }

  return {
    filteredJobs,
    appliedFilters,
    pendingFilters,
    setPendingFilters,
    isFilterVisible,
    hasActiveFilters,
    openFilter,
    closeFilter,
    applyFilters,
    resetFilters,
    toggleSaved,
    clearFilter,
  };
}