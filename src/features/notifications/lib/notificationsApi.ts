import type { AppNotification } from '../types/notifications.types';

export async function fetchNotifications(userId: string): Promise<AppNotification[]> {
  return [];
}

export async function markNotificationRead(id: string): Promise<void> {
}

export async function markAllNotificationsRead(userId: string): Promise<void> {
}

export async function getUnreadCount(userId: string): Promise<number> {
  return 0;
}

export function formatRelativeTime(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${Math.max(1, minutes)}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}