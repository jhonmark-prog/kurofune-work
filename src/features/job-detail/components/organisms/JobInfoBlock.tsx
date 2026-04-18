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
        <Typography variant="heading3" style={styles.title} numberOfLines={3}>
          {job.title}
        </Typography>
        <Typography variant="body" style={styles.companyName}>
          {job.company_name}
        </Typography>

        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={13} color="#000000" />
          <Typography variant="caption" style={styles.locationText}>
            {job.location}
          </Typography>
        </View>

        <View style={styles.pillsRow}>
          {job.japanese_level && (
            <View style={styles.pill}>
              <Ionicons name="language-outline" size={12} color="#727272" style={styles.pillIcon} />
              <View>
                <Typography variant="label" style={styles.pillLabel}>Japanese Level</Typography>
                <Typography variant="caption" style={styles.pillValue}>{job.japanese_level}</Typography>
              </View>
            </View>
          )}
          {job.industry && (
            <View style={styles.pill}>
              <Ionicons name="business-outline" size={12} color="#727272" style={styles.pillIcon} />
              <View>
                <Typography variant="label" style={styles.pillLabel}>Industry</Typography>
                <Typography variant="caption" style={styles.pillValue}>{job.industry}</Typography>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}