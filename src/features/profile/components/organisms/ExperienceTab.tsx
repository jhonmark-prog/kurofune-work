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
import { EMPTY_EXPERIENCE } from '../../constants/profileData';
import type { Experience } from '../../types/profile.types';

interface ExperienceTabProps {
  experiences: Experience[];
  onSave: (experiences: Experience[]) => void;
}

type EditableExperience = Omit<Experience, 'id'> & { id: string; isNew?: boolean; isEditing?: boolean };

export function ExperienceTab({ experiences, onSave }: ExperienceTabProps) {
  const [items, setItems] = useState<EditableExperience[]>(
    experiences.map((e) => ({ ...e, isEditing: false }))
  );
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const addNew = () => {
    const newId = `new-${Date.now()}`;
    setItems((prev) => [
      ...prev,
      { ...EMPTY_EXPERIENCE, id: newId, isNew: true, isEditing: true },
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

  const updateItem = (id: string, key: keyof EditableExperience, value: any) => {
    setItems((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [key]: value } : e))
    );
  };

  const handleSave = () => {
    const result: Experience[] = items.map((e) => ({
      id: e.id,
      job_title: e.job_title,
      company: e.company,
      start_date: e.start_date,
      end_date: e.end_date,
      is_current: e.is_current,
      description: e.description,
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
        {items.map((exp) => (
          <View key={exp.id}>
            {!exp.isEditing && (
              <View style={styles.entryCard}>
                <View style={styles.entryCardHeader}>
                  <View style={styles.entryCardIcon}>
                    <Ionicons name="briefcase-outline" size={18} color={Colors.textSecondary} />
                  </View>
                  <View style={styles.entryCardInfo}>
                    <Typography style={styles.entryCardTitle}>{exp.job_title}</Typography>
                    <Typography style={styles.entryCardSub}>{exp.company}</Typography>
                    <Typography style={styles.entryCardDates}>
                      {exp.start_date}
                      {exp.is_current ? ' - Present' : exp.end_date ? ` - ${exp.end_date}` : ''}
                    </Typography>
                  </View>
                </View>
                <View style={styles.entryCardActions}>
                  <TouchableOpacity
                    style={styles.entryActionBtn}
                    onPress={() => removeItem(exp.id)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Ionicons name="trash-outline" size={14} color={Colors.textTertiary} />
                    <Typography style={[styles.entryActionText, { color: Colors.textTertiary }]}>
                      Remove
                    </Typography>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.entryActionBtn}
                    onPress={() => toggleEdit(exp.id)}
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
            {exp.isEditing && (
              <View style={styles.newEntryBlock}>
                <View style={styles.newEntryBlockHeader}>
                  <Typography style={styles.newEntryBlockTitle}>Work Experience</Typography>
                  <TouchableOpacity
                    style={styles.removeNewBtn}
                    onPress={() => removeItem(exp.id)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Ionicons name="trash-outline" size={14} color={Colors.textTertiary} />
                    <Typography style={styles.removeNewText}>Remove</Typography>
                  </TouchableOpacity>
                </View>

                <Typography style={styles.fieldLabel}>
                  Job Title <Typography style={styles.required}>*</Typography>
                </Typography>
                <TextInput
                  style={inputStyle(`${exp.id}-title`)}
                  value={exp.job_title}
                  onChangeText={(v) => updateItem(exp.id, 'job_title', v)}
                  placeholder="Job Title"
                  placeholderTextColor={Colors.textTertiary}
                  onFocus={() => setFocusedField(`${exp.id}-title`)}
                  onBlur={() => setFocusedField(null)}
                />

                <Typography style={styles.fieldLabel}>
                  Company <Typography style={styles.required}>*</Typography>
                </Typography>
                <TextInput
                  style={inputStyle(`${exp.id}-company`)}
                  value={exp.company}
                  onChangeText={(v) => updateItem(exp.id, 'company', v)}
                  placeholder="Company"
                  placeholderTextColor={Colors.textTertiary}
                  onFocus={() => setFocusedField(`${exp.id}-company`)}
                  onBlur={() => setFocusedField(null)}
                />

                <Typography style={styles.fieldLabel}>
                  Start Date <Typography style={styles.required}>*</Typography>
                </Typography>
                <TextInput
                  style={inputStyle(`${exp.id}-start`)}
                  value={exp.start_date}
                  onChangeText={(v) => updateItem(exp.id, 'start_date', v)}
                  placeholder="MM/YYYY"
                  placeholderTextColor={Colors.textTertiary}
                  onFocus={() => setFocusedField(`${exp.id}-start`)}
                  onBlur={() => setFocusedField(null)}
                />

                {!exp.is_current && (
                  <>
                    <Typography style={styles.fieldLabel}>
                      End Date <Typography style={styles.required}>*</Typography>
                    </Typography>
                    <TextInput
                      style={inputStyle(`${exp.id}-end`)}
                      value={exp.end_date ?? ''}
                      onChangeText={(v) => updateItem(exp.id, 'end_date', v)}
                      placeholder="MM/YYYY"
                      placeholderTextColor={Colors.textTertiary}
                      onFocus={() => setFocusedField(`${exp.id}-end`)}
                      onBlur={() => setFocusedField(null)}
                    />
                  </>
                )}

                <TouchableOpacity
                  style={styles.checkboxRow}
                  onPress={() => updateItem(exp.id, 'is_current', !exp.is_current)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.checkbox, exp.is_current && styles.checkboxChecked]}>
                    {exp.is_current && (
                      <Ionicons name="checkmark" size={12} color="#ffffff" />
                    )}
                  </View>
                  <Typography style={styles.checkboxLabel}>Currently working here</Typography>
                </TouchableOpacity>

                <Typography style={styles.fieldLabel}>Description</Typography>
                <TextInput
                  style={[inputStyle(`${exp.id}-desc`), styles.textInputMultiline]}
                  value={exp.description ?? ''}
                  onChangeText={(v) => updateItem(exp.id, 'description', v)}
                  placeholder="Describe your responsibilities and achievements..."
                  placeholderTextColor={Colors.textTertiary}
                  multiline
                  numberOfLines={4}
                  onFocus={() => setFocusedField(`${exp.id}-desc`)}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            )}
          </View>
        ))}

        <TouchableOpacity style={styles.addAnotherBtn} onPress={addNew} activeOpacity={0.8}>
          <Typography style={styles.addAnotherText}>+ Add Another Experience</Typography>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.85}>
        <Typography style={styles.saveBtnText}>Save</Typography>
      </TouchableOpacity>
    </>
  );
}