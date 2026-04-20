import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Typography } from '@/components';
import { Colors } from '@/constants/colors';
import { profileScreenStyles as styles } from '../../styles/ProfileScreen.styles';

interface ProfileCVSectionProps {
  cvFilename: string | null;
  cvUploadedAt: string | null;
  onEdit: () => void;
}

export function ProfileCVSection({ cvFilename, cvUploadedAt, onEdit }: ProfileCVSectionProps) {
  return (
    <Card>
      <View style={styles.sectionHeader}>
        <Typography style={styles.sectionTitle}>CV/Resume</Typography>
        <TouchableOpacity
          style={styles.sectionEditBtn}
          onPress={onEdit}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="create-outline" size={18} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.sectionDivider} />

      {cvFilename ? (
        <View style={styles.cvRow}>
          <View style={styles.cvIconWrapper}>
            <Ionicons name="attach-outline" size={20} color={Colors.textSecondary} />
          </View>
          <View style={styles.cvInfo}>
            <Typography style={styles.cvFilename} numberOfLines={1}>
              {cvFilename}
            </Typography>
            {cvUploadedAt ? (
              <Typography style={styles.cvUploadedAt}>
                Uploaded at {cvUploadedAt}
              </Typography>
            ) : null}
          </View>
        </View>
      ) : (
        <Typography style={styles.emptyText}>No file uploaded.</Typography>
      )}
    </Card>
  );
}