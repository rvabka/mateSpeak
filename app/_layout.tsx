import { Stack, SplashScreen } from 'expo-router';
import '../global.css';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import 'react-native-url-polyfill/auto';
import GlobalProvider from '../context/GlobalProvider';
import { ActivityIndicator } from 'react-native';
import LevelDetail from '@/app/levels/LevelDetail';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf')
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
    if (!fontsLoaded && !error) return;
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    <ActivityIndicator size="large" color="#00ff00" />;
  }

  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="levels/LevelDetail"
          options={{ headerShown: false }}
        />
      </Stack>
    </GlobalProvider>
  );
}
