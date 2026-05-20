import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '@/components';
import { infoBlockStyles as styles } from '../../styles/JobInfoBlock.styles';
import type { JobDetail } from '../../types/job-detail.types';

interface JobInfoBlockProps {
  job: JobDetail;
}

export function JobInfoBlock({ job }: JobInfoBlockProps) {
  return (
    <View style={styles.container}>
      <View style={styles.infoContents}>
        {/* Title */}
        <Typography variant="heading3" style={styles.title} numberOfLines={3}>
          {job.title}
        </Typography>

        {/* Company name */}
        <Typography variant="body" style={styles.companyName}>
          {job.company_name}
        </Typography>

        {/* Location row */}
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={14} color="#666666" />
          <Typography variant="caption" style={styles.locationText}>
            {job.location || '—'}
          </Typography>
        </View>

        {/* Pills row — Japanese Level + Industry */}
        <View style={styles.pillsRow}>
          <View style={styles.pill}>
            <Ionicons
              name="language-outline"
              size={14}
              color="#666666"
              style={styles.pillIcon}
            />
            <View>
              <Typography style={styles.pillLabel}>Japanese Level</Typography>
              <Typography style={styles.pillValue}>
                {job.japanese_level || '—'}
              </Typography>
            </View>
          </View>

          <View style={styles.pill}>
            <Ionicons
              name="business-outline"
              size={14}
              color="#666666"
              style={styles.pillIcon}
            />
            <View>
              <Typography style={styles.pillLabel}>Industry</Typography>
              <Typography style={styles.pillValue} numberOfLines={2}>
                {job.industry || '—'}
              </Typography>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}