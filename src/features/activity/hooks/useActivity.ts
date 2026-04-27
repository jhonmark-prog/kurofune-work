import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';
import {
  selectApplications,
  selectSavedJobs,
  selectActiveTab,
  selectRemoveSavedConfirmJobId,
  setActiveTab,
  requestRemoveSaved,
  cancelRemoveSaved,
  confirmRemoveSaved,
} from '../../../store/activitySlice';
import type { RootState } from '../../../store/types';
import type { ActivityTab } from '../types/activity.types';

export function useActivity() {
  const dispatch = useDispatch();
  const router = useRouter();

  const applications = useSelector((state: RootState) =>
    selectApplications(state as any)
  );
  const savedJobs = useSelector((state: RootState) =>
    selectSavedJobs(state as any)
  );
  const activeTab = useSelector((state: RootState) =>
    selectActiveTab(state as any)
  );
  const removeSavedConfirmJobId = useSelector((state: RootState) =>
    selectRemoveSavedConfirmJobId(state as any)
  );

  const switchTab = (tab: ActivityTab) => {
    dispatch(setActiveTab(tab));
  };

  const handleBookmarkPress = (jobId: string) => {

    dispatch(requestRemoveSaved(jobId));
  };

  const handleCancelRemove = () => {
    dispatch(cancelRemoveSaved());
  };

  const handleConfirmRemove = () => {
    dispatch(confirmRemoveSaved());
  };

  const handleJobPress = (jobId: string) => {
    router.push(`/job/${jobId}`);
  };

  return {
    applications,
    savedJobs,
    activeTab,
    removeSavedConfirmJobId,
    switchTab,
    handleBookmarkPress,
    handleCancelRemove,
    handleConfirmRemove,
    handleJobPress,
  };
}