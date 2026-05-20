import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

export const jobCardStyles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    shadowColor: '#b6aeae',
    shadowOpacity: .03,
    elevation: 5,
  },
  titleRow: {
    flexDirection: 'row',
    gap: 15,
  },
  title: {
    flex: 1,
    color: Colors.textTitleBlue,
    fontSize: 16,
    fontFamily: 'NunitoSans-Bold',
  },
  bookmarkBtn: {
    padding: 2,
    marginTop: 1,
  },
  postedDate: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: -6,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  metaBlock: {
    flex: 1,
    paddingRight: 12,
    gap: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontSize: 14,
    color: Colors.textPrimary,
    flex: 1,
    fontFamily: 'NunitoSans-Regular',
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: Colors.backgroundTertiary,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexShrink: 0,
  },
  thumbnailImg: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
});