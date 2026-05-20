import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

export const screenStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  applyBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyBtnLoading: {
    backgroundColor: Colors.primary,
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
  applyErrorText: {
    color: Colors.error,
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
});