    import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/colors';

export const tabStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.backgroundPrimary,
    position: 'relative',
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 4,
    marginRight: 20,
    position: 'relative',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textSecondary,
    fontFamily: 'NunitoSans-Medium',
  },
  tabLabelActive: {
    color: Colors.primary,
    fontWeight: '700',
    fontFamily: 'NunitoSans-Bold',
  },
  activeUnderline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    borderRadius: 1,
    backgroundColor: Colors.primary,
  },
  // Full-width bottom border sits behind the underline
  border: {
    height: 1,
    backgroundColor: Colors.divider,
    marginHorizontal: 0,
  },
});