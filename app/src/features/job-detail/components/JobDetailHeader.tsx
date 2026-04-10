import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Defs, LinearGradient as SvgLinearGradient, Rect, Stop } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { headerStyles as styles } from '../styles/JobDetailHeader.styles';
import type { JobDetail } from '../types/job-detail.types';

interface JobDetailHeaderProps {
  job: JobDetail;
  onBack: () => void;
  onBookmark: () => void;
}

export function JobDetailHeader({ job, onBack, onBookmark }: JobDetailHeaderProps) {
  return (
    <View style={styles.root}>
      {/* Hero image or gradient background */}
      {job.hero_image_url ? (
        <Image
          source={{ uri: job.hero_image_url }}
          style={styles.heroImage}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.heroGradient}>
          <Svg style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} width="100%" height="100%">
            <Defs>
              <SvgLinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <Stop offset="0%" stopColor="#00AC9F" stopOpacity="1" />
                <Stop offset="100%" stopColor="#006BA6" stopOpacity="1" />
              </SvgLinearGradient>
            </Defs>
            <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
          </Svg>
        </View>
      )}

      {/* Dark overlay when hero image is present */}
      {job.hero_image_url && <View style={styles.overlay} />}

      {/* Nav buttons — on top of bg */}
      <SafeAreaView edges={['top']} style={styles.navBar}>
        <TouchableOpacity style={styles.iconBtn} onPress={onBack} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="arrow-back" size={18} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn} onPress={onBookmark} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons
            name={job.is_saved ? 'bookmark' : 'bookmark-outline'}
            size={18}
            color="#fff"
          />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Info block */}
      <View style={styles.infoBlock}>
        <Text style={styles.title} numberOfLines={3}>{job.title}</Text>
        <Text style={styles.companyName}>{job.company_name}</Text>

        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={13} color="rgba(255,255,255,0.85)" />
          <Text style={styles.locationText}>{job.location}</Text>
        </View>

        <View style={styles.pillsRow}>
          {job.japanese_level && (
            <View style={styles.pill}>
              <Ionicons name="language-outline" size={12} color="rgba(255,255,255,0.9)" style={styles.pillIcon} />
              <View>
                <Text style={styles.pillLabel}>Japanese Level</Text>
                <Text style={styles.pillValue}>{job.japanese_level}</Text>
              </View>
            </View>
          )}
          {job.industry && (
            <View style={styles.pill}>
              <Ionicons name="business-outline" size={12} color="rgba(255,255,255,0.9)" style={styles.pillIcon} />
              <View>
                <Text style={styles.pillLabel}>Industry</Text>
                <Text style={styles.pillValue}>{job.industry}</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}