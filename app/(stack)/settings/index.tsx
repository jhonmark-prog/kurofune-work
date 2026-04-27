import { Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { useSettings } from '@/features/settings/hooks/useSettings';
import { SettingsView } from '@/features/settings/components/SettingsView';
import { PRIVACY_POLICY_URL, TERMS_URL } from '@/features/settings/constants/settingsData';

export default function SettingsScreen() {
  const router = useRouter();
  const { handleLogout } = useSettings();

  return (
    <SettingsView
      onBack={() => router.back()}
      onLogout={handleLogout}
      onAccountSettings={() => router.push('/(stack)/settings/account')}
      onLanguage={() => router.push('/(stack)/settings/language')}
      onPrivacyPolicy={() => Linking.openURL(PRIVACY_POLICY_URL)}
      onTerms={() => Linking.openURL(TERMS_URL)}
      onSendMoney={() => router.push('/(stack)/settings/send-money')}
    />
  );
}