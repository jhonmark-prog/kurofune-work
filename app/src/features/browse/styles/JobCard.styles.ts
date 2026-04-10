import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/colors';

export const jobCardStyles = StyleSheet.create({
  card: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 0,
    marginBottom: 12,
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  infoBlock: {
    flex: 1,
  },
  postedDate: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    lineHeight: 22,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    color: Colors.textSecondary,
    flex: 1,
  },
  thumbnail: {
    width: 76,
    height: 76,
    borderRadius: 10,
    backgroundColor: Colors.backgroundTertiary,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexShrink: 0,
  },
  thumbnailImg: {
    width: 76,
    height: 76,
    borderRadius: 10,
  },
  bookmarkBtn: {
    position: 'absolute',
    top: 4,
    right: 4,
    padding: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});