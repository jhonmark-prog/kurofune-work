import { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../src/constants/colors';
import { homeStyles as styles } from '../src/features/browse/styles/HomeScreen.styles';
import { JobCard } from '../src/features/browse/components';
import { ProfileCompletionBanner } from '../src/features/browse/components';
import { ActiveFilterChips } from '../src/features/browse/components';
import { DUMMY_JOBS, PROFILE_COMPLETION_PCT } from '../src/features/browse/constants/browseData';
import { HeaderBanner } from '../src/components';
import type { Job, JobFilters } from '../src/features/browse/types/browse.types';

const DEFAULT_FILTERS: JobFilters = {
  location: '',
  industry: 'All',
  visaType: 'All',
};

export default function HomeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    location?: string;
    industry?: string;
    visaType?: string;
  }>();

  const [jobs, setJobs] = useState<Job[]>(DUMMY_JOBS);
  const [appliedFilters, setAppliedFilters] = useState<JobFilters>(DEFAULT_FILTERS);

  // When filter screen returns with params, apply them
  useEffect(() => {
    if (params.location !== undefined || params.industry !== undefined || params.visaType !== undefined) {
      setAppliedFilters({
        location: params.location ?? '',
        industry: params.industry ?? 'All',
        visaType: params.visaType ?? 'All',
      });
    }
  }, [params.location, params.industry, params.visaType]);

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
      ) return false;
      if (appliedFilters.industry !== 'All' && job.industry !== appliedFilters.industry) return false;
      if (appliedFilters.visaType !== 'All' && !job.visa_type.includes(appliedFilters.visaType)) return false;
      return true;
    });
  }, [jobs, appliedFilters]);

  function handleFilterPress() {
    // Pass current applied filters to the filter screen so it opens pre-filled
    router.push({
      pathname: '/browse/filter',
      params: {
        location: appliedFilters.location,
        industry: appliedFilters.industry,
        visaType: appliedFilters.visaType,
      },
    });
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

  return (
    <View style={styles.container}>
      <HeaderBanner
        title="Let's find you a job!"
        rightContent={
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.headerIconBtn}>
              <Ionicons name="notifications-outline" size={17} color={Colors.buttonStrokePrimary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIconBtn}>
              <Ionicons name="settings-outline" size={17} color={Colors.buttonStrokePrimary} />
            </TouchableOpacity>
          </View>
        }
      />

      {PROFILE_COMPLETION_PCT < 100 && (
        <ProfileCompletionBanner
          percentage={PROFILE_COMPLETION_PCT}
          onPress={() => router.push('/you')}
        />
      )}

      <View style={styles.content}>
        <FlatList
          data={filteredJobs}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <JobCard job={item} onPress={(job) => router.push(`/job/${job.id}`)} onBookmark={toggleSaved} />
          )}
          ListHeaderComponent={
            <>
              <View style={styles.listHeader}>
                <Text style={styles.listHeaderTitle}>
                  {hasActiveFilters ? 'Showing results for...' : 'All Job Posts'}
                </Text>
                <TouchableOpacity style={styles.filterBtn} onPress={handleFilterPress}>
                  <Ionicons name="options-outline" size={16} color={Colors.primary} />
                  <Text style={styles.filterBtnText}>Filter</Text>
                </TouchableOpacity>
              </View>

              {hasActiveFilters && (
                <ActiveFilterChips filters={appliedFilters} onRemove={clearFilter} />
              )}
            </>
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={48} color={Colors.textTertiary} />
              <Text style={styles.emptyText}>No jobs found matching your filters.</Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}