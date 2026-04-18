import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

export const infoBlockStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 8,
    marginTop: -40,
  },
  infoContents: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    textAlign: 'center',
    shadowColor: '#b6aeae',
    shadowOpacity: 0.03,
    elevation: 5,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textTitleBlue,
    lineHeight: 22,
    marginBottom: 4,
    fontFamily: 'NunitoSans-Bold',
    textAlign: 'center',
  },
  companyName: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 6,
    fontFamily: 'NunitoSans-Medium',
    textAlign: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginBottom: 14,
  },
  locationText: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'NunitoSans-Regular',
    textAlign: 'center',
  },
  pillsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  pill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  pillIcon: {
    marginTop: 2,
  },
  pillLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontFamily: 'NunitoSans-Bold',
    marginBottom: 2,
  },
  pillValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'NunitoSans-Regular',
  },
});