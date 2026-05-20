export const Colors = {

  red: '#c8161d',
  white: '#ffffff',
  gray: '#DCDCDC',
  black: '#000000',
  dark: '#2C3338',
  darkGray: '#808080',
  primary: '#00AC9F',
  primaryLight: '#E6F7F6',
  primaryDark: '#007A72',


  bannerBg: '#FFF4D6',
  bannerTitle: '#EC9A29',
  bannerText: '#232323',
  bannerProgress: '#2FAE79',


  textPrimary: '#000000',
  textSecondary: '#727272',
  textTertiary: '#000000',
  textInverse: '#FFFFFF',
  textTitleBlue: '#006BA6',


  buttonStrokePrimary: '#3F3F46',
  buttonDisabled: '#CCCCCC',


  backgroundPrimary: '#F6F6F6',
  backgroundSecondary: '#F5F5F5',
  backgroundTertiary: '#EBEBEB',
  backgroundBlue: '#006BA6',


  border: '#E0E0E0',
  borderFocus: '#00AC9F',
  divider: '#E6E6E6',


  success: '#2E7D32',
  warning: '#F57C00',
  danger: '#C62828',
  info: '#1565C0',


  successBg: '#E8F5E9',
  warningBg: '#FFF3E0',
  dangerBg: '#FFEBEE',
  infoBg: '#E3F2FD',


  statusPending: '#000000',
  statusSent: '#F57C00',
  statusAccepted: '#2E7D32',
  statusRejected: '#C62828',
} as const;

export type ColorKey = keyof typeof Colors;