import { View, TouchableOpacity, Text } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { JobDetailHeader } from '../../src/features/job-detail/components/JobDetailHeader';
import { JobDetailTabs } from '../../src/features/job-detail/components/JobDetailTabs';
import { JobDetailContent } from '../../src/features/job-detail/components/JobDetailContent';
import { useJobDetail } from '../../src/features/job-detail/hooks/useJobDetail';
import { screenStyles as styles } from '../../src/features/job-detail/styles/JobDetailScreen.styles';

export default function JobDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    job,
    tabs,
    activeTab,
    setActiveTab,
    hasApplied,
    toggleSaved,
    applyForJob,
  } = useJobDetail(id ?? '');

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      {/* Header — manages its own SafeAreaView for top edge */}
      <JobDetailHeader
        job={job}
        onBack={() => router.back()}
        onBookmark={toggleSaved}
      />

      {/* Sticky tab bar */}
      <JobDetailTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabPress={setActiveTab}
      />

      {/* Scrollable tab content */}
      <JobDetailContent job={job} activeTab={activeTab} />

      {/* Apply footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.applyBtn, hasApplied && styles.applyBtnDisabled]}
          onPress={applyForJob}
          disabled={hasApplied}
          activeOpacity={0.85}
        >
          <Text style={styles.applyBtnText}>
            {hasApplied ? 'Applied' : 'Apply'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}