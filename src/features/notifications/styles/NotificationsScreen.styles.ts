import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

export const notificationsStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },


  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    position: 'relative',
  },
  backBtn: {
    position: 'absolute',
    left: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'NunitoSans-Bold',
    color: Colors.textPrimary,
  },


  listContent: {
    paddingTop: 8,
    paddingBottom: 32,
  },


  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
    backgroundColor: '#ffffff',
  },
  rowUnread: {

    backgroundColor: Colors.primaryLight,
  },


  iconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.backgroundTertiary,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 1,
  },


  textBlock: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 14,
    fontFamily: 'NunitoSans-Bold',
    color: Colors.textPrimary,
    marginBottom: 2,
    lineHeight: 20,
  },
  rowTitleRead: {
    fontFamily: 'NunitoSans-Regular',
    color: Colors.textSecondary,
  },
  rowBody: {
    fontSize: 13,
    fontFamily: 'NunitoSans-Regular',
    color: Colors.textSecondary,
    lineHeight: 18,
  },


  timestamp: {
    fontSize: 12,
    fontFamily: 'NunitoSans-Regular',
    color: Colors.textTertiary,
    flexShrink: 0,
    marginTop: 2,
  },


  emptyState: {
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textTertiary,
    fontFamily: 'NunitoSans-Regular',
    textAlign: 'center',
    marginTop: 12,
  },


  separator: {
    height: 1,
    backgroundColor: Colors.divider,
    marginLeft: 66, 
  },
});