import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

export const activityStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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


  contentCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingTop: 0,
    overflow: 'hidden',
  },


  tabRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 4,
    marginRight: 28,
    position: 'relative',
    gap: 6,
  },
  tabLabel: {
    fontSize: 14,
    fontFamily: 'NunitoSans-Regular',
    color: Colors.textTertiary,
  },
  tabLabelActive: {
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    borderRadius: 1,
    backgroundColor: Colors.primary,
  },


  tabBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.backgroundTertiary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  tabBadgeActive: {
    backgroundColor: Colors.primaryLight,
  },
  tabBadgeText: {
    fontSize: 11,
    fontFamily: 'NunitoSans-Bold',
    color: Colors.textTertiary,
    lineHeight: 14,
  },
  tabBadgeTextActive: {
    color: Colors.primary,
  },


  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },


  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textTertiary,
    fontFamily: 'NunitoSans-Regular',
    textAlign: 'center',
    marginTop: 12,
  },


  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  statusBadgeText: {
    fontSize: 11,
    fontFamily: 'NunitoSans-Medium',
  },


  dialogOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  dialogBox: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 340,
  },
  dialogTitle: {
    fontSize: 16,
    fontFamily: 'NunitoSans-Bold',
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  dialogBody: {
    fontSize: 14,
    fontFamily: 'NunitoSans-Regular',
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 24,
  },
  dialogActions: {
    flexDirection: 'row',
    gap: 12,
  },
  dialogBtnCancel: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogBtnCancelText: {
    fontSize: 14,
    fontFamily: 'NunitoSans-Medium',
    color: Colors.textPrimary,
  },
  dialogBtnConfirm: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogBtnConfirmText: {
    fontSize: 14,
    fontFamily: 'NunitoSans-Bold',
    color: '#ffffff',
  },
});