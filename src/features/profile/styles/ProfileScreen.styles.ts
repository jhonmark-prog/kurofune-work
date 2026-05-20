import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

export const profileScreenStyles = StyleSheet.create({
  homeBanner: {
    position: 'relative',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 20,
    marginTop: -25,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },


  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerActionBtn: {
    width: 28,
    height: 28,
    borderRadius: 18,
    backgroundColor: Colors.backgroundPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },


  completionBanner: {
    backgroundColor: Colors.bannerBg,
    marginHorizontal: 16,
    padding: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 4,
    borderTopColor: Colors.bannerTitle,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    marginTop: -20,
    marginBottom: 16,
  },
  completionTextWrap: {
    flex: 1,
    paddingRight: 12,
  },
  completionLabel: {
    fontSize: 14,
    color: Colors.bannerTitle,
    fontFamily: 'NunitoSans-Bold',
  },
  completionSub: {
    color: Colors.bannerTitle,
    fontSize: 12,
    fontFamily: 'NunitoSans-Regular',
    marginTop: 2,
  },
  progressRing: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },


  profileInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
  },
  profileInfoMain: {
    flex: 1,
  },
  contactGrid: {


    gap: 12,
    paddingVertical: 15,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: '45%',
  },


  identityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatarWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.backgroundTertiary,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  avatarInitials: {
    fontSize: 22,
    fontFamily: 'NunitoSans-Bold',
    color: Colors.primary,
  },
  identityInfo: {
    flex: 1,
  },
  identityName: {
    color: Colors.textTitleBlue,
    fontFamily: 'NunitoSans-Bold',
  },
  identityJobTitle: {
    color: Colors.black,
    fontFamily: 'NunitoSans-Bold',
  },
  nationalityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  nationalityFlag: {
    fontSize: 14,
  },
  nationalityText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontFamily: 'NunitoSans-Regular',
  },
  identityEditBtn: {
    padding: 4,
  },


  sectionCard: {
    marginHorizontal: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    shadowColor: '#b6aeae',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'NunitoSans-Bold',
    color: Colors.textPrimary,
  },
  sectionEditBtn: {
    padding: 2,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginBottom: 12,
  },


  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontFamily: 'NunitoSans-Regular',
  },
  contactTextMuted: {
    fontSize: 14,
    color: Colors.textTertiary,
    fontFamily: 'NunitoSans-Regular',
    fontStyle: 'italic',
  },


  aboutText: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontFamily: 'NunitoSans-Regular',
    lineHeight: 22,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textTertiary,
    fontFamily: 'NunitoSans-Regular',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 8,
  },


  expItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 14,
  },
  expIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.backgroundTertiary,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  expInfo: {
    flex: 1,
  },
  expTitle: {
    fontSize: 14,
    fontFamily: 'NunitoSans-Bold',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  expCompany: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontFamily: 'NunitoSans-Regular',
    marginBottom: 2,
  },
  expDates: {
    fontSize: 12,
    color: Colors.textTertiary,
    fontFamily: 'NunitoSans-Regular',
  },
  expSeparator: {
    height: 1,
    backgroundColor: Colors.divider,
    marginBottom: 14,
  },


  cvRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cvIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: Colors.backgroundTertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cvInfo: {
    flex: 1,
  },
  cvFilename: {
    fontSize: 14,
    fontFamily: 'NunitoSans-Regular',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  cvUploadedAt: {
    fontSize: 12,
    color: Colors.textTertiary,
    fontFamily: 'NunitoSans-Regular',
  },
});