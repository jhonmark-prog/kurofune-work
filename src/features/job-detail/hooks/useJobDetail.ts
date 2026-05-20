import { useSelector, useDispatch } from 'react-redux';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { JOB_DETAIL_TABS } from '../constants/jobDetailData';
import { selectJobDetail, selectActiveTab, selectHasApplied, selectIsSaved, setJob, setActiveTab, toggleSaved as toggleSavedAction, applyForJob, applyForJobAsync, selectApplyLoading, selectApplyError } from '../../../store/jobDetailSlice';
import type { RootState } from '../../../store/types';
import type { JobDetailTab } from '../types/job-detail.types';
import { useCallback } from 'react';

export function useJobDetail(jobId: string) {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const params = useLocalSearchParams<{ id?: string }>();

  const job = useSelector((state: RootState) => selectJobDetail(state, jobId));
  const activeTab = useSelector((state: RootState) => selectActiveTab(state, jobId));
  const hasApplied = useSelector((state: RootState) => selectHasApplied(state, jobId));
  const isSaved = useSelector((state: RootState) => selectIsSaved(state, jobId));
  const applyLoading = useSelector((state: RootState) => selectApplyLoading(state, jobId));
  const applyError = useSelector((state: RootState) => selectApplyError(state, jobId));

  const setJobDetail = (jobData: typeof job) => {
    if (jobData) {
      dispatch(setJob({ jobId, job: jobData }));
    }
  };

  const setJobActiveTab = (tab: JobDetailTab) => {
    dispatch(setActiveTab({ jobId, tab }));
  };

  const toggleSaved = () => {
    dispatch(toggleSavedAction(jobId));
  };

  const handleApplyForJob = useCallback(async () => {
    try {
      await dispatch(applyForJobAsync(jobId)).unwrap();
    } catch (error) {
      console.error('Failed to apply for job:', error);
      // Optionally show error to user
    }
  }, [dispatch, jobId]);

  return {
    job,
    tabs: JOB_DETAIL_TABS,
    activeTab,
    isSaved,
    hasApplied,
    applyLoading,
    applyError,
    setActiveTab: setJobActiveTab,
    toggleSaved,
    applyForJob: handleApplyForJob,
  };
}