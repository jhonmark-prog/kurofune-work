import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  StyleSheet,
  ViewStyle,
  ImageSourcePropType,
  Platform,
} from 'react-native';
import Svg, { Defs, LinearGradient as SvgLinearGradient, Rect, Stop } from 'react-native-svg';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { Typography } from './Typography';

export interface HeaderBannerGradient {
  colors: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

export interface HeaderBannerProps {
  title?: string;
  subtitle?: string;
  gradient?: HeaderBannerGradient;
  gradientColors?: string[];
  backgroundImage?: ImageSourcePropType;
  overlayOpacity?: number;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
  style?: ViewStyle;
  statusBarStyle?: 'light-content' | 'dark-content';
  statusBarColor?: string;
}

const DEFAULT_GRADIENT: HeaderBannerGradient = {
  colors: ['#00AC9F', '#006BA6'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
};

const DEFAULT_BANNER_HEIGHT = 146;

function getGradientStops(colors: string[]) {
  if (colors.length === 2) {
    return [
      { offset: '0%', color: colors[0] },
      { offset: '24%', color: colors[0] },
      { offset: '100%', color: colors[1] },
    ];
  }

  return colors.map((color, index) => ({
    offset: `${(index / (colors.length - 1)) * 100}%`,
    color,
  }));
}

export function HeaderBanner({
  title,
  subtitle,
  gradient,
  gradientColors,
  backgroundImage,
  overlayOpacity = 0.45,
  leftContent,
  rightContent,
  bottomContent,
  style,
  statusBarStyle = 'light-content',
  statusBarColor,
}: HeaderBannerProps) {
  const insets = useSafeAreaInsets();

  const resolvedGradient: HeaderBannerGradient = gradient
    ?? (gradientColors
      ? { colors: gradientColors, start: { x: 0, y: 0 }, end: { x: 1, y: 0 } }
      : DEFAULT_GRADIENT);

  const paddingTop = 12;
  const bannerMinHeight = DEFAULT_BANNER_HEIGHT;

  const renderBackground = backgroundImage ? (
    <ImageBackground
      source={backgroundImage}
      style={styles.imageBackground}
      resizeMode="cover"
    >
      <View
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: `rgba(0,0,0,${overlayOpacity})` },
        ]}
      />
    </ImageBackground>
  ) : (
    <View style={styles.gradient}>
      <Svg style={StyleSheet.absoluteFillObject} width="100%" height="100%">
        <Defs>
          <SvgLinearGradient id="headerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            {getGradientStops(resolvedGradient.colors).map((stop) => (
              <Stop key={stop.offset} offset={stop.offset} stopColor={stop.color} stopOpacity="1" />
            ))}
          </SvgLinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#headerGradient)" />
      </Svg>
    </View>
  );

  const innerContent = (
    <View style={[styles.inner, { paddingTop }]}>
      <View style={styles.titleRow}>
        {leftContent ? (
          <View style={styles.leftSlot}>{leftContent}</View>
        ) : null}
        <View style={styles.titleBlock}>
          {title ? (
            <Typography variant='heading3' style={styles.title} numberOfLines={2}>
              {title}
            </Typography>
          ) : null}
          {subtitle ? (
            <Typography variant='caption' style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Typography>
          ) : null}
        </View>

        {rightContent ? (
          <View style={styles.rightSlot}>{rightContent}</View>
        ) : null}
      </View>

      {bottomContent ? (
        <View style={styles.bottomSlot}>{bottomContent}</View>
      ) : null}
    </View>
  );

  const androidStatusColor =
    statusBarColor ?? resolvedGradient.colors[0] ?? Colors.primary;

  return (
    <SafeAreaView
      style={[
        styles.root,
        { height: bannerMinHeight },
        style,
      ]}
      edges={['top']}
    >
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={Platform.OS === 'android' ? 'transparent' : androidStatusColor}
        translucent={Platform.OS === 'android'}
      />
      {renderBackground}
      {innerContent}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    overflow: 'hidden',
    flex: 1,
    justifyContent: 'center',
    maxHeight: 145,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  imageBackground: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  inner: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  titleBlock: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    color: Colors.textInverse,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    marginTop: 3,
  },
  rightSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bottomSlot: {
    marginTop: 14,
  },
});