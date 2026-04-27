import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Typography } from '@/components';
import { Colors } from '@/constants/colors';
import { profileScreenStyles as styles } from '../../styles/ProfileScreen.styles';
import type { Experience } from '../../types/profile.types';

interface ProfileExperienceSectionProps {
  experiences: Experience[];
  onEdit: () => void;
}

function formatDateRange(start: string, end: string | null, isCurrent: boolean): string {
  const endLabel = isCurrent ? 'Present' : end ?? '';
  return `${start} - ${endLabel}`;
}

function calcDuration(start: string, end: string | null, isCurrent: boolean): string {


  return '';
}

export function ProfileExperienceSection({ experiences, onEdit }: ProfileExperienceSectionProps) {
  return (
    <Card>
      <View style={styles.sectionHeader}>
        <Typography style={styles.sectionTitle}>Experience</Typography>
        <TouchableOpacity
          style={styles.sectionEditBtn}
          onPress={onEdit}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="create-outline" size={18} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.sectionDivider} />

      {experiences.length === 0 ? (
        <Typography style={styles.emptyText}>Nothing's here.</Typography>
      ) : (
        experiences.map((exp, idx) => (
          <View key={exp.id}>
            <View style={styles.expItem}>
              <View style={styles.expIconWrapper}>
                <Ionicons name="briefcase-outline" size={18} color={Colors.textSecondary} />
              </View>
              <View style={styles.expInfo}>
                <Typography style={styles.expTitle}>{exp.job_title}</Typography>
                <Typography style={styles.expCompany}>{exp.company}</Typography>
                <Typography style={styles.expDates}>
                  {formatDateRange(exp.start_date, exp.end_date, exp.is_current)}
                </Typography>
              </View>
            </View>
            {idx < experiences.length - 1 && <View style={styles.expSeparator} />}
          </View>
        ))
      )}
    </Card>
  );
}