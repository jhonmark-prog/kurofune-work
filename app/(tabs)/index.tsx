import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../src/constants/colors';
import { homeStyles as styles } from '../src/features/browse/styles/HomeScreen.styles';
import { JobCard } from '../src/features/browse/components';
import { FilterModal } from '../src/features/browse/components';
import { ProfileCompletionBanner } from '../src/features/browse/components';
import { ActiveFilterChips } from '../src/features/browse/components';
import { useBrowse } from '../src/features/browse/hooks/useBrowse';
import { PROFILE_COMPLETION_PCT } from '../src/features/browse/constants/browseData';
import type { Job } from '../src/features/browse/types/browse.types';
import { HeaderBanner } from '../src/components';

export default function HomeScreen() {
  const {
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
  } = useBrowse();

  function handleJobPress(job: Job) {
    // navigate to job detail — wire up once Feature 04 is built
    console.log('pressed job:', job.id);
  }

  function handleProfileBannerPress() {
    // navigate to Profile — wire up once Feature 05 is built
    console.log('go to profile');
  }

  return (
    <View style={styles.container}>
      <HeaderBanner 
        title="Let's find you a job!" 
        rightContent={
          <>
            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.headerIconBtn}>
                <Ionicons name="notifications-outline" size={17} color={Colors.buttonStrokePrimary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerIconBtn}>
                <Ionicons name="settings-outline" size={17} color={Colors.buttonStrokePrimary} />
              </TouchableOpacity>
            </View>
          </>
        }
      />

      {PROFILE_COMPLETION_PCT < 100 && (
        <ProfileCompletionBanner
          percentage={PROFILE_COMPLETION_PCT}
          onPress={handleProfileBannerPress}
        />
      )}

      <View style={styles.content}>
        <FlatList
          data={filteredJobs}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <JobCard job={item} onPress={handleJobPress} onBookmark={toggleSaved} />
          )}
          ListHeaderComponent={
            <>
              <View style={styles.listHeader}>
                <Text style={styles.listHeaderTitle}>
                  {hasActiveFilters ? 'Showing results for...' : 'All Job Posts'}
                </Text>
                <TouchableOpacity style={styles.filterBtn} onPress={openFilter}>
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

        <FilterModal
          visible={isFilterVisible}
          filters={pendingFilters}
          onChangeFilters={setPendingFilters}
          onReset={resetFilters}
          onApply={applyFilters}
          onClose={closeFilter}
        />
      </View>
    </View>
  );
}