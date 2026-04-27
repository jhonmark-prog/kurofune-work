import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '@/components';
import { Colors } from '@/constants/colors';
import { notificationsStyles as styles } from '../../styles/NotificationsScreen.styles';
import { NOTIFICATION_ICON } from '../../constants/notificationsData';
import type { AppNotification } from '../../types/notifications.types';

interface NotificationRowProps {
  notification: AppNotification;
  relativeTime: string;
  onPress: (notification: AppNotification) => void;
}

export function NotificationRow({ notification, relativeTime, onPress }: NotificationRowProps) {
  const iconName = NOTIFICATION_ICON[notification.type] ?? 'notifications-outline';

  return (
    <TouchableOpacity
      style={[styles.row, !notification.is_read && styles.rowUnread]}
      onPress={() => onPress(notification)}
      activeOpacity={0.7}
    >
      <View style={styles.iconWrapper}>
        <Ionicons
          name={iconName as any}
          size={20}
          color={Colors.primary}
        />
      </View>
      <View style={styles.textBlock}>
        <Typography
          style={[styles.rowTitle, notification.is_read && styles.rowTitleRead]}
          numberOfLines={2}
        >
          {notification.title}
        </Typography>
        <Typography style={styles.rowBody} numberOfLines={2}>
          {notification.body}
        </Typography>
      </View>
      <Typography style={styles.timestamp}>{relativeTime}</Typography>
    </TouchableOpacity>
  );
}