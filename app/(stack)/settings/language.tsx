import { useRouter } from 'expo-router';
import { useSettings } from '@/features/settings/hooks/useSettings';
import { LanguageView } from '@/features/settings/components/LanguageView';

export default function LanguageScreen() {
  const router = useRouter();
  const { language, handleSelectLanguage } = useSettings();

  return (
    <LanguageView
      selectedLanguage={language}
      onBack={() => router.back()}
      onSelect={(code) => {
        handleSelectLanguage(code);
        router.back();
      }}
    />
  );
}