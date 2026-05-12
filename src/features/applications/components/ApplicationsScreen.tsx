import { View, StyleSheet } from 'react-native';
import { HeaderBanner } from '@/components';
import { ScrollView } from '@/components';
import { ApplicationsView } from './organisms/ApplicationsView';
import { useApplications } from '../hooks/useApplications';
import type { Application } from '../types/applications.types';

export function ApplicationsScreen() {
  const { applications, loading, error, cancelApplication } = useApplications();

  return (
    <View style={styles.container}>
      <HeaderBanner title="My Applications" />
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ApplicationsView
          applications={applications}
          onCancelApplication={cancelApplication}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },
});
