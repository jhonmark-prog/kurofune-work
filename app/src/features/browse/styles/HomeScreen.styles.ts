import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/colors';

export const homeStyles = StyleSheet.create({
  homeBanner: {
    position: 'relative',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  content: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  placeholder: {
    fontSize: 14,
    color: '#666666',
  },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textInverse,
    flex: 1,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  headerIconBtn: {
    width: 28,
    height: 28,
    borderRadius: 18,
    backgroundColor: Colors.backgroundPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Completion banner
  completionBanner: {
    backgroundColor: Colors.bannerBg,
    marginHorizontal: 16,
    padding: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0,
    borderTopWidth: 4,
    borderTopColor: Colors.bannerTitle,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    marginTop: -25,
  },
  completionTextWrap: {
    flex: 1,
    paddingRight: 12,
  },
  completionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.bannerTitle,
    // marginBottom: 6,
    fontFamily: 'NunitoSans-Bold',
  },
  completionSub: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.bannerTitle,
    lineHeight: 18,
    fontFamily: 'NunitoSans-Regular',
  },
  completionPct: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.bannerText,
    marginTop: 4,
    fontFamily: 'NunitoSans-Medium',
  },
  progressRing: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // List header
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  listHeaderTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  filterBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
    fontFamily: 'NunitoSans-SemiBold',
  },
  // Filter chips row (results mode)
  filtersChipRow: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    gap: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterChipText: {
    fontSize: 12,
    color: Colors.textPrimary,
    fontWeight: '500',
    fontFamily: 'NunitoSans-Medium',
  },
  filterChipClose: {
    marginLeft: 2,
  },
  showingResultsLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    paddingHorizontal: 16,
    paddingBottom: 6,
    fontStyle: 'italic',
    fontFamily: 'NunitoSans-Regular',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 12,
    fontFamily: 'NunitoSans-Regular',
  },
});