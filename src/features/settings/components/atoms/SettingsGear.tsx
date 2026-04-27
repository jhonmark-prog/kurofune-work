import { TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

interface SettingsGearProps {
  color?: string;
  size?: number;
  wrapperStyle?: any;
}

export function SettingsGear({
  color = Colors.buttonStrokePrimary,
  size = 17,
  wrapperStyle,
}: SettingsGearProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={[gearStyles.btn, wrapperStyle]}
      onPress={() => router.push('/(stack)/settings')}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <Ionicons name="settings-outline" size={size} color={color} />
    </TouchableOpacity>
  );
}

const gearStyles = StyleSheet.create({
  btn: {
    width: 28,
    height: 28,
    borderRadius: 18,
    backgroundColor: Colors.backgroundPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});