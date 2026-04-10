import { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { FilterModal } from '../../src/features/browse/components/organisms/FilterModal';
import type { JobFilters } from '../../src/features/browse/types/browse.types';

const DEFAULT_FILTERS: JobFilters = {
  location: '',
  industry: 'All',
  visaType: 'All',
};

export default function FilterScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    location?: string;
    industry?: string;
    visaType?: string;
  }>();

  const [filters, setFilters] = useState<JobFilters>({
    location: params.location ?? '',
    industry: params.industry ?? 'All',
    visaType: params.visaType ?? 'All',
  });

  function handleApply() {
    // Pass selected filters back to the home screen via params then go back
    router.navigate({
      pathname: '/(tabs)/',
      params: {
        location: filters.location,
        industry: filters.industry,
        visaType: filters.visaType,
      },
    });
  }

  function handleReset() {
    setFilters(DEFAULT_FILTERS);
  }

  function handleClose() {
    router.back();
  }

  return (
    <FilterModal
      filters={filters}
      onChangeFilters={setFilters}
      onReset={handleReset}
      onApply={handleApply}
      onClose={handleClose}
    />
  );
}