import { View, TouchableOpacity, Image } from 'react-native';
import { Icon } from '../../../../components';
import { Typography } from '../../../../components';
import { JobMeta } from '../molecules/JobMeta';
import { Colors } from '../../../../constants/colors';
import { jobCardStyles as styles } from '../../styles/JobCard.styles';
import type { Job } from '../../types/browse.types';

interface JobCardProps {
  job: Job;
  onPress: (job: Job) => void;
  onBookmark: (jobId: string) => void;
}

export function JobCard({ job, onPress, onBookmark }: JobCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(job)}
      activeOpacity={0.85}
    >
      {/* Row 1: Title + Bookmark */}
      <View style={styles.titleRow}>
        <Typography
          variant="heading3"
          style={styles.title}
          numberOfLines={2}
        >
          {job.title}
        </Typography>
        <TouchableOpacity
          style={styles.bookmarkBtn}
          onPress={() => onBookmark(job.id)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Icon
            name={job.is_saved ? 'bookmark' : 'bookmark-outline'}
            size={22}
            color={job.is_saved ? Colors.primary : Colors.primary}
          />
        </TouchableOpacity>
      </View>

      {/* Row 2: Posted date */}
      <Typography style={styles.postedDate}>
        Posted {job.posted_at}
      </Typography>

      {/* Row 3: Meta rows (left) + Thumbnail (right) */}
      <View style={styles.bottomRow}>
        <View style={styles.metaBlock}>
          <JobMeta icon="business-outline" text={job.company_name} />
          <JobMeta icon="location-outline" text={job.location} />
          <JobMeta icon="cash-outline" text={`JPY ${job.salary_min.toLocaleString()}~`} />
        </View>

        <View style={styles.thumbnail}>
          {job.thumbnail_url ? (
            <Image source={{ uri: job.thumbnail_url }} style={styles.thumbnailImg} />
          ) : (
            <Icon name="image-outline" size={30} color={Colors.textTertiary} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}