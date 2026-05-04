import { useRouter } from 'expo-router';
import { useNotifications } from '@/features/notifications/hooks/useNotifications';
import { NotificationsView } from '@/features/notifications/components/NotificationsView';

export default function NotificationsScreen() {
  const router = useRouter();
  const { notifications, handleNotificationPress } = useNotifications();

  return (
    <NotificationsView
      notifications={notifications}
      onBack={() => router.back()}
      onNotificationPress={handleNotificationPress}
    />
  );
}