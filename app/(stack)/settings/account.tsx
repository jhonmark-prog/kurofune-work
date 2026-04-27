import { useRouter } from 'expo-router';
import { useAccountSettings } from '@/features/settings/hooks/useSettings';
import { AccountSettingsView } from '@/features/settings/components/AccountSettingsView';

export default function AccountSettingsScreen() {
  const router = useRouter();
  const {
    password, setPassword,
    confirmPassword, setConfirmPassword,
    showPassword, setShowPassword,
    showConfirmPassword, setShowConfirmPassword,
    passwordError,
    deleteDialogVisible,
    handleSavePassword,
    handleRequestDelete,
    handleCancelDelete,
    handleConfirmDelete,
  } = useAccountSettings();

  return (
    <AccountSettingsView
      password={password}
      setPassword={setPassword}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      showConfirmPassword={showConfirmPassword}
      setShowConfirmPassword={setShowConfirmPassword}
      passwordError={passwordError}
      deleteDialogVisible={deleteDialogVisible}
      onBack={() => router.back()}
      onSave={handleSavePassword}
      onRequestDelete={handleRequestDelete}
      onCancelDelete={handleCancelDelete}
      onConfirmDelete={handleConfirmDelete}
    />
  );
}