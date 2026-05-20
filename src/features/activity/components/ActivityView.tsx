import { View, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { HeaderBanner, Typography, Icon } from '@/components';
import { Colors } from '@/constants/colors';
import { activityStyles as styles } from '../styles/ActivityScreen.styles';
import { ApplicationCard } from './organisms/ApplicationCard';
import { SavedJobCard } from './organisms/SavedJobCard';
import { RemoveSavedDialog } from './organisms/RemoveSavedDialog';
import type { Application, ActivityTab } from '../types/activity.types';
import type { Job } from '@/features/browse/types/browse.types';

const TABS: ActivityTab[] = ['Applications', 'Saved'];

interface ActivityViewProps {
  applications: Application[];
  savedJobs: Job[];
  activeTab: ActivityTab;
  removeSavedConfirmJobId: string | null;
  onTabChange: (tab: ActivityTab) => void;
  onJobPress: (jobId: string) => void;
  onBookmarkPress: (jobId: string) => void;
  onCancelRemove: () => void;
  onConfirmRemove: () => void;
}

export function ActivityView({
  applications,
  savedJobs,
  activeTab,
  removeSavedConfirmJobId,
  onTabChange,
  onJobPress,
  onBookmarkPress,
  onCancelRemove,
  onConfirmRemove,
}: ActivityViewProps) {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <HeaderBanner
        title="Activities"
        rightContent={
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerActionBtn}>
              <Ionicons name="notifications-outline" size={17} color={Colors.buttonStrokePrimary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerActionBtn}>
              <Ionicons name="settings-outline" size={17} color={Colors.buttonStrokePrimary} />
            </TouchableOpacity>
          </View>
        }
      />
      <View style={styles.contentCard}>
        <View style={styles.tabRow}>
          {TABS.map((tab) => {
            const active = tab === activeTab;
            const count = tab === 'Applications' ? applications.length : savedJobs.length;

            return (
              <TouchableOpacity
                key={tab}
                style={styles.tab}
                onPress={() => onTabChange(tab)}
                activeOpacity={0.75}
              >
                <Typography style={[styles.tabLabel, active && styles.tabLabelActive]}>
                  {tab}
                </Typography>
                <View style={[styles.tabBadge, active && styles.tabBadgeActive]}>
                  <Typography style={[styles.tabBadgeText, active && styles.tabBadgeTextActive]}>
                    {count}
                  </Typography>
                </View>

                {active && <View style={styles.tabUnderline} />}
              </TouchableOpacity>
            );
          })}
        </View>
        {activeTab === 'Applications' && (
          <FlatList
            data={applications}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <ApplicationCard
                application={item}
                onPress={onJobPress}
              />
            )}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Icon name="flash-outline" size={48} color={Colors.textTertiary} />
                <Typography style={styles.emptyText}>
                  No applications yet. Start applying to jobs!
                </Typography>
              </View>
            }
          />
        )}
        {activeTab === 'Saved' && (
          <FlatList
            data={savedJobs}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <SavedJobCard
                job={item}
                onPress={onJobPress}
                onBookmark={onBookmarkPress}
              />
            )}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Icon name="bookmark-outline" size={48} color={Colors.textTertiary} />
                <Typography style={styles.emptyText}>
                  No saved jobs yet. Bookmark jobs to see them here.
                </Typography>
              </View>
            }
          />
        )}
      </View>
      <RemoveSavedDialog
        visible={removeSavedConfirmJobId !== null}
        onCancel={onCancelRemove}
        onConfirm={onConfirmRemove}
      />
    </SafeAreaView>
  );
}