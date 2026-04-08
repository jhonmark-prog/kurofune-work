import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Typography } from '../../../../components';
import { ProgressRing } from '../../../../components';
import { Colors } from '../../../../constants/colors';
import { homeStyles as styles } from '../../styles/HomeScreen.styles';

interface ProfileCompletionBannerProps {
  percentage: number;
  onPress: () => void;
}

export function ProfileCompletionBanner({ percentage, onPress }: ProfileCompletionBannerProps) {
  return (
    <TouchableOpacity
      style={styles.completionBanner}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.completionTextWrap}>
        <Typography
          variant="body"
          style={styles.completionLabel}
        >
          Let's start setting up your profile
        </Typography>
        <Typography
          variant="caption"
          color={Colors.textSecondary}
          style={styles.completionSub}
        >
          Completing your profile helps employers review your application faster.
        </Typography>
      </View>
      <ProgressRing
        percentage={percentage}
        style={styles.progressRing}
      />
    </TouchableOpacity>
  );
}