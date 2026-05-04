import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { selectUnreadCount } from '@/store/notificationsSlice';

interface NotificationBellProps {
  color?: string;
  size?: number;
  wrapperStyle?: any;
}

export function NotificationBell({
  color = Colors.buttonStrokePrimary,
  size = 17,
  wrapperStyle,
}: NotificationBellProps) {
  const router = useRouter();
  const unreadCount = useSelector((state: any) => selectUnreadCount(state));

  return (
    <TouchableOpacity
      style={[bellStyles.btn, wrapperStyle]}
      onPress={() => router.push('/notifications')}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <Ionicons name="notifications-outline" size={size} color={color} />
      {unreadCount > 0 && <View style={bellStyles.dot} />}
    </TouchableOpacity>
  );
}

const bellStyles = StyleSheet.create({
  btn: {
    width: 28,
    height: 28,
    borderRadius: 18,
    backgroundColor: Colors.backgroundPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  dot: {
    position: 'absolute',
    top: 3,
    right: 3,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.danger,
    borderWidth: 1.5,
    borderColor: '#ffffff',
  },
});