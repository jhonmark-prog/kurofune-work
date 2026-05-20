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
      fetchLoading: boolean;
      fetchError: string | null;
    };
  };
};

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
          fetchLoading: false,
          fetchError: null,
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
          fetchLoading: false,
          fetchError: null,
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
          fetchLoading: false,
          fetchError: null,
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
          fetchLoading: false,
          fetchError: null,
        };
      } else {
        state.jobs[jobId].applyError = error;
      }
    },
    setFetchLoading: (state, action: { payload: { jobId: string; loading: boolean } }) => {
      const { jobId, loading } = action.payload;
      if (!state.jobs[jobId]) {
        state.jobs[jobId] = {
          job: null,
          activeTab: 'Overview',
          hasApplied: false,
          applyLoading: false,
          applyError: null,
          fetchLoading: loading,
          fetchError: null,
        };
      } else {
        state.jobs[jobId].fetchLoading = loading;
      }
    },
    setFetchError: (state, action: { payload: { jobId: string; error: string | null } }) => {
      const { jobId, error } = action.payload;
      if (!state.jobs[jobId]) {
        state.jobs[jobId] = {
          job: null,
          activeTab: 'Overview',
          hasApplied: false,
          applyLoading: false,
          applyError: null,
          fetchLoading: false,
          fetchError: error,
        };
      } else {
        state.jobs[jobId].fetchError = error;
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
            fetchLoading: false,
            fetchError: null,
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
  setFetchLoading,
  setFetchError,
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

// Async thunk for fetching job detail by ID
export const fetchJobDetailById = createAsyncThunk(
  'jobDetail/fetchJobDetailById',
  async (jobId: string, { dispatch, getState, rejectWithValue }) => {
    try {
      dispatch(setFetchLoading({ jobId, loading: true }));
      dispatch(setFetchError({ jobId, error: null }));

       const response = await fetch(`https://barrier-erasable-uncivil.ngrok-free.dev/api/v1/hubspot/job-offer/${jobId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

       const data = await response.json();

       // Transform the API response to match JobDetail type
       const transformJobData = (apiResponse: any): JobDetail => {
         // Check if apiResponse and its properties are defined
         if (!apiResponse || !apiResponse.properties) {
           console.error('Invalid API response for job detail:', apiResponse);
           // Return a dummy job detail to avoid breaking the app
           return DUMMY_JOB_DETAIL;
         }

         const props = apiResponse.properties;

         return {
           id: apiResponse.id,
           title: props.job_name || '',
           company_name: props.company_name || '',
           company_website: props.company_hp_url || undefined,
           location: props.work_place_area || '',
           industry: props.industry || '',
           japanese_level: props.japanese_level,
           visa_type: props.status_of_residence ? [props.status_of_residence] : [],
           salary_min: props.salary ? parseInt(props.salary, 10) : undefined,
           salary_max: undefined,
           posted_at: apiResponse.createdAt,
           closing_date: undefined,
           hero_image_url: undefined,
           is_saved: false,
           overview: {
             business_name: props.company_name,
             company_website: props.company_hp_url,
             job_type: undefined,
             eligible_residence_status: props.status_of_residence,
             number_of_people: props.number_recruit,
             recruitment_range_nationality: undefined,
             foreigner_acceptance_status: props.foreigner_acceptance_status,
           },
           job_description: undefined,
           working_conditions: {
             working_hours: props.working_hours,
             days_off: props.holiday,
             overtime: props.overtime,
             trial_period: undefined,
             employment_type: undefined,
             insurance: props.social_insurance,
           },
           housing_support: {
             moving_support: undefined,
             dormitory: props.dorm_imformation,
             dormitory_fees: undefined,
             furniture_and_appliances: props.furniture_support,
           },
           application_conditions: {
             japanese_level: props.japanese_level,
             experience: props.qualifi_exp,
             age: undefined,
             visa_types: props.status_of_residence ? [props.status_of_residence] : [],
           },
           selection_process: props.selection_process,
           others: props.remarks,
         };
       };

      const jobDetail = transformJobData(data);

      // Set the job in Redux using the existing setJob action
      dispatch(setJob({ jobId, job: jobDetail }));

      // Set fetchLoading to false
      dispatch(setFetchLoading({ jobId, loading: false }));

      return jobDetail;
    } catch (error: any) {
      // Set fetchError and fetchLoading to false
      dispatch(setFetchError({ jobId, error: error.message || 'Failed to fetch job detail' }));
      dispatch(setFetchLoading({ jobId, loading: false }));
      return rejectWithValue(error.message || 'Failed to fetch job detail');
    }
  }
);

// Selectors
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
export const selectFetchLoading = (state: RootState, jobId: string): boolean => 
  state.jobDetail.jobs?.[jobId]?.fetchLoading ?? false;
export const selectFetchError = (state: RootState, jobId: string): string | null => 
  state.jobDetail.jobs?.[jobId]?.fetchError ?? null;

export default jobDetailSlice.reducer;