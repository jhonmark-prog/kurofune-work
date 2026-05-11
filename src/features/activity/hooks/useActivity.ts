import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useCallback } from 'react';
import { useRouter } from 'expo-router';
import type { RootState } from '@/store/types';
import {
  selectSavedJobs,
  selectActiveTab,
  selectRemoveSavedConfirmJobId,
  setActiveTab,
  requestRemoveSaved,
  cancelRemoveSaved,
  confirmRemoveSaved,
} from '../../../store/activitySlice';
import {
  selectApplications as selectRawApplications,
  updateApplication,
  setApplications,
} from '@/store/applicationsSlice';
import { fetchApplications } from '@/features/applications/lib/applicationsApi';
import { selectUserData } from '@/store/userSlice';
import type { ActivityTab } from '../types/activity.types';
import type { Application } from '../types/activity.types';
import type { Job } from '@/features/browse/types/browse.types';

/**
 * Transform API application to UI format
 */
function transformApplication(raw: any): Application {
  const job: Job = {
    id: raw.job_id,
    title: raw.job_name,
    company_name: raw.job_title,
    location: '',
    prefecture: '',
    salary_min: 0,
    posted_at: raw.applied_at,
    thumbnail_url: null,
    industry: '',
    visa_type: [],
    is_saved: false,
  };

  const statusMap: Record<string, Application['status']> = {
    pending: 'Pending',
    in_progress: 'Sent',
    completed: 'Accepted',
    rejected: 'Rejected',
    cancelled: 'Rejected',
  };

  return {
    id: raw.id.toString(),
    job,
    status: statusMap[raw.status] || 'Pending',
    applied_at: raw.applied_at,
  };
}

export function useActivity() {
  const dispatch = useDispatch();
  const router = useRouter();

  const savedJobs = useSelector((state: RootState) =>
    selectSavedJobs(state as any)
  );
  const activeTab = useSelector((state: RootState) =>
    selectActiveTab(state as any)
  );
  const removeSavedConfirmJobId = useSelector((state: RootState) =>
    selectRemoveSavedConfirmJobId(state as any)
  );
  
  // Select raw applications and user token
  const rawApplications = useSelector(selectRawApplications);
  const user = useSelector(selectUserData);

  // Transform applications for UI
  const applications: Application[] = rawApplications.map(transformApplication);

  // Load applications on mount
  useEffect(() => {
    if (user?.accessToken) {
      fetchApplications(user.accessToken).then((result) => {
        if (!result.error && result.applications) {
          dispatch(setApplications(result.applications));
        }
      });
    }
  }, [user?.accessToken, dispatch]);

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

  const cancelApplication = useCallback((applicationId: number) => {
    dispatch(
      updateApplication({
        id: applicationId,
        data: { status: 'cancelled' },
      })
    );
  }, [dispatch]);

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
    cancelApplication,
  };
}