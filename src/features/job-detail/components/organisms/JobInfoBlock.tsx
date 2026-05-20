import { View, ScrollView } from 'react-native';
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
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
        <View style={styles.infoContents}>
          <Typography variant="heading3" style={styles.title} numberOfLines={3}>
            {job.title}
          </Typography>
          <Typography variant="body" style={styles.companyName}>
            {job.company_name}
          </Typography>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={14} color="#666666" />
            <Typography variant="caption" style={styles.infoText}>
              Posted: {job.posted_at}
            </Typography>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={14} color="#666666" />
            <Typography variant="caption" style={styles.infoText}>
              Location: {job.location}
            </Typography>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="business-outline" size={14} color="#666666" />
            <Typography variant="caption" style={styles.infoText}>
              Industry: {job.industry}
            </Typography>
          </View>

          {job.japanese_level && (
            <View style={styles.infoRow}>
              <Ionicons name="language-outline" size={14} color="#666666" />
              <Typography variant="caption" style={styles.infoText}>
                Japanese Level: {job.japanese_level}
              </Typography>
            </View>
          )}

          {job.visa_type && job.visa_type.length > 0 && (
            <View style={styles.infoRow}>
              <Ionicons name="exit-outline" size={14} color="#666666" />
              <Typography variant="caption" style={styles.infoText}>
                Visa Types: {job.visa_type.join(', ')}
              </Typography>
            </View>
          )}

          {job.salary_min !== undefined && (
            <View style={styles.infoRow}>
              <Ionicons name="cash-outline" size={14} color="#666666" />
              <Typography variant="caption" style={styles.infoText}>
                Minimum Salary: ¥{job.salary_min.toLocaleString()}
              </Typography>
            </View>
          )}

          {job.salary_max !== undefined && (
            <View style={styles.infoRow}>
              <Ionicons name="cash-outline" size={14} color="#666666" />
              <Typography variant="caption" style={styles.infoText}>
                Maximum Salary: ¥{job.salary_max.toLocaleString()}
              </Typography>
            </View>
          )}

          {job.working_hours && (
            <View style={styles.infoRow}>
              <Ionicons name="time-outline" size={14} color="#666666" />
              <Typography variant="caption" style={styles.infoText}>
                Working Hours: {job.working_hours}
              </Typography>
            </View>
          )}

          {job.holiday && (
            <View style={styles.infoRow}>
              <Ionicons name="calendar-outline" size={14} color="#666666" />
              <Typography variant="caption" style={styles.infoText}>
                Days Off: {job.holiday}
              </Typography>
            </View>
          )}

          {job.overtime && (
            <View style={styles.infoRow}>
              <Ionicons name="time-outline" size={14} color="#666666" />
              <Typography variant="caption" style={styles.infoText}>
                Overtime: {job.overtime}
              </Typography>
            </View>
          )}

          {job.company_website && (
            <View style={styles.infoRow}>
              <Ionicons name="globe-outline" size={14} color="#666666" />
              <Typography variant="caption" style={styles.infoText}>
                Company Website: {job.company_website}
              </Typography>
            </View>
          )}

          {job.selection_process && (
            <View style={styles.infoRow}>
              <Ionicons name="clipboard-outline" size={14} color="#666666" />
              <Typography variant="caption" style={styles.infoText}>
                Selection Process: {job.selection_process}
              </Typography>
            </View>
          )}

          {job.remarks && (
            <View style={styles.infoRow}>
              <Ionicons name="document-text-outline" size={14} color="#666666" />
              <Typography variant="caption" style={styles.infoText}>
                Remarks: {job.remarks}
              </Typography>
            </View>
          )}

          {job.others && (
            <View style={styles.infoRow}>
              <Ionicons name="ellipsis-horizontal-outline" size={14} color="#666666" />
              <Typography variant="caption" style={styles.infoText}>
                Others: {job.others}
              </Typography>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}