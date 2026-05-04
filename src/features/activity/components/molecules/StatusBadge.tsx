import { View } from 'react-native';
import { Typography } from '@/components';
import { getStatusColor } from '@/utils/statusColor';
import { activityStyles as styles } from '../../styles/ActivityScreen.styles';
import type { ApplicationStatus } from '../../types/activity.types';

interface StatusBadgeProps {
  status: ApplicationStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { text, bg } = getStatusColor(status);
  return (
    <View style={[styles.statusBadge, { backgroundColor: bg, borderColor: text }]}>
      <Typography style={[styles.statusBadgeText, { color: text }]}>
        {status}
      </Typography>
    </View>
  );
}