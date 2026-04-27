import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Application, ActivityTab } from '../features/activity/types/activity.types';
import type { Job } from '../features/browse/types/browse.types';
import {
  DUMMY_APPLICATIONS,
  DUMMY_SAVED_JOBS,
} from '../features/activity/constants/activityData';

export interface ActivityState {
  applications: Application[];
  savedJobs: Job[];
  activeTab: ActivityTab;
   removeSavedConfirmJobId: string | null;
}

const initialState: ActivityState = {
  applications: DUMMY_APPLICATIONS,
  savedJobs: DUMMY_SAVED_JOBS,
  activeTab: 'Applications',
  removeSavedConfirmJobId: null,
};

export const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<ActivityTab>) => {
      state.activeTab = action.payload;
    },
    setApplications: (state, action: PayloadAction<Application[]>) => {
      state.applications = action.payload;
    },
    setSavedJobs: (state, action: PayloadAction<Job[]>) => {
      state.savedJobs = action.payload;
    },
    requestRemoveSaved: (state, action: PayloadAction<string>) => {
      state.removeSavedConfirmJobId = action.payload;
    },
    cancelRemoveSaved: (state) => {
      state.removeSavedConfirmJobId = null;
    },
    confirmRemoveSaved: (state) => {
      if (state.removeSavedConfirmJobId) {
        state.savedJobs = state.savedJobs.filter(
          (j) => j.id !== state.removeSavedConfirmJobId
        );
        state.removeSavedConfirmJobId = null;
      }
    },
  },
});

export const {
  setActiveTab,
  setApplications,
  setSavedJobs,
  requestRemoveSaved,
  cancelRemoveSaved,
  confirmRemoveSaved,
} = activitySlice.actions;

export const selectApplications = (state: { activity: ActivityState }) =>
  state.activity.applications;
export const selectSavedJobs = (state: { activity: ActivityState }) =>
  state.activity.savedJobs;
export const selectActiveTab = (state: { activity: ActivityState }) =>
  state.activity.activeTab;
export const selectRemoveSavedConfirmJobId = (state: { activity: ActivityState }) =>
  state.activity.removeSavedConfirmJobId;

export default activitySlice.reducer;