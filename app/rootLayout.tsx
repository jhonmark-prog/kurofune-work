import { useSelector } from 'react-redux';
import { Stack } from 'expo-router';
import { selectUserIsLoggedIn } from '../src/store/userSlice';

export default function RootLayout() {
  const userIsLoggedIn = useSelector(selectUserIsLoggedIn);

  return (
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
        }}
    >
        <Stack.Protected guard={!userIsLoggedIn}>
          <Stack.Screen 
            name="(auth)" 
            options={{
              statusBarStyle: 'dark',
              statusBarColor: 'transparent',
              statusBarTranslucent: true
            }}
          />
        </Stack.Protected>
        <Stack.Protected guard={userIsLoggedIn}>
          <Stack.Screen name="(tabs)"/>
        </Stack.Protected>
    </Stack>
  );
}