import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/colors';

export const jobCardStyles = StyleSheet.create({
  card: {
    backgroundColor: Colors.backgroundPrimary,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoBlock: {
    flex: 1,
    paddingRight: 8,
  },
  postedDate: {
    fontSize: 11,
    color: Colors.textTertiary,
    marginBottom: 3,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 6,
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
    gap: 5,
  },
  metaText: {
    fontSize: 12,
    color: Colors.textSecondary,
    flex: 1,
  },
  salaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 5,
  },
  salary: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  thumbnail: {
    width: 72,
    height: 72,
    borderRadius: 8,
    backgroundColor: Colors.backgroundTertiary,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  thumbnailImg: {
    width: 72,
    height: 72,
    borderRadius: 8,
  },
  bookmarkBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 4,
  },
});