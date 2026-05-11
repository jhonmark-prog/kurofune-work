import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';
import type { RootState, AppDispatch } from '@/store/types';
import {
  selectApplications,
  selectApplicationsLoading,
  selectApplicationsError,
  setApplications,
  addApplication,
  updateApplication,
  removeApplication,
  clearApplications,
  setLoading,
  setError,
} from '@/store/applicationsSlice';
import { fetchApplications, createApplication } from '../lib/applicationsApi';
import { selectUserData } from '@/store/userSlice';

export function useApplications() {
  const dispatch = useDispatch<AppDispatch>();
  const applications = useSelector(selectApplications);
  const loading = useSelector(selectApplicationsLoading);
  const error = useSelector(selectApplicationsError);
  const user = useSelector(selectUserData);

  const loadApplications = useCallback(async () => {
    if (!user?.accessToken) {
      dispatch(setError('No access token available'));
      return;
    }

    dispatch(setLoading(true));
    dispatch(setError(null));

    const result = await fetchApplications(user.accessToken);

    if (result.error) {
      dispatch(setError(result.error));
    } else {
      dispatch(setApplications(result.applications));
    }

    dispatch(setLoading(false));
  }, [dispatch, user?.accessToken]);

  // Load applications on mount
  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  const applyToJob = useCallback(
    async (jobData: {
      job_id: string;
      job_name: string;
      job_title: string;
      status?: 'in_progress' | 'pending';
    }) => {
      if (!user?.accessToken || !user?.id) {
        dispatch(setError('User not authenticated'));
        return null;
      }

      dispatch(setLoading(true));
      dispatch(setError(null));

      const applicationData = {
        user_id: user.id,
        job_id: jobData.job_id,
        job_name: jobData.job_name,
        job_title: jobData.job_title,
        status: jobData.status || 'in_progress',
      };

      const result = await createApplication(applicationData, user.accessToken);

      if (result.error) {
        dispatch(setError(result.error));
        dispatch(setLoading(false));
        return null;
      }

      if (result.application) {
        dispatch(addApplication(result.application));
      }

      dispatch(setLoading(false));
      return result.application;
    },
    [dispatch, user?.accessToken, user?.id]
  );

  const cancelApplication = useCallback(
    (applicationId: number) => {
      dispatch(
        updateApplication({
          id: applicationId,
          data: { status: 'cancelled' },
        })
      );
    },
    [dispatch]
  );

  return {
    applications,
    loading,
    error,
    loadApplications,
    applyToJob,
    cancelApplication,
    clearApplications,
  };
}
