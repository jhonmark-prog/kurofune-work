import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Typography } from '../atoms/Typography';
import { Colors } from '@/constants/colors';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  style?: any;
}

const styles = {
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    backgroundColor: Colors.backgroundPrimary,
  },
};

export function Select({
  label,
  value,
  onValueChange,
  options,
  placeholder = 'Select an option',
  style
}: SelectProps) {
  return (
    <View style={[styles.container, style]}>
      {label && (
        <Typography variant="label" style={styles.label}>
          {label}
        </Typography>
      )}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={value}
          onValueChange={onValueChange}
          style={{ color: Colors.textPrimary }}
        >
          {placeholder && (
            <Picker.Item label={placeholder} value="" />
          )}
          {options.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}