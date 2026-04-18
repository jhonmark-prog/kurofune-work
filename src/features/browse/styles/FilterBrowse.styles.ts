import { StyleSheet } from 'react-native';
import { Colors } from '@constants/colors';

export const filterStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    color: Colors.textPrimary,
  },
  headerTitle: {
    color: Colors.textPrimary,
    fontFamily: 'NunitoSans-Bold',
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 16,
  },
  sectionLabel: {
    fontSize: 14,
    color: Colors.textPrimary,
    marginBottom: 8,
    fontFamily: 'NunitoSans-Bold',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.textPrimary,
    backgroundColor: "#ffffff",
    marginBottom: 22,
    fontFamily: 'NunitoSans-Regular',
  },
  inputFocused: {
    borderColor: Colors.borderFocus,
  },
  placeholder: {
    color: Colors.textTertiary,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    marginBottom: 22,
    backgroundColor: Colors.backgroundPrimary,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    color: Colors.textPrimary,
    fontFamily: 'NunitoSans-Regular',
    backgroundColor: "#ffffff",
  },
  pickerIcon: {
    color: Colors.textSecondary,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: Colors.backgroundPrimary,
    borderWidth: 0,
  },
  chipActive: {
    backgroundColor: Colors.backgroundBlue,
  },
  chipText: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '500',
    fontFamily: 'NunitoSans-Medium',
  },
  chipTextActive: {
    color: "#ffffff",
    fontWeight: '600',
    fontFamily: 'NunitoSans-Medium',
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    backgroundColor: Colors.backgroundPrimary,
  },
  resetBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetBtnText: {
    fontSize: 16,
    color: Colors.primary,
    fontFamily: 'NunitoSans-Medium',
  },
  goBtn: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goBtnText: {
    fontSize: 16,
    color: Colors.textInverse,
    fontFamily: 'NunitoSans-Medium',
  },
});