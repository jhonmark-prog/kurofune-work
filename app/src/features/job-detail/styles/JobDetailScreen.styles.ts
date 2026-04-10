import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/colors';

export const screenStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },

  // Apply footer
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    backgroundColor: Colors.backgroundPrimary,
  },
  applyBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 24,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyBtnDisabled: {
    backgroundColor: Colors.textTertiary,
  },
  applyBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'NunitoSans-Bold',
  },
});