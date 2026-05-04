import { useActivity } from "@/features/activity/hooks/useActivity";
import { ActivityView } from '@/features/activity/components/ActivityView';

export default function ActivityScreen() {
  const {
    applications,
    savedJobs,
    activeTab,
    removeSavedConfirmJobId,
    switchTab,
    handleBookmarkPress,
    handleCancelRemove,
    handleConfirmRemove,
    handleJobPress,
  } = useActivity();

  return (
    <ActivityView
      applications={applications}
      savedJobs={savedJobs}
      activeTab={activeTab}
      removeSavedConfirmJobId={removeSavedConfirmJobId}
      onTabChange={switchTab}
      onJobPress={handleJobPress}
      onBookmarkPress={handleBookmarkPress}
      onCancelRemove={handleCancelRemove}
      onConfirmRemove={handleConfirmRemove}
    />
  );
}