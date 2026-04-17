import { useSelector, useDispatch } from 'react-redux';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { JOB_DETAIL_TABS } from '../constants/jobDetailData';
import { selectJobDetail, selectActiveTab, selectHasApplied, selectIsSaved, setJob, setActiveTab, toggleSaved as toggleSavedAction, applyForJob } from '../../../store/jobDetailSlice';
import type { RootState } from '../../../store/types';
import type { JobDetailTab } from '../types/job-detail.types';

export function useJobDetail(jobId: string) {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const params = useLocalSearchParams<{ id?: string }>();

  const job = useSelector((state: RootState) => selectJobDetail(state));
  const activeTab = useSelector((state: RootState) => selectActiveTab(state));
  const hasApplied = useSelector((state: RootState) => selectHasApplied(state));
  const isSaved = useSelector((state: RootState) => selectIsSaved(state));

  const setJobDetail = (jobData: typeof job) => {
    if (jobData) {
      dispatch(setJob({ job: jobData }));
    }
  };

  const setJobActiveTab = (tab: JobDetailTab) => {
    dispatch(setActiveTab({ tab }));
  };

  const toggleSaved = () => {
    dispatch(toggleSavedAction());
  };

  const handleApplyForJob = () => {
    dispatch(applyForJob());
  };

  return {
    job,
    tabs: JOB_DETAIL_TABS,
    activeTab,
    isSaved,
    hasApplied,
    setActiveTab: setJobActiveTab,
    toggleSaved,
    applyForJob: handleApplyForJob,
  };
}