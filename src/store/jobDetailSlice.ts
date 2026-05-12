import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { JobDetail, JobDetailTab } from '../features/job-detail/types/job-detail.types';
import { DUMMY_JOB_DETAIL, JOB_DETAIL_TABS } from '../features/job-detail/constants/jobDetailData';
import type { RootState, AppDispatch } from '@/store/types';
import { createApplication } from '@/features/applications/lib/applicationsApi';
import { selectUserData } from '@/store/userSlice';

export interface JobDetailState {
  jobs: {
    [jobId: string]: {
      job: JobDetail | null;
      activeTab: JobDetailTab;
      hasApplied: boolean;
      applyLoading: boolean;
      applyError: string | null;
    };
  };
}

const initialJobDetailState: JobDetailState = {
  jobs: {},
};

export const jobDetailSlice = createSlice({
  name: 'jobDetail',
  initialState: initialJobDetailState,
  reducers: {
    setJob: (state, action: { payload: { jobId: string; job: JobDetail } }) => {
      if (!state.jobs[action.payload.jobId]) {
        state.jobs[action.payload.jobId] = {
          job: null,
          activeTab: 'Overview',
          hasApplied: false,
          applyLoading: false,
          applyError: null,
        };
      }
      state.jobs[action.payload.jobId].job = action.payload.job;
    },
    setActiveTab: (state, action: { payload: { jobId: string; tab: JobDetailTab } }) => {
      if (!state.jobs[action.payload.jobId]) {
        state.jobs[action.payload.jobId] = {
          job: null,
          activeTab: action.payload.tab,
          hasApplied: false,
          applyLoading: false,
          applyError: null,
        };
      } else {
        state.jobs[action.payload.jobId].activeTab = action.payload.tab;
      }
    },
    toggleSaved: (state, action: { payload: string }) => {
      const jobId = action.payload;
      if (state.jobs[jobId] && state.jobs[jobId].job) {
        state.jobs[jobId].job.is_saved = !state.jobs[jobId].job.is_saved;
      }
    },
    applyForJob: (state, action: { payload: string }) => {
      const jobId = action.payload;
      if (state.jobs[jobId]) {
        state.jobs[jobId].hasApplied = true;
      }
    },
    resetApply: (state, action: { payload: string }) => {
      const jobId = action.payload;
      if (state.jobs[jobId]) {
        state.jobs[jobId].hasApplied = false;
      }
    },
    setApplyLoading: (state, action: { payload: { jobId: string; loading: boolean } }) => {
      const { jobId, loading } = action.payload;
      if (!state.jobs[jobId]) {
        state.jobs[jobId] = {
          job: null,
          activeTab: 'Overview',
          hasApplied: false,
          applyLoading: loading,
          applyError: null,
        };
      } else {
        state.jobs[jobId].applyLoading = loading;
      }
    },
    setApplyError: (state, action: { payload: { jobId: string; error: string | null } }) => {
      const { jobId, error } = action.payload;
      if (!state.jobs[jobId]) {
        state.jobs[jobId] = {
          job: null,
          activeTab: 'Overview',
          hasApplied: false,
          applyLoading: false,
          applyError: error,
        };
      } else {
        state.jobs[jobId].applyError = error;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyForJobAsync.pending, (state, action) => {
        const jobId = action.meta.arg;
        if (!state.jobs[jobId]) {
          state.jobs[jobId] = {
            job: null,
            activeTab: 'Overview',
            hasApplied: false,
            applyLoading: true,
            applyError: null,
          };
        } else {
          state.jobs[jobId].applyLoading = true;
          state.jobs[jobId].applyError = null;
        }
      })
      .addCase(applyForJobAsync.fulfilled, (state, action) => {
        const jobId = action.meta.arg;
        if (state.jobs[jobId]) {
          state.jobs[jobId].applyLoading = false;
          state.jobs[jobId].hasApplied = true;
        }
      })
      .addCase(applyForJobAsync.rejected, (state, action) => {
        const jobId = action.meta.arg;
        if (state.jobs[jobId]) {
          state.jobs[jobId].applyLoading = false;
          state.jobs[jobId].applyError = action.error.message || 'Failed to apply for job';
        }
      });
  },
});

export const {
  setJob,
  setActiveTab,
  toggleSaved,
  applyForJob,
  resetApply,
  setApplyLoading,
  setApplyError,
} = jobDetailSlice.actions;

// Async thunk for applying to a job
export const applyForJobAsync = createAsyncThunk(
  'jobDetail/applyForJobAsync',
  async (jobId: string, { dispatch, getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const jobDetail = state.jobs?.[jobId]?.job;
      const { accessToken, id: userId } = state.user;
      
      if (!jobDetail) {
        throw new Error('Job data not available');
      }
      
      if (!accessToken || !userId) {
        throw new Error('User not authenticated');
      }

      const applicationData = {
        user_id: userId,
        job_id: jobDetail.id,
        job_name: jobDetail.title,
        job_title: jobDetail.company_name,
        status: 'in_progress'
      };

      const result = await createApplication(applicationData, accessToken);
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      return result.application;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to apply for job');
    }
  }
);

export const selectJobDetail = (state: RootState, jobId: string): JobDetail | null => 
  state.jobDetail.jobs?.[jobId]?.job ?? null;
export const selectActiveTab = (state: RootState, jobId: string): JobDetailTab => 
  state.jobDetail.jobs?.[jobId]?.activeTab ?? 'Overview';
export const selectHasApplied = (state: RootState, jobId: string): boolean => 
  state.jobDetail.jobs?.[jobId]?.hasApplied ?? false;
export const selectIsSaved = (state: RootState, jobId: string): boolean => 
  state.jobDetail.jobs?.[jobId]?.job?.is_saved ?? false;
export const selectApplyLoading = (state: RootState, jobId: string): boolean => 
  state.jobDetail.jobs?.[jobId]?.applyLoading ?? false;
export const selectApplyError = (state: RootState, jobId: string): string | null => 
  state.jobDetail.jobs?.[jobId]?.applyError ?? null;

export default jobDetailSlice.reducer;