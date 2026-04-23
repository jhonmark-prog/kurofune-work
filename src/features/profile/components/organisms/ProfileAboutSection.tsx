import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Typography } from '@/components';
import { Colors } from '@/constants/colors';
import { profileScreenStyles as styles } from '../../styles/ProfileScreen.styles';

interface ProfileAboutSectionProps {
  aboutMe: string | null;
  onEdit: () => void;
}

export function ProfileAboutSection({ aboutMe, onEdit }: ProfileAboutSectionProps) {
  return (
    <Card>
      <View style={styles.sectionHeader}>
        <Typography style={styles.sectionTitle}>About Me</Typography>
      </View>
      <View style={styles.sectionDivider} />
      {aboutMe ? (
        <Typography style={styles.aboutText}>{aboutMe}</Typography>
      ) : (
        <Typography style={styles.emptyText}>No bio added.</Typography>
      )}
    </Card>
  );
}