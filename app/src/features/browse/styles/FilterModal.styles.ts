import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/colors';

export const filterStyles = StyleSheet.create({
  // Full-screen container
  screen: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
  flex: {
    flex: 1,
  },

  // Header nav bar
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    backgroundColor: Colors.backgroundPrimary,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // referenced as style object to pull .color in JSX
  backIcon: {
    color: Colors.textPrimary,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    fontFamily: 'NunitoSans-SemiBold',
  },

  // Scrollable body
  body: {
    flex: 1,
  },
  bodyContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },

  // Section labels
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
    fontFamily: 'NunitoSans-Bold',
  },

  // Location text input
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: Colors.textPrimary,
    backgroundColor: Colors.backgroundPrimary,
    marginBottom: 22,
    fontFamily: 'NunitoSans-Regular',
  },
  inputFocused: {
    borderColor: Colors.borderFocus,
  },
  // referenced as style object to pull .color in JSX
  placeholder: {
    color: Colors.textTertiary,
  },

  // Industry picker
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
  },
  // referenced as style object to pull .color in JSX
  pickerIcon: {
    color: Colors.textSecondary,
  },

  // Visa type chips
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: Colors.backgroundSecondary,
    borderWidth: 0,
  },
  chipActive: {
    backgroundColor: Colors.primary,
  },
  chipText: {
    fontSize: 13,
    color: Colors.textPrimary,
    fontWeight: '500',
    fontFamily: 'NunitoSans-Medium',
  },
  chipTextActive: {
    color: Colors.textInverse,
    fontWeight: '600',
    fontFamily: 'NunitoSans-SemiBold',
  },

  // Footer button row — pinned to bottom
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
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
    fontFamily: 'NunitoSans-SemiBold',
  },
  goBtn: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textInverse,
    fontFamily: 'NunitoSans-Bold',
  },
});