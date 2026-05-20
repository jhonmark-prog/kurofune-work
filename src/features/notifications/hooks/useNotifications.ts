import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';
import {
  selectNotifications,
  selectUnreadCount,
  markRead,
  markAllRead,
} from '../../../store/notificationsSlice';
import type { RootState } from '../../../store/types';
import type { AppNotification } from '../types/notifications.types';
import { formatRelativeTime } from '../lib/notificationsApi';

export function useNotifications() {
  const dispatch = useDispatch();
  const router = useRouter();

  const notifications = useSelector((state: RootState) =>
    selectNotifications(state as any)
  );
  const unreadCount = useSelector((state: RootState) =>
    selectUnreadCount(state as any)
  );

  const handleNotificationPress = (notification: AppNotification) => {

    if (!notification.is_read) {
      dispatch(markRead(notification.id));
    }


    if (!notification.target_id) return;

    switch (notification.type) {
      case 'application_received':
      case 'status_accepted':
      case 'status_rejected':
        router.push('/(tabs)/activity');
        break;
      case 'chat_message':
        router.push(`/chat/${notification.target_id}`);
        break;
      case 'job_closing':
        router.push(`/job/${notification.target_id}`);
        break;
      case 'profile_reminder':
        router.push('/(tabs)/you');
        break;
      default:
        break;
    }
  };

  const handleMarkAllRead = () => {
    dispatch(markAllRead());
  };

  return {
    notifications,
    unreadCount,
    formatRelativeTime,
    handleNotificationPress,
    handleMarkAllRead,
  };
}