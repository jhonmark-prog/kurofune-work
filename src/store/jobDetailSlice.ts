import { createSlice } from '@reduxjs/toolkit';
import { JobDetail, JobDetailTab } from '../features/job-detail/types/job-detail.types';
import { DUMMY_JOB_DETAIL, JOB_DETAIL_TABS } from '../features/job-detail/constants/jobDetailData';

export interface JobDetailState {
  job: JobDetail | null;
  activeTab: JobDetailTab;
  hasApplied: boolean;
}

const initialJobDetailState: JobDetailState = {
  job: DUMMY_JOB_DETAIL,
  activeTab: 'Overview',
  hasApplied: false,
};

export const jobDetailSlice = createSlice({
  name: 'jobDetail',
  initialState: initialJobDetailState,
  reducers: {
    setJob: (state, action: { payload: { job: JobDetail } }) => {
      state.job = action.payload.job;
    },
    setActiveTab: (state, action: { payload: { tab: JobDetailTab } }) => {
      state.activeTab = action.payload.tab;
    },
    toggleSaved: (state) => {
      if (state.job) {
        state.job.is_saved = !state.job.is_saved;
      }
    },
    applyForJob: (state) => {
      state.hasApplied = true;
    },
    resetApply: (state) => {
      state.hasApplied = false;
    },
  },
});

export const {
  setJob,
  setActiveTab,
  toggleSaved,
  applyForJob,
  resetApply,
} = jobDetailSlice.actions;

export const selectJobDetail = (state: { jobDetail: JobDetailState }): JobDetail | null => state.jobDetail.job;
export const selectActiveTab = (state: { jobDetail: JobDetailState }): JobDetailTab => state.jobDetail.activeTab;
export const selectHasApplied = (state: { jobDetail: JobDetailState }): boolean => state.jobDetail.hasApplied;
export const selectIsSaved = (state: { jobDetail: JobDetailState }): boolean => state.jobDetail.job?.is_saved ?? false;

export default jobDetailSlice.reducer;