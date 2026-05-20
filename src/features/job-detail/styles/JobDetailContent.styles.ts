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
    fontSize: 12,
    color: Colors.textSecondary,
    fontFamily: 'NunitoSans-Bold',
    marginBottom: 3,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  infoValue: {
    fontSize: 15,
    color: Colors.textPrimary,
    fontFamily: 'NunitoSans-Regular',
    lineHeight: 22,
  },
  bodyText: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontFamily: 'NunitoSans-Regular',
    lineHeight: 22,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textTertiary,
    fontFamily: 'NunitoSans-Regular',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 24,
  },
});