import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Job, JobFilters } from '../features/browse/types/browse.types';
import { DEFAULT_FILTERS } from '../features/browse/constants/browseData';
import { refreshBrowseJobs, fetchBrowseJobsWithResponse } from '../features/browse/lib/browseApi';

export interface BrowseState {
  jobs: Job[];
  appliedFilters: JobFilters;
  savedJobIds: string[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  totalCount: number;
  perPage: number;
}

const initialBrowseState: BrowseState = {
  jobs: [],
  appliedFilters: DEFAULT_FILTERS,
  savedJobIds: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
  totalCount: 0,
  perPage: 10,
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
    resetPagination: (state) => {
      state.page = 1;
      state.hasMore = true;
      state.jobs = [];
    },
    setPaginationState: (state, action: { payload: { page: number; hasMore: boolean; totalCount: number; perPage: number } }) => {
      state.page = action.payload.page;
      state.hasMore = action.payload.hasMore;
      state.totalCount = action.payload.totalCount;
      state.perPage = action.payload.perPage;
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
  resetPagination,
  setPaginationState,
} = browseSlice.actions;

export const loadJobsAsync = createAsyncThunk(
  'browse/loadJobs',
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const state = getState() as { browse: BrowseState };
      const { appliedFilters } = state.browse;
      
      // Build search string from filters - only include non-blank/non-'All' values
      const searchTerms = [
        appliedFilters.location,
        appliedFilters.industry !== 'All' ? appliedFilters.industry : undefined,
        appliedFilters.visaType !== 'All' ? appliedFilters.visaType : undefined
      ].filter(Boolean); // Remove undefined values
      
      const searchQuery = searchTerms.join(' ').trim();
      
      // Build params with filters and pagination - only include search if not empty
      const params: { 
        search?: string; 
        page: number; 
        with_pagination: string 
      } = {
        page: state.browse.page,
        with_pagination: 'yes'
      };
      
      // Only add search parameter if it's not empty
      if (searchQuery) {
        params.search = searchQuery;
      }
      
      dispatch(setLoading({ loading: true }));
      const result = await fetchBrowseJobsWithResponse(params);
      
      if (!result) {
        throw new Error('Failed to load jobs');
      }
      
      const { jobs, response } = result;
      
      dispatch(setJobs({ jobs }));
      dispatch(setPaginationState({
        page: response.current_page,
        hasMore: response.current_page < response.last_page,
        totalCount: response.total,
        perPage: response.per_page
      }));
      
      return jobs;
    } catch (error: any) {
      dispatch(setError({ error: error.message || 'Failed to load jobs' }));
      return rejectWithValue(error.message);
    }
  }
);

export const loadMoreJobsAsync = createAsyncThunk(
  'browse/loadMoreJobs',
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const state = getState() as { browse: BrowseState };
      const { appliedFilters, page, hasMore } = state.browse;
      
      if (!hasMore) return;
      
      const nextPage = page + 1;
      
      // Build search string from filters
      const searchTerms = [
        appliedFilters.location,
        appliedFilters.industry !== 'All' ? appliedFilters.industry : undefined,
        appliedFilters.visaType !== 'All' ? appliedFilters.visaType : undefined
      ].filter(Boolean); // Remove undefined values
      
      const searchQuery = searchTerms.join(' ').trim();
      
      // Build params with filters and pagination - only include search if not empty
      const params: { 
        search?: string; 
        page: number; 
        with_pagination: string 
      } = {
        page: nextPage,
        with_pagination: 'yes'
      };
      
      // Only add search parameter if it's not empty
      if (searchQuery) {
        params.search = searchQuery;
      }
      
      dispatch(setLoading({ loading: true }));
      
      const result = await fetchBrowseJobsWithResponse(params);
      
      if (!result) {
        throw new Error('Failed to load more jobs');
      }
      
      const { jobs, response } = result;
      
      // Append new jobs to existing ones
      dispatch(setJobs({ jobs: [...state.browse.jobs, ...jobs] }));
      
      // Update pagination state
      dispatch(setPaginationState({
        page: response.current_page,
        hasMore: response.current_page < response.last_page,
        totalCount: response.total,
        perPage: response.per_page
      }));
      
      return jobs;
    } catch (error: any) {
      dispatch(setError({ error: error.message || 'Failed to load more jobs' }));
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
export const selectPage = (state: { browse: BrowseState }): number =>
  state.browse.page;
export const selectHasMore = (state: { browse: BrowseState }): boolean =>
  state.browse.hasMore;
export const selectTotalCount = (state: { browse: BrowseState }): number =>
  state.browse.totalCount;
export const selectPerPage = (state: { browse: BrowseState }): number =>
  state.browse.perPage;

export default browseSlice.reducer;