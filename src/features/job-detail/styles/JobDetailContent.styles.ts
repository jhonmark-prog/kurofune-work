import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

export const contentStyles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
  },
  infoRow: {
    marginBottom: 18,
  },
  infoLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontFamily: 'NunitoSans-Bold',
    marginBottom: 3,
  },
  infoValue: {
    fontSize: 16,
    color: Colors.bannerText,
    fontWeight: '500',
    fontFamily: 'NunitoSans-Medium',
    lineHeight: 20,
  },
  bodyText: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontFamily: 'NunitoSans-Regular',
    lineHeight: 22,
  },
});