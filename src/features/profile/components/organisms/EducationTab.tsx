import { useState } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '@/components';
import { Colors } from '@/constants/colors';
import { editModalStyles as styles } from '../../styles/ProfileEditModal.styles';
import { EMPTY_EDUCATION } from '../../constants/profileData';
import type { Education } from '../../types/profile.types';

interface EducationTabProps {
  educations: Education[];
  onSave: (educations: Education[]) => void;
}

type EditableEducation = Education & { isEditing?: boolean };

export function EducationTab({ educations, onSave }: EducationTabProps) {
  const [items, setItems] = useState<EditableEducation[]>(
    educations.map((e) => ({ ...e, isEditing: false }))
  );
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const addNew = () => {
    const newId = `new-${Date.now()}`;
    setItems((prev) => [
      ...prev,
      { ...EMPTY_EDUCATION, id: newId, isEditing: true },
    ]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((e) => e.id !== id));
  };

  const toggleEdit = (id: string) => {
    setItems((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isEditing: !e.isEditing } : e))
    );
  };

  const updateItem = (id: string, key: keyof EditableEducation, value: any) => {
    setItems((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [key]: value } : e))
    );
  };

  const handleSave = () => {
    const result: Education[] = items.map((e) => ({
      id: e.id,
      degree: e.degree,
      institution: e.institution,
      graduation_year: e.graduation_year,
      is_current: e.is_current,
    }));
    onSave(result);
  };

  const inputStyle = (fieldKey: string) => [
    styles.textInput,
    focusedField === fieldKey && styles.textInputFocused,
  ];

  return (
    <>
      <ScrollView
        style={styles.formScroll}
        contentContainerStyle={styles.formContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {items.map((edu) => (
          <View key={edu.id}>
            {!edu.isEditing && (
              <View style={styles.entryCard}>
                <View style={styles.entryCardHeader}>
                  <View style={styles.entryCardIcon}>
                    <Ionicons name="school-outline" size={18} color={Colors.textSecondary} />
                  </View>
                  <View style={styles.entryCardInfo}>
                    <Typography style={styles.entryCardTitle}>{edu.degree}</Typography>
                    <Typography style={styles.entryCardSub}>{edu.institution}</Typography>
                    {edu.graduation_year ? (
                      <Typography style={styles.entryCardDates}>
                        {edu.is_current ? 'Present' : edu.graduation_year}
                      </Typography>
                    ) : null}
                  </View>
                </View>
                <View style={styles.entryCardActions}>
                  <TouchableOpacity
                    style={styles.entryActionBtn}
                    onPress={() => removeItem(edu.id)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Ionicons name="trash-outline" size={14} color={Colors.textTertiary} />
                    <Typography style={[styles.entryActionText, { color: Colors.textTertiary }]}>
                      Remove
                    </Typography>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.entryActionBtn}
                    onPress={() => toggleEdit(edu.id)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Ionicons name="create-outline" size={14} color={Colors.primary} />
                    <Typography style={[styles.entryActionText, { color: Colors.primary }]}>
                      Edit
                    </Typography>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {edu.isEditing && (
              <View style={styles.newEntryBlock}>
                <View style={styles.newEntryBlockHeader}>
                  <Typography style={styles.newEntryBlockTitle}>Education</Typography>
                  <TouchableOpacity
                    style={styles.removeNewBtn}
                    onPress={() => removeItem(edu.id)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Ionicons name="trash-outline" size={14} color={Colors.textTertiary} />
                    <Typography style={styles.removeNewText}>Remove</Typography>
                  </TouchableOpacity>
                </View>

                <Typography style={styles.fieldLabel}>
                  Degree <Typography style={styles.required}>*</Typography>
                </Typography>
                <TextInput
                  style={inputStyle(`${edu.id}-degree`)}
                  value={edu.degree}
                  onChangeText={(v) => updateItem(edu.id, 'degree', v)}
                  placeholder="Degree"
                  placeholderTextColor={Colors.textTertiary}
                  onFocus={() => setFocusedField(`${edu.id}-degree`)}
                  onBlur={() => setFocusedField(null)}
                />

                <Typography style={styles.fieldLabel}>
                  School / Institution <Typography style={styles.required}>*</Typography>
                </Typography>
                <TextInput
                  style={inputStyle(`${edu.id}-institution`)}
                  value={edu.institution}
                  onChangeText={(v) => updateItem(edu.id, 'institution', v)}
                  placeholder="School / Institution"
                  placeholderTextColor={Colors.textTertiary}
                  onFocus={() => setFocusedField(`${edu.id}-institution`)}
                  onBlur={() => setFocusedField(null)}
                />

                {!edu.is_current && (
                  <>
                    <Typography style={styles.fieldLabel}>
                      Graduation Year <Typography style={styles.required}>*</Typography>
                    </Typography>
                    <TextInput
                      style={inputStyle(`${edu.id}-year`)}
                      value={edu.graduation_year ?? ''}
                      onChangeText={(v) => updateItem(edu.id, 'graduation_year', v)}
                      placeholder="MM/YYYY"
                      placeholderTextColor={Colors.textTertiary}
                      onFocus={() => setFocusedField(`${edu.id}-year`)}
                      onBlur={() => setFocusedField(null)}
                    />
                  </>
                )}

                <TouchableOpacity
                  style={styles.checkboxRow}
                  onPress={() => updateItem(edu.id, 'is_current', !edu.is_current)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.checkbox, edu.is_current && styles.checkboxChecked]}>
                    {edu.is_current && (
                      <Ionicons name="checkmark" size={12} color="#ffffff" />
                    )}
                  </View>
                  <Typography style={styles.checkboxLabel}>Currently studying here</Typography>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}

        <TouchableOpacity style={styles.addAnotherBtn} onPress={addNew} activeOpacity={0.8}>
          <Typography style={styles.addAnotherText}>+ Add Another Education</Typography>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.85}>
        <Typography style={styles.saveBtnText}>Save</Typography>
      </TouchableOpacity>
    </>
  );
}