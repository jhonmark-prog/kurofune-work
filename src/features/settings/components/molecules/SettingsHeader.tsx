import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '@/components';
import { Colors } from '@/constants/colors';
import { settingsStyles as styles } from '../../styles/SettingsScreen.styles';

interface SettingsHeaderProps {
  title: string;
  onBack: () => void;
  rightContent?: React.ReactNode;
}

export function SettingsHeader({ title, onBack, rightContent }: SettingsHeaderProps) {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={onBack}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons name="arrow-back" size={18} color={Colors.textPrimary} />
      </TouchableOpacity>

      <Typography style={styles.headerTitle}>{title}</Typography>

      {rightContent ? (
        <View style={styles.headerRight}>{rightContent}</View>
      ) : null}
    </View>
  );
}