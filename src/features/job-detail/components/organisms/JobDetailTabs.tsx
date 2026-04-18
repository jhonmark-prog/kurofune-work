import { View, TouchableOpacity } from 'react-native';
import { ScrollView, Typography } from '@/components';
import { tabStyles as styles } from '../../styles/JobDetailTabs.styles';
import type { JobDetailTab } from '../../types/job-detail.types';

interface JobDetailTabsProps {
  tabs: JobDetailTab[];
  activeTab: JobDetailTab;
  onTabPress: (tab: JobDetailTab) => void;
}

export function JobDetailTabs({ tabs, activeTab, onTabPress }: JobDetailTabsProps) {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        {tabs.map((tab) => {
          const active = tab === activeTab;
          return (
            <TouchableOpacity
              key={tab}
              style={styles.tab}
              onPress={() => onTabPress(tab)}
              activeOpacity={0.75}
            >
              <Typography variant={active ? 'label' : 'caption'} color={active ? '#00AC9F' : '#333'}>
                {tab}
              </Typography>
              {active && <View style={styles.activeUnderline} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View style={styles.border} />
    </View>
  );
}