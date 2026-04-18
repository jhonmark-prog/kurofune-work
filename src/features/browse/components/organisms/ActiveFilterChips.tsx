import { View } from 'react-native';
import { FilterChip } from '../molecules/FilterChip';
import { homeStyles as styles } from '../../styles/HomeScreen.styles';
import type { JobFilters } from '../../types/browse.types';

interface ActiveFilterChipsProps {
  filters: JobFilters;
  onRemove: (key: keyof JobFilters) => void;
}

export function ActiveFilterChips({ filters, onRemove }: ActiveFilterChipsProps) {
  const chips: { key: keyof JobFilters; label: string }[] = [];

  if (filters.location) chips.push({ key: 'location', label: filters.location });
  if (filters.industry !== 'All') chips.push({ key: 'industry', label: filters.industry });
  if (filters.visaType !== 'All') chips.push({ key: 'visaType', label: filters.visaType });

  if (!chips.length) return null;

  return (
    <View style={styles.filtersChipRow}>
      {chips.map(({ key, label }) => (
        <FilterChip
          key={key}
          label={label}
          onRemove={() => onRemove(key)}
        />
      ))}
    </View>
  );
}