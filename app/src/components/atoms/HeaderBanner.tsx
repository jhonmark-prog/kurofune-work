/**
 * HeaderBanner — Reusable atomic header component
 *
 * Supports:
 *  - Pseudo-gradient background using native Views (no external gradient plugin)
 *  - Matches Figma: #00AC9F → #006BA6
 *  - Custom gradient colors (pass gradientColors prop)
 *  - Image background (pass backgroundImage prop)
 *  - Left content slot (title + subtitle)
 *  - Right content slot (icon buttons, avatar, etc.)
 *  - Optional bottom slot (search bar, tabs, etc.)
 *
 * Lives in: src/components/atoms/HeaderBanner.tsx
 *
 * Usage examples:
 *
 * // Browse tab — pseudo-gradient (matches Figma)
 * <HeaderBanner
 *   title="Let's find you a job!"
 *   rightContent={<NotificationIconButton />}
 * />
 *
 * // Activity tab — different gradient colors
 * <HeaderBanner
 *   title="Activity"
 *   gradientColors={['#F57C00', '#C62828']}
 * />
 *
 * // Profile tab — image background
 * <HeaderBanner
 *   title="Your Profile"
 *   backgroundImage={{ uri: userAvatarUri }}
 *   overlayOpacity={0.55}
 * />
 *
 * // With bottom slot (e.g., tab pills)
 * <HeaderBanner
 *   title="Chats"
 *   bottomContent={<ChatTabBar />}
 * />
 */

import { ReactNode } from 'react';
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
import { Colors } from '../../constants/colors';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface HeaderBannerGradient {
  /** Array of color strings. Defaults to Figma spec: ['#00AC9F', '#006BA6'] */
  colors: string[];
  /** Gradient direction. Defaults to left-to-right (matches Figma). */
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

export interface HeaderBannerProps {
  /** Primary heading text */
  title?: string;
  /** Optional subtitle beneath the title */
  subtitle?: string;
  /**
   * Gradient config. Omit to use the default Figma teal→blue gradient.
   * Pass `gradientColors` shorthand or the full `gradient` object.
   */
  gradient?: HeaderBannerGradient;
  /** Shorthand: just pass the color stops, direction defaults to left→right */
  gradientColors?: string[];
  /**
   * Image background — when provided, the gradient is replaced by this image.
   * An overlay is applied on top for legibility.
   */
  backgroundImage?: ImageSourcePropType;
  /**
   * Opacity of the dark overlay when using backgroundImage. 0–1.
   * @default 0.45
   */
  overlayOpacity?: number;
  /**
   * Content rendered to the right of the title block (icon buttons, avatar, etc.)
   */
  rightContent?: ReactNode;
  /**
   * Content rendered below the title row (tabs, search bar, chip row, etc.)
   * The banner expands vertically to accommodate this.
   */
  bottomContent?: ReactNode;
  /** Additional styles applied to the outermost container */
  style?: ViewStyle;
  /** Status bar style. Defaults to 'light-content' since bg is always dark. */
  statusBarStyle?: 'light-content' | 'dark-content';
  /** Status bar background color on Android */
  statusBarColor?: string;
}

// ---------------------------------------------------------------------------
// Defaults matching the Figma screenshot
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function HeaderBanner({
  title,
  subtitle,
  gradient,
  gradientColors,
  backgroundImage,
  overlayOpacity = 0.45,
  rightContent,
  bottomContent,
  style,
  statusBarStyle = 'light-content',
  statusBarColor,
}: HeaderBannerProps) {
  const insets = useSafeAreaInsets();

  // Resolve gradient config
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
      {/* Title row */}
      <View style={styles.titleRow}>
        <View style={styles.titleBlock}>
          {title ? (
            <Text style={styles.title} numberOfLines={2}>
              {title}
            </Text>
          ) : null}
          {subtitle ? (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}
        </View>

        {rightContent ? (
          <View style={styles.rightSlot}>{rightContent}</View>
        ) : null}
      </View>

      {/* Bottom slot */}
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

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

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
  titleBlock: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textInverse,
    letterSpacing: 0.2,
    lineHeight: 26,
    fontFamily: 'NunitoSans',
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.8)',
    marginTop: 3,
    fontFamily: 'NunitoSans-Regular',
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