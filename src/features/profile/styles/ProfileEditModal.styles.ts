import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

export const editModalStyles = StyleSheet.create({
   overlay: {
     flex: 1,
     backgroundColor: 'rgba(0,0,0,0.35)',
   },
   keyboardAvoid: {
     flex: 1,
   },
   sheetInner: {
     flex: 1,
     justifyContent: 'flex-end',
   },
   sheet: {
     position: 'absolute',
     bottom: 0,
     left: 0,
     right: 0,
     backgroundColor: '#ffffff',
     borderTopLeftRadius: 20,
     borderTopRightRadius: 20,
     paddingBottom: 24,
     maxHeight: '90%',
   },
   sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 6,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  sheetTitle: {
    fontSize: 16,
    fontFamily: 'NunitoSans-Bold',
    color: Colors.textPrimary,
  },
  closeBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },


  tabRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    paddingHorizontal: 20,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 4,
    marginRight: 24,
    position: 'relative',
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


  formScroll: {
    flex: 1,
  },
  formContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },


  fieldLabel: {
    fontSize: 13,
    fontFamily: 'NunitoSans-Bold',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  required: {
    color: Colors.danger,
  },
  textInput: {
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: Colors.textPrimary,
    backgroundColor: '#ffffff',
    fontFamily: 'NunitoSans-Regular',
    marginBottom: 16,
  },
  textInputFocused: {
    borderColor: Colors.primary,
  },
  textInputMultiline: {
    height: 110,
    textAlignVertical: 'top',
  },
  pickerWrapper: {
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    color: Colors.textPrimary,
    fontFamily: 'NunitoSans-Regular',
  },


  entryCard: {
    borderWidth: 1,
    borderColor: Colors.divider,
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  entryCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 12,
  },
  entryCardIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.backgroundTertiary,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  entryCardInfo: {
    flex: 1,
  },
  entryCardTitle: {
    fontSize: 14,
    fontFamily: 'NunitoSans-Bold',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  entryCardSub: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontFamily: 'NunitoSans-Regular',
    marginBottom: 2,
  },
  entryCardDates: {
    fontSize: 12,
    color: Colors.textTertiary,
    fontFamily: 'NunitoSans-Regular',
  },
  entryCardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  entryActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  entryActionText: {
    fontSize: 13,
    fontFamily: 'NunitoSans-Regular',
  },


  newEntryBlock: {
    marginBottom: 16,
  },
  newEntryBlockHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  newEntryBlockTitle: {
    fontSize: 14,
    fontFamily: 'NunitoSans-Bold',
    color: Colors.primary,
  },
  removeNewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  removeNewText: {
    fontSize: 13,
    color: Colors.textTertiary,
    fontFamily: 'NunitoSans-Regular',
  },


  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkboxLabel: {
    fontSize: 14,
    fontFamily: 'NunitoSans-Regular',
    color: Colors.textPrimary,
  },


  addAnotherBtn: {
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  addAnotherText: {
    fontSize: 14,
    color: Colors.primary,
    fontFamily: 'NunitoSans-Medium',
  },


  saveBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 8,
  },
  saveBtnText: {
    fontSize: 16,
    fontFamily: 'NunitoSans-Bold',
    color: '#ffffff',
  },
});