export const Colors = {
  // Brand
  primary: '#00AC9F',
  primaryLight: '#E6F7F6',
  primaryDark: '#007A72',

  // Text
  textPrimary: '#000000',
  textSecondary: '#666666',
  textTertiary: '#999999',
  textInverse: '#FFFFFF',

  // Background
  backgroundPrimary: '#FFFFFF',
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