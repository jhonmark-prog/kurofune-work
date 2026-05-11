import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Typography } from '@/components';
import type { Application } from '../types/applications.types';

interface ApplicationsViewProps {
  applications: Application[];
  onCancelApplication?: (id: number) => void;
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'pending':
      return '#FFA500';
    case 'in_progress':
      return '#2196F3';
    case 'completed':
      return '#4CAF50';
    case 'rejected':
      return '#F44336';
    case 'cancelled':
      return '#9E9E9E';
    default:
      return '#666';
  }
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function ApplicationsView({ applications, onCancelApplication }: ApplicationsViewProps) {
  const renderApplication = ({ item }: { item: Application }) => (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Typography variant='heading3' style={styles.jobName} numberOfLines={2}>
          {item.job_name}
        </Typography>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Typography variant='caption' style={styles.statusText}>
            {item.status.replace('_', ' ')}
          </Typography>
        </View>
      </View>

      <Typography variant='normalTitle' style={styles.company}>
        {item.job_title}
      </Typography>

      <View style={styles.footer}>
        <Typography variant='body' style={styles.date}>
          Applied: {formatDate(item.applied_at)}
        </Typography>
        {onCancelApplication && (item.status === 'pending' || item.status === 'in_progress') ? (
          <Typography
            variant='buttonTitle'
            style={styles.cancelLink}
            onPress={() => onCancelApplication(item.id)}
          >
            Cancel
          </Typography>
        ) : null}
      </View>
    </Card>
  );

  if (applications.length === 0) {
    return (
      <Card style={styles.emptyCard}>
        <Typography variant='normalTitle' style={styles.emptyText}>
          No applications yet
        </Typography>
        <Typography variant='body' style={styles.emptySubtext}>
          Start applying to jobs to see them here
        </Typography>
      </Card>
    );
  }

  return (
    <FlatList
      data={applications}
      renderItem={renderApplication}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 12,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  jobName: {
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
  },
  company: {
    color: '#666',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  date: {
    color: '#999',
    fontSize: 12,
  },
  cancelLink: {
    color: '#F44336',
    fontSize: 14,
  },
  emptyCard: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
  },
  emptyText: {
    marginBottom: 8,
  },
  emptySubtext: {
    color: '#999',
    textAlign: 'center',
  },
});
