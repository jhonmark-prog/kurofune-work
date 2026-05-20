import { View, Image, TouchableOpacity } from 'react-native';
import { Card, Icon, Typography } from '@/components';
import { JobMeta } from '../molecules/JobMeta';
import { Colors } from '@/constants/colors';
import type { Job } from '../../types/browse.types';
import { ImagePlaceholder } from '@/assets/svg/ImagePlaceholder';
import { jobCardStyles as styles } from '../../styles/JobCard.styles';
import { formatPostedDate } from '@/utils/formatPostedDate';

interface JobCardProps {
  job: Job;
  onPress: (job: Job) => void;
  onBookmark: (jobId: string) => void;
}

export function JobCard({ job, onPress, onBookmark }: JobCardProps) {
  return (
    <Card onPress={() => onPress(job)}>
      <View style={styles.titleRow}>
        <Typography
          variant="heading3"
          style={styles.title}
          numberOfLines={1}
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

       <Typography style={styles.postedDate}>
         {formatPostedDate(job.posted_at)}
       </Typography>

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
            <ImagePlaceholder />
          )}
        </View>
      </View>
    </Card>
  );
}