    import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

export const tabStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
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
    fontSize: 14,
    color: Colors.primary,
    fontFamily: 'NunitoSans-Regular',
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
    height: 1,
    borderRadius: 1,
    backgroundColor: Colors.primary,
  },
  border: {
    height: 1,
    backgroundColor: Colors.divider,
    marginHorizontal: 0,
  },
});