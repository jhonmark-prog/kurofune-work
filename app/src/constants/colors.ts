export const Colors = {
  // Brand
  primary: '#00AC9F',
  primaryLight: '#E6F7F6',
  primaryDark: '#007A72',

  // Profile completion banner colors
  bannerBg: '#FFF4D6',
  bannerTitle: '#EC9A29',
  bannerText: '#232323',
  bannerProgress: '#2FAE79',

  // Text
  textPrimary: '#000000',
  textSecondary: '#666666',
  textTertiary: '#999999',
  textInverse: '#FFFFFF',

  // Button
  buttonStrokePrimary: '#3F3F46',

  // Background
  backgroundPrimary: '#F6F6F6',
  backgroundSecondary: '#F5F5F5',
  backgroundTertiary: '#EBEBEB',

  // UI
  border: '#E0E0E0',
  borderFocus: '#00AC9F',
  divider: '#F0F0F0',

  // Status
  success: '#2E7D32',
  warning: '#F57C00',
  danger: '#C62828',
  info: '#1565C0',

  // Status backgrounds (light tints)
  successBg: '#E8F5E9',
  warningBg: '#FFF3E0',
  dangerBg: '#FFEBEE',
  infoBg: '#E3F2FD',

  // Application status badges (from your spec)
  statusPending: '#000000',
  statusSent: '#F57C00',
  statusAccepted: '#2E7D32',
  statusRejected: '#C62828',
} as const;

export type ColorKey = keyof typeof Colors;