import { View } from 'react-native';
import { Icon, Typography } from '@/components';
import { Colors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';

interface JobMetaProps {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  style?: any;
}

export function JobMeta({ icon, text, style }: JobMetaProps) {
  return (
    <View style={[styles.metaRow, style]}>
      <Icon
        name={icon}
        size={13}
        color={Colors.textTertiary}
        style={styles.icon}
      />
      <Typography
        variant="caption"
        color={Colors.textTertiary}
        numberOfLines={1}
      >
        {text}
      </Typography>
    </View>
  );
}

const styles = {
  metaRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: 4,
  },
  icon: {
    marginRight: 6,
  },
};