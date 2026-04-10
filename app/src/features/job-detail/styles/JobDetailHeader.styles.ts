import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/colors';

export const headerStyles = StyleSheet.create({
  root: {
    width: '100%',
    minHeight: 220,
    position: 'relative',
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.38)',
  },

  // Nav bar row
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Info block below nav
  infoBlock: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 22,
    marginBottom: 4,
    fontFamily: 'NunitoSans-Bold',
  },
  companyName: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 6,
    fontFamily: 'NunitoSans-Regular',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 14,
  },
  locationText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
    fontFamily: 'NunitoSans-Regular',
  },

  // Info pills
  pillsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  pill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 6,
  },
  pillIcon: {
    marginTop: 2,
  },
  pillLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.75)',
    fontFamily: 'NunitoSans-Regular',
    marginBottom: 2,
  },
  pillValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'NunitoSans-SemiBold',
  },
});