import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Typography } from '@/components';
import { Colors } from '@/constants/colors';
import { profileScreenStyles as styles } from '../../styles/ProfileScreen.styles';
import type { Profile } from '../../types/profile.types';

interface ProfileContactSectionProps {
  profile: Profile;
  onEdit: () => void;
}

export function ProfileContactSection({ profile, onEdit }: ProfileContactSectionProps) {
  return (
    <Card>
      <View style={styles.sectionHeader}>
        <Typography style={styles.sectionTitle}>Contact Info</Typography>
        <TouchableOpacity
          style={styles.sectionEditBtn}
          onPress={onEdit}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="create-outline" size={18} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.sectionDivider} />

      <View style={styles.contactRow}>
        <Ionicons
          name="mail-outline"
          size={16}
          color={profile.email ? Colors.textSecondary : Colors.textTertiary}
        />
        <Typography style={profile.email ? styles.contactText : styles.contactTextMuted}>
          {profile.email || 'Not set'}
        </Typography>
      </View>

      <View style={styles.contactRow}>
        <Ionicons
          name="call-outline"
          size={16}
          color={profile.phone ? Colors.textSecondary : Colors.textTertiary}
        />
        <Typography style={profile.phone ? styles.contactText : styles.contactTextMuted}>
          {profile.phone || 'Not set'}
        </Typography>
      </View>

      <View style={[styles.contactRow, { marginBottom: 0 }]}>
        <Ionicons
          name="location-outline"
          size={16}
          color={profile.location ? Colors.textSecondary : Colors.textTertiary}
        />
        <Typography style={profile.location ? styles.contactText : styles.contactTextMuted}>
          {profile.location || 'Not set'}
        </Typography>
      </View>
    </Card>
  );
}