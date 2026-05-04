import { View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Typography, Icon } from '@/components';
import { JobMeta } from '@/features/browse/components/molecules/JobMeta';
import { Colors } from '@/constants/colors';
import { jobCardStyles } from '@/features/browse/styles/JobCard.styles';
import { StatusBadge } from '../molecules/StatusBadge';
import { ImagePlaceholder } from '@/assets/svg/ImagePlaceholder';
import type { Application } from '../../types/activity.types';

interface ApplicationCardProps {
  application: Application;
  onPress: (jobId: string) => void;
}

export function ApplicationCard({ application, onPress }: ApplicationCardProps) {
  const { job, status } = application;

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
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <StatusBadge status={status} />
          <Icon
            name="bookmark"
            size={22}
            color={Colors.primary}
          />
        </View>
      </View>

      <Typography style={jobCardStyles.postedDate}>
        {job.company_name}
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