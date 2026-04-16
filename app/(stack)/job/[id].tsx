import { View, TouchableOpacity, Text } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { HeaderBanner } from '@/components';
import { JobInfoBlock, JobDetailTabs, JobDetailContent } from '@/features/job-detail/components';
import { useJobDetail } from '@/features/job-detail/hooks/useJobDetail';
import { screenStyles as styles } from '@/features/job-detail/styles/JobDetailScreen.styles';
import { DUMMY_JOB_DETAIL } from '@/features/job-detail/constants/jobDetailData';

export default function JobDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    job,
    tabs,
    activeTab,
    setActiveTab,
    hasApplied,
    isSaved,
    toggleSaved,
    applyForJob,
  } = useJobDetail(id ?? '');

  const currentJob = job ?? DUMMY_JOB_DETAIL;

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <HeaderBanner
        backgroundImage={currentJob.hero_image_url ? { uri: currentJob.hero_image_url } : undefined}
        leftContent={
          <TouchableOpacity
            style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' }}
            onPress={() => router.back()}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="arrow-back" size={18} color="#fff" />
          </TouchableOpacity>
        }
        rightContent={
          <TouchableOpacity
            style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' }}
            onPress={toggleSaved}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons
              name={isSaved ? 'bookmark' : 'bookmark-outline'}
              size={18}
              color="#fff"
            />
          </TouchableOpacity>
        }
      />

      <JobInfoBlock job={currentJob} />

      <JobDetailTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabPress={setActiveTab}
      />

      <JobDetailContent job={currentJob} activeTab={activeTab} />

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