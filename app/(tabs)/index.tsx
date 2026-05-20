import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { homeStyles as styles } from '@/features/browse/styles/HomeScreen.styles';
import { JobCard } from '@/features/browse/components';
import { ProfileCompletionBanner } from '@/features/browse/components';
import { ActiveFilterChips } from '@/features/browse/components';
import { PROFILE_COMPLETION_PCT } from '@/features/browse/constants/browseData';
import { HeaderBanner, Typography } from '@/components';
import { useBrowse } from '@/features/browse/hooks/useBrowse';
import { NotificationBell } from '@/components/atoms/NotificationBell';
import { SettingsGear } from '@/features/settings/components/atoms/SettingsGear';
import { useDispatch } from 'react-redux';
import { setJob } from '@/store/jobDetailSlice';
import type { Job } from '@/features/browse/types/browse.types';
import type { JobDetail } from '@/features/job-detail/types/job-detail.types';

export default function HomeScreen() {
  const { 
    router,
    appliedFilters,
    hasActiveFilters,
    getFilteredJobs,
    handleFilterPress,
    toggleSaved,
    clearFilter,
    loading,
    error,
    refreshJobs,
  } = useBrowse();
  
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <HeaderBanner
        title="Let's find you a job!"
        rightContent={
          <View style={styles.headerIcons}>
            <NotificationBell />
            <SettingsGear wrapperStyle={styles.headerActionBtn} />
          </View>
        }
      />

      {(PROFILE_COMPLETION_PCT < 100 && !hasActiveFilters) && (
        <ProfileCompletionBanner
          percentage={PROFILE_COMPLETION_PCT}
          onPress={() => router.push('/you')}
        />
      )}

      {error && (
        <View style={styles.errorState}>
          <Typography variant='normalTitle' style={styles.errorText}>Failed to load jobs. Please try again.</Typography>
          <TouchableOpacity style={styles.retryBtn} onPress={refreshJobs}>
            <Typography variant='normalTitle' style={styles.retryText}>Retry</Typography>
          </TouchableOpacity>
        </View>
      )}

      {!error && loading && (
        <View style={styles.loadingState}>
          <Ionicons name="sync" size={32} color={Colors.primary} />
          <Typography variant='normalTitle' style={styles.loadingText}>Loading jobs...</Typography>
        </View>
      )}

      {!loading && !error && (
        <>
          <View style={hasActiveFilters && styles.filterResultsHeader}>
            <View style={styles.listHeader}>
              <Typography variant='normalTitle' style={styles.listHeaderTitle}>
                {hasActiveFilters ? 'Showing results for...' : 'All Job Posts'}
              </Typography>
              <TouchableOpacity style={styles.filterBtn} onPress={handleFilterPress}>
                <View style={styles.filterIconWrapper}>
                  <Ionicons name="options-outline" size={16} color={Colors.primary} />
                  {hasActiveFilters && <View style={styles.filterDot} />}
                </View>
                <Typography variant='normalTitle' style={styles.filterBtnText}>Filter</Typography>
              </TouchableOpacity>
            </View>

            {hasActiveFilters && (
              <ActiveFilterChips filters={appliedFilters} onRemove={clearFilter} />
            )}
          </View>

          <View style={styles.content}>
             <FlatList
               data={getFilteredJobs()}
               keyExtractor={(item) => item?.id}
               contentContainerStyle={styles.listContent}
               renderItem={({ item }) => (
                 <JobCard 
                   job={item} 
                   onPress={(job) => {
                     // Convert browse Job to JobDetail and set in Redux store
                     const jobDetail: JobDetail = {
                       id: job.id,
                       title: job.title,
                       company_name: job.company_name,
                       location: job.location,
                       industry: job.industry,
                       japanese_level: undefined,
                       visa_type: job.visa_type,
                       salary_min: job.salary_min,
                       salary_max: undefined,
                       posted_at: job.posted_at,
                       closing_date: undefined,
                       hero_image_url: undefined,
                       is_saved: job.is_saved,
                       overview: undefined,
                       job_description: undefined,
                       working_conditions: undefined,
                       housing_support: undefined,
                       application_conditions: undefined,
                       selection_process: undefined,
                       others: undefined,
                     };
                     dispatch(setJob({ jobId: job.id, job: jobDetail }));
                     router.push(`/job/${job.id}`);
                   }}
                   onBookmark={toggleSaved}
                 />
               )}
               ListEmptyComponent={
                 <View style={styles.emptyState}>
                   <Ionicons name="search-outline" size={48} color={Colors.textTertiary} />
                   <Typography variant='normalTitle' style={styles.emptyText}>No jobs found matching your filters.</Typography>
                 </View>
               }
               showsVerticalScrollIndicator={false}
             />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}