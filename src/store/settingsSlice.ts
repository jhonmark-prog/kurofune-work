import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { LanguageCode } from '../features/settings/types/settings.types';

export interface SettingsState {
  language: LanguageCode;
  deleteAccountDialogVisible: boolean;
}

const initialState: SettingsState = {
  language: 'en',
  deleteAccountDialogVisible: false,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<LanguageCode>) => {
      state.language = action.payload;
    },
    showDeleteDialog: (state) => {
      state.deleteAccountDialogVisible = true;
    },
    hideDeleteDialog: (state) => {
      state.deleteAccountDialogVisible = false;
    },
  },
});

export const { setLanguage, showDeleteDialog, hideDeleteDialog } = settingsSlice.actions;

export const selectLanguage = (state: { settings: SettingsState }): LanguageCode =>
  state.settings.language;
export const selectDeleteDialogVisible = (state: { settings: SettingsState }): boolean =>
  state.settings.deleteAccountDialogVisible;

export default settingsSlice.reducer;