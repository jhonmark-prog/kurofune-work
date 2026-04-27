import { useRouter } from 'expo-router';
import { SendMoneyView } from '@/features/settings/components/SendMoneyView';

export default function SendMoneyScreen() {
  const router = useRouter();

  return <SendMoneyView onBack={() => router.back()} />;
}