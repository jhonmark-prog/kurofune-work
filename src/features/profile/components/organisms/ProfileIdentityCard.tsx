import { View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Typography } from '@/components';
import { Colors } from '@/constants/colors';
import { profileScreenStyles as styles } from '../../styles/ProfileScreen.styles';
import type { Profile } from '../../types/profile.types';

interface ProfileIdentityCardProps {
  profile: Profile;
  onEdit: () => void;
}

function getInitials(name: string): string {
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? '?';
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getNationalityFlag(nationality: string | null): string {
  if (!nationality) return '';
  const flags: Record<string, string> = {
    Philippines: '🇵🇭',
    Japan: '🇯🇵',
    Vietnam: '🇻🇳',
    Indonesia: '🇮🇩',
    Myanmar: '🇲🇲',
    Cambodia: '🇰🇭',
    Thailand: '🇹🇭',
  };
  return flags[nationality] ?? '🌏';
}

export function ProfileIdentityCard({ profile, onEdit }: ProfileIdentityCardProps) {
  return (
    <Card style={styles.identityCard}>
      <View style={styles.avatarWrapper}>
        {profile.avatar_url ? (
          <Image source={{ uri: profile.avatar_url }} style={styles.avatarImage} />
        ) : (
          <Typography style={styles.avatarInitials}>
            {getInitials(profile.full_name)}
          </Typography>
        )}
      </View>

      <View style={styles.identityInfo}>
        <Typography variant='heading3' numberOfLines={1} style={styles.identityName}>
          {profile.full_name}
        </Typography>
        {profile.job_title ? (
          <Typography style={styles.identityJobTitle} numberOfLines={1}>
            {profile.job_title}
          </Typography>
        ) : null}
        {profile.nationality ? (
          <View style={styles.nationalityRow}>
            <Typography style={styles.nationalityFlag}>
              {getNationalityFlag(profile.nationality)}
            </Typography>
            <Typography style={styles.nationalityText}>{profile.nationality}</Typography>
          </View>
        ) : null}
      </View>

      <TouchableOpacity
        style={styles.identityEditBtn}
        onPress={onEdit}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons name="create-outline" size={20} color={Colors.primary} />
      </TouchableOpacity>
    </Card>
  );
} 