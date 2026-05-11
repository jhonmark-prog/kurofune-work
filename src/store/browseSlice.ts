import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Job, JobFilters } from '../features/browse/types/browse.types';
import { DEFAULT_FILTERS } from '../features/browse/constants/browseData';
import { refreshBrowseJobs } from '../features/browse/lib/browseApi';

export interface BrowseState {
  jobs: Job[];
  appliedFilters: JobFilters;
  savedJobIds: string[];
  loading: boolean;
  error: string | null;
}

const initialBrowseState: BrowseState = {
  jobs: [],
  appliedFilters: DEFAULT_FILTERS,
  savedJobIds: [],
  loading: false,
  error: null,
};

export const browseSlice = createSlice({
  name: 'browse',
  initialState: initialBrowseState,
  reducers: {
    setJobs: (state, action: { payload: { jobs: Job[] } }) => {
      state.jobs = action.payload.jobs;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: { payload: { loading: boolean } }) => {
      state.loading = action.payload.loading;
    },
    setError: (state, action: { payload: { error: string } }) => {
      state.error = action.payload.error;
      state.loading = false;
    },
    setAppliedFilters: (state, action: { payload: { filters: JobFilters } }) => {
      state.appliedFilters = action.payload.filters;
    },
    updateFilter: (state, action: { payload: { key: keyof JobFilters; value: string } }) => {
      const { key, value } = action.payload;
      state.appliedFilters = {
        ...state.appliedFilters,
        [key]: value,
      };
    },
    clearFilter: (state, action: { payload: { key: keyof JobFilters } }) => {
      const key = action.payload.key;
      state.appliedFilters = {
        ...state.appliedFilters,
        [key]: key === 'location' ? '' : 'All',
      };
    },
    clearAllFilters: (state) => {
      state.appliedFilters = DEFAULT_FILTERS;
    },
    toggleSavedJob: (state, action: { payload: { jobId: string } }) => {
      const jobId = action.payload.jobId;
      const jobIndex = state.jobs.findIndex((j) => j.id === jobId);
      if (jobIndex !== -1) {
        const isSaved = !state.jobs[jobIndex].is_saved;
        state.jobs[jobIndex].is_saved = isSaved;
        if (isSaved) {
          state.savedJobIds.push(jobId);
        } else {
          state.savedJobIds = state.savedJobIds.filter((id) => id !== jobId);
        }
      }
    },
  },
});

export const {
  setJobs,
  setLoading,
  setError,
  setAppliedFilters,
  updateFilter,
  clearFilter,
  clearAllFilters,
  toggleSavedJob,
} = browseSlice.actions;

export const loadJobsAsync = createAsyncThunk(
  'browse/loadJobs',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading({ loading: true }));
      const jobs = await refreshBrowseJobs();
      dispatch(setJobs({ jobs }));
      return jobs;
    } catch (error: any) {
      dispatch(setError({ error: error.message || 'Failed to load jobs' }));
      return rejectWithValue(error.message);
    }
  }
);

export const selectJobs = (state: { browse: BrowseState }): Job[] => state.browse.jobs;
export const selectAppliedFilters = (state: { browse: BrowseState }): JobFilters =>
  state.browse.appliedFilters;
export const selectSavedJobIds = (state: { browse: BrowseState }): string[] =>
  state.browse.savedJobIds;
export const selectLoading = (state: { browse: BrowseState }): boolean =>
  state.browse.loading;
export const selectError = (state: { browse: BrowseState }): string | null =>
  state.browse.error;

export default browseSlice.reducer;