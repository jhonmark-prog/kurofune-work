export type NotificationType =
  | 'welcome'
  | 'application_received'
  | 'status_accepted'
  | 'status_rejected'
  | 'chat_message'
  | 'profile_reminder'
  | 'job_closing';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  is_read: boolean;
   target_id: string | null;
   created_at: string;
}

export type NotificationStatus = 'idle' | 'loading' | 'succeeded' | 'failed';