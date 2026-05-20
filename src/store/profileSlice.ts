import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Profile, Experience, Education, ProfileEditTab } from '../features/profile/types/profile.types';
import {
  DUMMY_PROFILE,
  DUMMY_EXPERIENCES,
  DUMMY_EDUCATIONS,
} from '../features/profile/constants/profileData';

export interface ProfileState {
  profile: Profile;
  experiences: Experience[];
  educations: Education[];
  editModalVisible: boolean;
  activeEditTab: ProfileEditTab;
}

const initialProfileState: ProfileState = {
  profile: DUMMY_PROFILE,
  experiences: DUMMY_EXPERIENCES,
  educations: DUMMY_EDUCATIONS,
  editModalVisible: false,
  activeEditTab: 'Personal',
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState: initialProfileState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
    },
    updateProfileField: (
      state,
      action: PayloadAction<{ key: keyof Profile; value: any }>
    ) => {
      (state.profile as any)[action.payload.key] = action.payload.value;
    },
    setExperiences: (state, action: PayloadAction<Experience[]>) => {
      state.experiences = action.payload;
    },
    addExperience: (state, action: PayloadAction<Experience>) => {
      state.experiences.push(action.payload);
    },
    updateExperience: (
      state,
      action: PayloadAction<{ id: string; data: Partial<Experience> }>
    ) => {
      const idx = state.experiences.findIndex((e) => e.id === action.payload.id);
      if (idx !== -1) {
        state.experiences[idx] = { ...state.experiences[idx], ...action.payload.data };
      }
    },
    removeExperience: (state, action: PayloadAction<string>) => {
      state.experiences = state.experiences.filter((e) => e.id !== action.payload);
    },
    setEducations: (state, action: PayloadAction<Education[]>) => {
      state.educations = action.payload;
    },
    addEducation: (state, action: PayloadAction<Education>) => {
      state.educations.push(action.payload);
    },
    updateEducation: (
      state,
      action: PayloadAction<{ id: string; data: Partial<Education> }>
    ) => {
      const idx = state.educations.findIndex((e) => e.id === action.payload.id);
      if (idx !== -1) {
        state.educations[idx] = { ...state.educations[idx], ...action.payload.data };
      }
    },
    removeEducation: (state, action: PayloadAction<string>) => {
      state.educations = state.educations.filter((e) => e.id !== action.payload);
    },
    openEditModal: (state, action: PayloadAction<ProfileEditTab>) => {
      state.editModalVisible = true;
      state.activeEditTab = action.payload;
    },
    closeEditModal: (state) => {
      state.editModalVisible = false;
    },
    setActiveEditTab: (state, action: PayloadAction<ProfileEditTab>) => {
      state.activeEditTab = action.payload;
    },
    updateCompletionPct: (state, action: PayloadAction<number>) => {
      state.profile.completion_pct = action.payload;
    },
  },
});

export const {
  setProfile,
  updateProfileField,
  setExperiences,
  addExperience,
  updateExperience,
  removeExperience,
  setEducations,
  addEducation,
  updateEducation,
  removeEducation,
  openEditModal,
  closeEditModal,
  setActiveEditTab,
  updateCompletionPct,
} = profileSlice.actions;

export const selectProfile = (state: { profile: ProfileState }): Profile =>
  state.profile.profile;
export const selectExperiences = (state: { profile: ProfileState }): Experience[] =>
  state.profile.experiences;
export const selectEducations = (state: { profile: ProfileState }): Education[] =>
  state.profile.educations;
export const selectEditModalVisible = (state: { profile: ProfileState }): boolean =>
  state.profile.editModalVisible;
export const selectActiveEditTab = (state: { profile: ProfileState }): ProfileEditTab =>
  state.profile.activeEditTab;

export default profileSlice.reducer;