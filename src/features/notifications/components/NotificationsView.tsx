import { View, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Typography, Icon } from '@/components';
import { Colors } from '@/constants/colors';
import { notificationsStyles as styles } from '../styles/NotificationsScreen.styles';
import { NotificationRow } from './molecules/NotificationRow';
import { formatRelativeTime } from '../lib/notificationsApi';
import type { AppNotification } from '../types/notifications.types';

interface NotificationsViewProps {
  notifications: AppNotification[];
  onBack: () => void;
  onNotificationPress: (notification: AppNotification) => void;
}

export function NotificationsView({
  notifications,
  onBack,
  onNotificationPress,
}: NotificationsViewProps) {
  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={onBack}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="arrow-back" size={18} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Typography style={styles.headerTitle}>Notifications</Typography>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <NotificationRow
            notification={item}
            relativeTime={formatRelativeTime(item.created_at)}
            onPress={onNotificationPress}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Icon name="notifications-outline" size={48} color={Colors.textTertiary} />
            <Typography style={styles.emptyText}>
              No notifications yet.
            </Typography>
          </View>
        }
      />
    </SafeAreaView>
  );
}