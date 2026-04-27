import { useFonts } from 'expo-font';
import { useEffect } from 'react';

export const fontConfig = {
  'NunitoSans-Regular': require('../../assets/fonts/NunitoSans-Regular.ttf'),
  'NunitoSans-Bold': require('../../assets/fonts/NunitoSans-Bold.ttf'),
  'NunitoSans-SemiBold': require('../../assets/fonts/NunitoSans.ttf'),
  'NunitoSans-Medium': require('../../assets/fonts/NunitoSans-Medium.ttf'),
  'NunitoSans-Light': require('../../assets/fonts/NunitoSans.ttf'),
  'NunitoSans-Italic': require('../../assets/fonts/NunitoSans.ttf'),
};

export const useAppFonts = () => {
  const [fontsLoaded, error] = useFonts(fontConfig);

  useEffect(() => {
    if (error) {

    }
  }, [error]);

  return fontsLoaded;
};