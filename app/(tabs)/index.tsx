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

export default function HomeScreen() {
  const { 
    router,
    appliedFilters,
    hasActiveFilters,
    getFilteredJobs,
    handleFilterPress,
    toggleSaved,
    clearFilter,
  } = useBrowse();

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
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

      {(PROFILE_COMPLETION_PCT < 100 && !hasActiveFilters) && (
        <ProfileCompletionBanner
          percentage={PROFILE_COMPLETION_PCT}
          onPress={() => router.push('/you')}
        />
      )}

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
            <JobCard job={item} onPress={(job) => router.push(`/job/${job.id}`)} onBookmark={toggleSaved} />
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
    </SafeAreaView>
  );
}