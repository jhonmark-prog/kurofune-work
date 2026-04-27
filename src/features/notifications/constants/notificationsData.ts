import type { AppNotification, NotificationType } from '../types/notifications.types';

export const NOTIFICATION_ICON: Record<NotificationType, string> = {
  welcome:              'happy-outline',
  application_received: 'document-text-outline',
  status_accepted:      'checkmark-circle-outline',
  status_rejected:      'close-circle-outline',
  chat_message:         'chatbubble-outline',
  profile_reminder:     'person-outline',
  job_closing:          'time-outline',
};

export const DUMMY_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    type: 'welcome',
    title: 'Happy to have you here!',
    body: 'Thank you for joining KUROFUNE.',
    is_read: false,
    target_id: null,
    created_at: new Date(Date.now() - 60 * 1000).toISOString(),
  },
  {
    id: 'notif-2',
    type: 'welcome',
    title: 'Happy to have you here!',
    body: 'Thank you for joining KUROFUNE.',
    is_read: true,
    target_id: null,
    created_at: new Date(Date.now() - 60 * 1000).toISOString(),
  },
];