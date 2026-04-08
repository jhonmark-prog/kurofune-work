import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Card } from '../../../../components';
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
      <View style={styles.topRow}>
        <View style={styles.infoBlock}>
          <Typography
            variant="caption"
            color={Colors.textTertiary}
            style={styles.postedDate}
          >
            Posted {job.posted_at}
          </Typography>

          <Typography
            variant="heading3"
            style={styles.title}
            numberOfLines={2}
          >
            {job.title}
          </Typography>

          <JobMeta
            icon="business-outline"
            text={job.company_name}
          />

          <JobMeta
            icon="location-outline"
            text={job.location}
          />

          <View style={styles.salaryRow}>
            <Typography variant="body" style={styles.salary}>
              ¥ {job.salary_min.toLocaleString()}–
            </Typography>
          </View>
        </View>

        <View>
          <View style={styles.thumbnail}>
            {job.thumbnail_url ? (
              <Image source={{ uri: job.thumbnail_url }} style={styles.thumbnailImg} />
            ) : (
              <Icon name="image-outline" size={28} color={Colors.textTertiary} />
            )}
          </View>
          <TouchableOpacity
            style={styles.bookmarkBtn}
            onPress={() => onBookmark(job.id)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Icon
              name={job.is_saved ? 'bookmark' : 'bookmark-outline'}
              size={20}
              color={job.is_saved ? Colors.primary : Colors.textTertiary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}