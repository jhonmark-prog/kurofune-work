import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';

export default function RootLayout() {
  const userIsLoggedIn = false;
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const alreadyAuthGroup = segments[0] === '(auth)';

    if (!userIsLoggedIn && !alreadyAuthGroup) {
      router.replace('/');
    }else if(userIsLoggedIn){
      router.replace('/browse');
    }
  }, [userIsLoggedIn]);

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#12A497',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: '600',
          },
          statusBarStyle: 'dark',
          statusBarColor: 'transparent',
          statusBarTranslucent: true
        }}
      >
        <Stack.Screen name="(auth)"/>
        <Stack.Screen name="(tabs)"/>
      </Stack>
    </>
  );
}