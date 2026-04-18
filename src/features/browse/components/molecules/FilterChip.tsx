import { View, TouchableOpacity } from 'react-native';
import { Icon, Typography } from '@/components';
import { Colors } from '@/constants/colors';

interface FilterChipProps {
  label: string;
  onRemove?: () => void;
  style?: any;
}

export function FilterChip({ label, onRemove, style }: FilterChipProps) {
  return (
    <View style={[styles.chip, style]}>
      <Typography variant="caption" color={Colors.bannerText}>
        {label}
      </Typography>
      {onRemove && (
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onRemove}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
        >
          <Icon name="close" size={13} color={Colors.textSecondary} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = {
  chip: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E6E6E6",
  },
  closeButton: {
    marginLeft: 8,
    padding: 2,
  },
};