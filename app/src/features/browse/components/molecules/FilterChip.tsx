import { View, TouchableOpacity } from 'react-native';
import { Icon } from '../../../../components';
import { Typography } from '../../../../components';
import { Colors } from '../../../../constants/colors';

interface FilterChipProps {
  label: string;
  onRemove?: () => void;
  style?: any;
}

const styles = {
  chip: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: Colors.primaryLight,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  closeButton: {
    marginLeft: 8,
    padding: 2,
  },
};

export function FilterChip({ label, onRemove, style }: FilterChipProps) {
  return (
    <View style={[styles.chip, style]}>
      <Typography variant="label" color={Colors.primary}>
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