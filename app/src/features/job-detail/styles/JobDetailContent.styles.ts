import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/colors';

export const contentStyles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
  },

  // Label-value pair row
  infoRow: {
    marginBottom: 18,
  },
  infoLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontFamily: 'NunitoSans-Regular',
    marginBottom: 3,
  },
  infoValue: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '500',
    fontFamily: 'NunitoSans-Medium',
    lineHeight: 20,
  },

  // Free-text tabs (Job Description, Selection Process, Others)
  bodyText: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontFamily: 'NunitoSans-Regular',
    lineHeight: 22,
  },
});