import { View, TouchableOpacity, Image } from 'react-native';
import { Typography, Icon } from '@/components';
import { JobMeta } from '@/features/browse/components/molecules/JobMeta';
import { Colors } from '@/constants/colors';
import { jobCardStyles } from '@/features/browse/styles/JobCard.styles';
import { ImagePlaceholder } from '@/assets/svg/ImagePlaceholder';
import type { Job } from '@/features/browse/types/browse.types';

interface SavedJobCardProps {
  job: Job;
  onPress: (jobId: string) => void;
  onBookmark: (jobId: string) => void;
}

export function SavedJobCard({ job, onPress, onBookmark }: SavedJobCardProps) {
  return (
    <TouchableOpacity
      style={jobCardStyles.card}
      onPress={() => onPress(job.id)}
      activeOpacity={0.85}
    >
      <View style={jobCardStyles.titleRow}>
        <Typography
          variant="heading3"
          style={jobCardStyles.title}
          numberOfLines={2}
        >
          {job.title}
        </Typography>
        <TouchableOpacity
          style={jobCardStyles.bookmarkBtn}
          onPress={() => onBookmark(job.id)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Icon name="bookmark" size={22} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <Typography style={jobCardStyles.postedDate}>
        Posted {job.posted_at}
      </Typography>

      <View style={jobCardStyles.bottomRow}>
        <View style={jobCardStyles.metaBlock}>
          <JobMeta icon="business-outline" text={job.company_name} />
          <JobMeta icon="location-outline" text={job.location} />
          <JobMeta icon="cash-outline" text={`JPY ${job.salary_min.toLocaleString()}~`} />
        </View>

        <View style={jobCardStyles.thumbnail}>
          {job.thumbnail_url ? (
            <Image source={{ uri: job.thumbnail_url }} style={jobCardStyles.thumbnailImg} />
          ) : (
            <ImagePlaceholder />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}