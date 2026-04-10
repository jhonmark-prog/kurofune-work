import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAppFonts } from './src/utils/fonts';
import { View, Text, ActivityIndicator } from 'react-native';

export default function RootLayout() {
  const fontsLoaded = useAppFonts();

  // Show loading screen while fonts are loading
  if (!fontsLoaded) {
    return (
      <SafeAreaProvider>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
          <ActivityIndicator size="large" color="#00AC9F" />
          <Text style={{ marginTop: 16, fontSize: 16, color: '#666666' }}>
            Loading...
          </Text>
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#12A497',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: '600',
            fontFamily: 'NunitoSans-SemiBold',
          },
        }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
    </SafeAreaProvider>
  );
}