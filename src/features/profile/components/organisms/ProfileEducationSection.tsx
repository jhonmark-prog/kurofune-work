import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Typography } from '@/components';
import { Colors } from '@/constants/colors';
import { profileScreenStyles as styles } from '../../styles/ProfileScreen.styles';
import type { Education } from '../../types/profile.types';

interface ProfileEducationSectionProps {
  educations: Education[];
  onEdit: () => void;
}

export function ProfileEducationSection({ educations, onEdit }: ProfileEducationSectionProps) {
  return (
    <Card>
      <View style={styles.sectionHeader}>
        <Typography style={styles.sectionTitle}>Education</Typography>
        <TouchableOpacity
          style={styles.sectionEditBtn}
          onPress={onEdit}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="create-outline" size={18} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.sectionDivider} />

      {educations.length === 0 ? (
        <Typography style={styles.emptyText}>Nothing's here.</Typography>
      ) : (
        educations.map((edu, idx) => (
          <View key={edu.id}>
            <View style={styles.expItem}>
              <View style={styles.expIconWrapper}>
                <Ionicons name="school-outline" size={18} color={Colors.textSecondary} />
              </View>
              <View style={styles.expInfo}>
                <Typography style={styles.expTitle}>{edu.degree}</Typography>
                <Typography style={styles.expCompany}>{edu.institution}</Typography>
                {edu.graduation_year ? (
                  <Typography style={styles.expDates}>{edu.graduation_year}</Typography>
                ) : null}
              </View>
            </View>
            {idx < educations.length - 1 && <View style={styles.expSeparator} />}
          </View>
        ))
      )}
    </Card>
  );
}