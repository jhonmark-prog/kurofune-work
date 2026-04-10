import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/colors';

export const jobCardStyles = StyleSheet.create({
  card: {
    backgroundColor: Colors.backgroundPrimary,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },

  // Row 1: title + bookmark icon (spans full width)
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 1,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
    lineHeight: 22,
    paddingRight: 10,
    fontFamily: 'NunitoSans-Bold',
  },
  bookmarkBtn: {
    padding: 2,
    marginTop: 1,
  },

  // Row 2: posted date
  postedDate: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 10,
    fontFamily: 'NunitoSans-Regular',
  },

  // Row 3: meta + thumbnail side by side
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
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

  // Thumbnail
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