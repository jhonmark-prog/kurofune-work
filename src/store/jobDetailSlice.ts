import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { JobDetail, JobDetailTab } from '../features/job-detail/types/job-detail.types';
import { DUMMY_JOB_DETAIL } from '../features/job-detail/constants/jobDetailData';
import type { RootState } from '@/store/types';
import { createApplication } from '@/features/applications/lib/applicationsApi';

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
}

const initialJobDetailState: JobDetailState = {
  jobs: {},
};

function makeEntry(): JobDetailState['jobs'][string] {
  return {
    job: null,
    activeTab: 'Overview',
    hasApplied: false,
    applyLoading: false,
    applyError: null,
    fetchLoading: false,
    fetchError: null,
  };
}

/**
 * Guards against two crash scenarios:
 * 1. state.jobs wiped/undefined after redux-persist schema mismatch
 * 2. state.jobs[jobId] not yet created when a tab-press fires before fetch completes
 */
function ensureEntry(state: JobDetailState, jobId: string) {
  if (!state.jobs || typeof state.jobs !== 'object') {
    state.jobs = {};
  }
  if (!state.jobs[jobId]) {
    state.jobs[jobId] = makeEntry();
  }
}

export const jobDetailSlice = createSlice({
  name: 'jobDetail',
  initialState: initialJobDetailState,
  reducers: {
    setJob: (state, action: { payload: { jobId: string; job: JobDetail } }) => {
      ensureEntry(state, action.payload.jobId);
      state.jobs[action.payload.jobId].job = action.payload.job;
    },
    setActiveTab: (state, action: { payload: { jobId: string; tab: JobDetailTab } }) => {
      ensureEntry(state, action.payload.jobId);
      state.jobs[action.payload.jobId].activeTab = action.payload.tab;
    },
    toggleSaved: (state, action: { payload: string }) => {
      ensureEntry(state, action.payload);
      const entry = state.jobs[action.payload];
      if (entry.job) {
        entry.job.is_saved = !entry.job.is_saved;
      }
    },
    applyForJob: (state, action: { payload: string }) => {
      ensureEntry(state, action.payload);
      state.jobs[action.payload].hasApplied = true;
    },
    resetApply: (state, action: { payload: string }) => {
      ensureEntry(state, action.payload);
      state.jobs[action.payload].hasApplied = false;
    },
    setApplyLoading: (state, action: { payload: { jobId: string; loading: boolean } }) => {
      ensureEntry(state, action.payload.jobId);
      state.jobs[action.payload.jobId].applyLoading = action.payload.loading;
    },
    setApplyError: (state, action: { payload: { jobId: string; error: string | null } }) => {
      ensureEntry(state, action.payload.jobId);
      state.jobs[action.payload.jobId].applyError = action.payload.error;
    },
    setFetchLoading: (state, action: { payload: { jobId: string; loading: boolean } }) => {
      ensureEntry(state, action.payload.jobId);
      state.jobs[action.payload.jobId].fetchLoading = action.payload.loading;
    },
    setFetchError: (state, action: { payload: { jobId: string; error: string | null } }) => {
      ensureEntry(state, action.payload.jobId);
      state.jobs[action.payload.jobId].fetchError = action.payload.error;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyForJobAsync.pending, (state, action) => {
        ensureEntry(state, action.meta.arg);
        state.jobs[action.meta.arg].applyLoading = true;
        state.jobs[action.meta.arg].applyError = null;
      })
      .addCase(applyForJobAsync.fulfilled, (state, action) => {
        ensureEntry(state, action.meta.arg);
        state.jobs[action.meta.arg].applyLoading = false;
        state.jobs[action.meta.arg].hasApplied = true;
      })
      .addCase(applyForJobAsync.rejected, (state, action) => {
        ensureEntry(state, action.meta.arg);
        state.jobs[action.meta.arg].applyLoading = false;
        state.jobs[action.meta.arg].applyError =
          action.error.message || 'Failed to apply for job';
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

// ─── Transformer: HubSpot API → JobDetail ────────────────────────────────────
function extractSalaryMin(salaryStr: string): number | undefined {
  const matches = salaryStr.match(/[\d,]+/g);
  if (matches?.[0]) {
    const num = parseInt(matches[0].replace(/,/g, ''), 10);
    return isNaN(num) ? undefined : num;
  }
  return undefined;
}

export function transformJobData(apiResponse: any): JobDetail {
  if (!apiResponse?.properties) {
    console.error('Invalid API response for job detail:', apiResponse);
    return DUMMY_JOB_DETAIL;
  }

  const p = apiResponse.properties;

  const location =
    [p.work_place, p.work_place_area].filter(Boolean).join(', ') || '—';
  const industry = p.industry_category || p.industry || '—';
  const visa_type: string[] = p.status_of_residence ? [p.status_of_residence] : [];
  const salary_min = p.salary ? extractSalaryMin(p.salary) : undefined;

  // Others: combine remarks, bonus, drivers_license
  const otherParts = [
    p.remarks,
    p.bonus ? `Bonus: ${p.bonus}` : null,
    p.drivers_license ? `Driver's license: ${p.drivers_license}` : null,
  ].filter(Boolean);

  return {
    id: apiResponse.id,
    title: p.job_name || '—',
    company_name: p.company_name || '—',
    company_website: p.company_hp_url || undefined,
    location,
    industry,
    japanese_level: p.japanese_level || undefined,
    visa_type,
    salary_min,
    salary_max: undefined,
    posted_at: apiResponse.createdAt,
    closing_date: p.recruit_date || undefined,
    hero_image_url: undefined,
    is_saved: false,

    // Direct fields used by pills
    working_hours: p.working_hours || undefined,
    holiday: p.holiday || undefined,
    overtime: p.overtime || undefined,
    remarks: p.remarks || undefined,

    // ── Overview ──────────────────────────────────────────────────────────
    overview: {
      business_name:                 p.company_name          || undefined,
      company_website:               p.company_hp_url        || undefined,
      job_type:                      p.occupation            || undefined,
      eligible_residence_status:     p.status_of_residence   || undefined,
      number_of_people:              p.number_recruit        || undefined,
      recruitment_range_nationality: p.recruit_range || p.recruit_ranges || p.workers_countries || undefined,
      foreigner_acceptance_status:   p.acceptance_status     || undefined,
    },

    // ── Job Description ───────────────────────────────────────────────────
    // business_content = main description; pr = PR/appeal text as fallback
    job_description: p.business_content || p.pr || undefined,

    // ── Working Conditions ────────────────────────────────────────────────
    working_conditions: {
      working_hours:   p.working_hours       || undefined,
      days_off:        p.holiday             || undefined,
      overtime:        p.overtime            || undefined,
      // average_workingdays used as trial_period slot (closest semantic match)
      trial_period:    p.average_workingdays || undefined,
      // raise info goes in employment_type slot
      employment_type: p.raise               || undefined,
      insurance:       p.social_insurance    || undefined,
    },

    // ── Housing and Living Support ────────────────────────────────────────
    housing_support: {
      moving_support:          p.support          || undefined,
      dormitory:               p.dorm_imformation || undefined,
      // careworker_support is the closest match for dormitory_fees slot
      dormitory_fees:          p.careworker_support || undefined,
      furniture_and_appliances: p.furniture_support || undefined,
    },

    // ── Application Conditions ────────────────────────────────────────────
    application_conditions: {
      japanese_level: p.japanese_level || undefined,
      experience:     p.qualifi_exp    || undefined,
      // required = general requirements (age, other conditions)
      age:            p.required       || undefined,
      visa_types:     p.status_of_residence || undefined,
    },

    // ── Selection Process ─────────────────────────────────────────────────
    selection_process: p.selection_process || undefined,

    // ── Others ───────────────────────────────────────────────────────────
    others: otherParts.length > 0 ? otherParts.join('\n\n') : undefined,
  };
}

// ─── Async: apply ─────────────────────────────────────────────────────────────
export const applyForJobAsync = createAsyncThunk(
  'jobDetail/applyForJobAsync',
  async (jobId: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const jobDetail = state.jobDetail?.jobs?.[jobId]?.job;
      const user = (state as any).user;

      if (!jobDetail) throw new Error('Job data not available');
      if (!user?.accessToken || !user?.id) throw new Error('User not authenticated');

      const result = await createApplication(
        {
          user_id: user.id,
          job_id: jobDetail.id,
          job_name: jobDetail.title,
          job_title: jobDetail.company_name,
          status: 'in_progress',
        },
        user.accessToken
      );

      if (result.error) throw new Error(result.error);
      return result.application;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to apply for job');
    }
  }
);

// ─── Async: fetch ─────────────────────────────────────────────────────────────
export const fetchJobDetailById = createAsyncThunk(
  'jobDetail/fetchJobDetailById',
  async (jobId: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setFetchLoading({ jobId, loading: true }));
      dispatch(setFetchError({ jobId, error: null }));

      const response = await fetch(
        `https://barrier-erasable-uncivil.ngrok-free.dev/api/v1/hubspot/job-offer/${jobId}`
      );

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      const jobDetail = transformJobData(data);

      dispatch(setJob({ jobId, job: jobDetail }));
      dispatch(setFetchLoading({ jobId, loading: false }));

      return jobDetail;
    } catch (error: any) {
      dispatch(setFetchError({ jobId, error: error.message || 'Failed to fetch job detail' }));
      dispatch(setFetchLoading({ jobId, loading: false }));
      return rejectWithValue(error.message || 'Failed to fetch job detail');
    }
  }
);

// ─── Selectors ────────────────────────────────────────────────────────────────
export const selectJobDetail = (state: RootState, jobId: string): JobDetail | null =>
  state.jobDetail?.jobs?.[jobId]?.job ?? null;

export const selectActiveTab = (state: RootState, jobId: string): JobDetailTab =>
  state.jobDetail?.jobs?.[jobId]?.activeTab ?? 'Overview';

export const selectHasApplied = (state: RootState, jobId: string): boolean =>
  state.jobDetail?.jobs?.[jobId]?.hasApplied ?? false;

export const selectIsSaved = (state: RootState, jobId: string): boolean =>
  state.jobDetail?.jobs?.[jobId]?.job?.is_saved ?? false;

export const selectApplyLoading = (state: RootState, jobId: string): boolean =>
  state.jobDetail?.jobs?.[jobId]?.applyLoading ?? false;

export const selectApplyError = (state: RootState, jobId: string): string | null =>
  state.jobDetail?.jobs?.[jobId]?.applyError ?? null;

export const selectFetchLoading = (state: RootState, jobId: string): boolean =>
  state.jobDetail?.jobs?.[jobId]?.fetchLoading ?? false;

export const selectFetchError = (state: RootState, jobId: string): string | null =>
  state.jobDetail?.jobs?.[jobId]?.fetchError ?? null;

export default jobDetailSlice.reducer;