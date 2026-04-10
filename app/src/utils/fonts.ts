import { useFonts } from 'expo-font';
import { useEffect } from 'react';

// Define the font map for Nunito Sans (using single font file for all variants)
export const fontConfig = {
  'NunitoSans-Regular': require('../../assets/fonts/NunitoSans.ttf'),
  'NunitoSans-Bold': require('../../assets/fonts/NunitoSans.ttf'),
  'NunitoSans-SemiBold': require('../../assets/fonts/NunitoSans.ttf'),
  'NunitoSans-Medium': require('../../assets/fonts/NunitoSans.ttf'),
  'NunitoSans-Light': require('../../assets/fonts/NunitoSans.ttf'),
  'NunitoSans-Italic': require('../../assets/fonts/NunitoSans.ttf'),
};

export const useAppFonts = () => {
  const [fontsLoaded, error] = useFonts(fontConfig);

  useEffect(() => {
    if (error) {
      console.warn('Font loading failed, using system fonts:', error);
    }
  }, [error]);

  return fontsLoaded;
};