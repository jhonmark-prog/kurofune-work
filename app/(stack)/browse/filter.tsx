import { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { FilterBrowse } from '@/features/browse/components/organisms/FilterBrowse';
import { useBrowse } from '@/features/browse/hooks/useBrowse';
import { DEFAULT_FILTERS } from '@/features/browse/constants/browseData';
import type { JobFilters } from '@/features/browse/types/browse.types';

export default function FilterScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    location?: string;
    industry?: string;
    visaType?: string;
  }>();

  const { setFilters } = useBrowse();

  const [localFilters, setLocalFilters] = useState<JobFilters>({
    location: params.location ?? '',
    industry: params.industry ?? 'All',
    visaType: params.visaType ?? 'All',
  });

  useEffect(() => {
    if (params.location !== undefined || params.industry !== undefined || params.visaType !== undefined) {
      setLocalFilters({
        location: params.location ?? '',
        industry: params.industry ?? 'All',
        visaType: params.visaType ?? 'All',
      });
    }
  }, [params.location, params.industry, params.visaType]);

  function handleApply() {
    setFilters(localFilters);
    router.navigate({
      pathname: '/(tabs)/',
      params: {
        location: localFilters.location,
        industry: localFilters.industry,
        visaType: localFilters.visaType,
      },
    });
  }

  function handleReset() {
    setLocalFilters(DEFAULT_FILTERS);
  }

  function handleClose() {
    router.back();
  }

  return (
    <FilterBrowse
      filters={localFilters}
      onChangeFilters={setLocalFilters}
      onReset={handleReset}
      onApply={handleApply}
      onClose={handleClose}
    />
  );
}