import { useState } from 'react';
import { Linking } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';
import {
  selectLanguage,
  selectDeleteDialogVisible,
  setLanguage,
  showDeleteDialog,
  hideDeleteDialog,
} from '../../../store/settingsSlice';
import { logout } from '../../../store/userSlice';
import type { RootState } from '../../../store/types';
import type { LanguageCode } from '../types/settings.types';
import { validatePassword, deleteAccount } from '../lib/settingsApi';
import { PAYFOREX_URL, PRIVACY_POLICY_URL, TERMS_URL } from '../constants/settingsData';

export function useSettings() {
  const dispatch = useDispatch();
  const router = useRouter();

  const language = useSelector((state: RootState) => selectLanguage(state as any));
  const deleteDialogVisible = useSelector((state: RootState) =>
    selectDeleteDialogVisible(state as any)
  );

  const handleLogout = () => {
    dispatch(logout());

  };

  const handleSelectLanguage = (code: LanguageCode) => {
    dispatch(setLanguage(code));
  };

  const handleOpenPrivacyPolicy = () => {
    Linking.openURL(PRIVACY_POLICY_URL);
  };

  const handleOpenTerms = () => {
    Linking.openURL(TERMS_URL);
  };

  const handleRequestDeleteAccount = () => {
    dispatch(showDeleteDialog());
  };

  const handleCancelDelete = () => {
    dispatch(hideDeleteDialog());
  };

  const handleConfirmDelete = async () => {
    dispatch(hideDeleteDialog());

    dispatch(logout());
  };

  return {
    language,
    deleteDialogVisible,
    handleLogout,
    handleSelectLanguage,
    handleOpenPrivacyPolicy,
    handleOpenTerms,
    handleRequestDeleteAccount,
    handleCancelDelete,
    handleConfirmDelete,
  };
}

export function useAccountSettings() {
  const dispatch = useDispatch();
  const router = useRouter();

  const deleteDialogVisible = useSelector((state: RootState) =>
    selectDeleteDialogVisible(state as any)
  );

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleSavePassword = () => {
    const error = validatePassword(password);
    if (error) { setPasswordError(error); return; }
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }
     setPasswordError(null);
     setPassword('');
     setConfirmPassword('');
  };

  const handleRequestDelete = () => dispatch(showDeleteDialog());
  const handleCancelDelete  = () => dispatch(hideDeleteDialog());
  const handleConfirmDelete = () => {
    dispatch(hideDeleteDialog());
    dispatch(logout());
  };

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    passwordError,
    deleteDialogVisible,
    handleSavePassword,
    handleRequestDelete,
    handleCancelDelete,
    handleConfirmDelete,
  };
}