import React, { useState } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Icon } from '../../../../components';
import { Typography } from '../../../../components';
import { Button } from '../../../../components';
import { Input } from '../../../../components';
import { Select } from '../../../../components';
import { Colors } from '../../../../constants/colors';
import { filterStyles as styles } from '../../styles/FilterModal.styles';
import { INDUSTRY_OPTIONS, VISA_TYPE_OPTIONS } from '../../constants/browseData';
import type { JobFilters } from '../../types/browse.types';

interface FilterModalProps {
  visible: boolean;
  filters: JobFilters;
  onChangeFilters: (filters: JobFilters) => void;
  onReset: () => void;
  onApply: () => void;
  onClose: () => void;
}

export function FilterModal({
  visible,
  filters,
  onChangeFilters,
  onReset,
  onApply,
  onClose,
}: FilterModalProps) {
  const [locationFocused, setLocationFocused] = useState(false);

  function setVisa(visa: string) {
    onChangeFilters({ ...filters, visaType: visa });
  }

  const industryOptions = INDUSTRY_OPTIONS.map(industry => ({
    label: industry,
    value: industry,
  }));

  const visaOptions = VISA_TYPE_OPTIONS.map(visa => ({
    label: visa,
    value: visa,
  }));

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={onClose} />
        <View style={styles.sheet}>
          <View style={styles.handle} />

          <View style={styles.header}>
            <Typography variant="heading2">Filters</Typography>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={24} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <Input
              placeholder="Location"
              value={filters.location}
              onChangeText={(text) => onChangeFilters({ ...filters, location: text })}
              onFocus={() => setLocationFocused(true)}
              onBlur={() => setLocationFocused(false)}
            />

            <Select
              label="Industry"
              value={filters.industry}
              onValueChange={(value) => onChangeFilters({ ...filters, industry: value })}
              options={industryOptions}
            />

            <Select
              label="Visa Type"
              value={filters.visaType}
              onValueChange={setVisa}
              options={visaOptions}
            />
          </ScrollView>

          <View style={styles.footer}>
            <Button
              title="Reset"
              variant="ghost"
              onPress={onReset}
              style={{ flex: 1, marginRight: 8 }}
            />
            <Button
              title="Apply"
              onPress={onApply}
              style={{ flex: 1, marginLeft: 8 }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}