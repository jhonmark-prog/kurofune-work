import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Application, ApplicationsState } from '../types/applications.types';

const initialState: ApplicationsState = {
  applications: [],
  loading: false,
  error: null,
};

export const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setApplications: (state, action: PayloadAction<Application[]>) => {
      state.applications = action.payload;
    },
    addApplication: (state, action: PayloadAction<Application>) => {
      state.applications.push(action.payload);
    },
    updateApplication: (
      state,
      action: PayloadAction<{ id: number; data: Partial<Application> }>
    ) => {
      const idx = state.applications.findIndex((a) => a.id === action.payload.id);
      if (idx !== -1) {
        state.applications[idx] = { ...state.applications[idx], ...action.payload.data };
      }
    },
    removeApplication: (state, action: PayloadAction<number>) => {
      state.applications = state.applications.filter((a) => a.id !== action.payload);
    },
    clearApplications: (state) => {
      state.applications = [];
    },
  },
});

export const {
  setLoading,
  setError,
  setApplications,
  addApplication,
  updateApplication,
  removeApplication,
  clearApplications,
} = applicationsSlice.actions;

export const selectApplications = (state: { applications: ApplicationsState }): Application[] =>
  state.applications.applications;

export const selectApplicationsLoading = (state: { applications: ApplicationsState }): boolean =>
  state.applications.loading;

export const selectApplicationsError = (state: { applications: ApplicationsState }): string | null =>
  state.applications.error;

export default applicationsSlice.reducer;
