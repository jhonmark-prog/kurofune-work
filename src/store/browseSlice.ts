import { createSlice } from '@reduxjs/toolkit';
import { Job, JobFilters } from '../features/browse/types/browse.types';
import { DUMMY_JOBS, DEFAULT_FILTERS } from '../features/browse/constants/browseData';

export interface BrowseState {
  jobs: Job[];
  appliedFilters: JobFilters;
  savedJobIds: string[];
}

const initialBrowseState: BrowseState = {
  jobs: DUMMY_JOBS,
  appliedFilters: DEFAULT_FILTERS,
  savedJobIds: [],
};

export const browseSlice = createSlice({
  name: 'browse',
  initialState: initialBrowseState,
  reducers: {
    setJobs: (state, action: { payload: { jobs: Job[] } }) => {
      state.jobs = action.payload.jobs;
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
  setAppliedFilters,
  updateFilter,
  clearFilter,
  clearAllFilters,
  toggleSavedJob,
} = browseSlice.actions;

export const selectJobs = (state: { browse: BrowseState }): Job[] => state.browse.jobs;
export const selectAppliedFilters = (state: { browse: BrowseState }): JobFilters =>
  state.browse.appliedFilters;
export const selectSavedJobIds = (state: { browse: BrowseState }): string[] =>
  state.browse.savedJobIds;

export default browseSlice.reducer;