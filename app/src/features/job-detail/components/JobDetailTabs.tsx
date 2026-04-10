import { useRef } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { tabStyles as styles } from '../styles/JobDetailTabs.styles';
import type { JobDetailTab } from '../types/job-detail.types';

interface JobDetailTabsProps {
  tabs: JobDetailTab[];
  activeTab: JobDetailTab;
  onTabPress: (tab: JobDetailTab) => void;
}

export function JobDetailTabs({ tabs, activeTab, onTabPress }: JobDetailTabsProps) {
  const scrollRef = useRef<ScrollView>(null);

  function handleTabPress(tab: JobDetailTab, index: number) {
    onTabPress(tab);
    // Scroll to keep the active tab visible
    scrollRef.current?.scrollTo({ x: index * 110, animated: true });
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        {tabs.map((tab, index) => {
          const active = tab === activeTab;
          return (
            <TouchableOpacity
              key={tab}
              style={styles.tab}
              onPress={() => handleTabPress(tab, index)}
              activeOpacity={0.75}
            >
              <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
                {tab}
              </Text>
              {active && <View style={styles.activeUnderline} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View style={styles.border} />
    </View>
  );
}