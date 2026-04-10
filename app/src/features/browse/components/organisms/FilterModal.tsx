import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { filterStyles as styles } from '../../styles/FilterModal.styles';
import { INDUSTRY_OPTIONS, VISA_TYPE_OPTIONS } from '../../constants/browseData';
import type { JobFilters } from '../../types/browse.types';

interface FilterScreenProps {
  filters: JobFilters;
  onChangeFilters: (filters: JobFilters) => void;
  onReset: () => void;
  onApply: () => void;
  onClose: () => void;
}

export function FilterModal({
  filters,
  onChangeFilters,
  onReset,
  onApply,
  onClose,
}: FilterScreenProps) {
  const [locationFocused, setLocationFocused] = useState(false);

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="arrow-back" size={20} color={styles.backIcon.color} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filter</Text>
        <View style={styles.backBtn} />
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.body}
          contentContainerStyle={styles.bodyContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Location */}
          <Text style={styles.sectionLabel}>Location</Text>
          <TextInput
            style={[styles.input, locationFocused && styles.inputFocused]}
            placeholder="Location"
            placeholderTextColor={styles.placeholder.color}
            value={filters.location}
            onChangeText={(text) => onChangeFilters({ ...filters, location: text })}
            onFocus={() => setLocationFocused(true)}
            onBlur={() => setLocationFocused(false)}
          />

          {/* Industry */}
          <Text style={styles.sectionLabel}>Industry</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={filters.industry}
              onValueChange={(value) => onChangeFilters({ ...filters, industry: value })}
              style={styles.picker}
              dropdownIconColor={styles.pickerIcon.color}
            >
              {INDUSTRY_OPTIONS.map((opt) => (
                <Picker.Item key={opt} label={opt} value={opt} />
              ))}
            </Picker>
          </View>

          {/* Visa Type */}
          <Text style={styles.sectionLabel}>Visa Type</Text>
          <View style={styles.chipsWrap}>
            {VISA_TYPE_OPTIONS.map((opt) => {
              const active = filters.visaType === opt;
              return (
                <TouchableOpacity
                  key={opt}
                  style={[styles.chip, active && styles.chipActive]}
                  onPress={() => onChangeFilters({ ...filters, visaType: opt })}
                  activeOpacity={0.75}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>
                    {opt}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* Footer buttons */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.resetBtn} onPress={onReset} activeOpacity={0.8}>
            <Text style={styles.resetBtnText}>Reset filters</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.goBtn} onPress={onApply} activeOpacity={0.8}>
            <Text style={styles.goBtnText}>Go</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}