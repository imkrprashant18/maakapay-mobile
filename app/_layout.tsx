import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Jost_600SemiBold } from '@expo-google-fonts/jost';
import { Nunito_500Medium } from '@expo-google-fonts/nunito';
import { Outfit_400Regular } from '@expo-google-fonts/outfit';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    'AllRoundGothic-Medium': Nunito_500Medium,
    'FuturaNext-DemiBold': Jost_600SemiBold,
    'FuturaNext-Book': Outfit_400Regular,
  });

  if (!fontsLoaded) return null;

  const theme = colorScheme === 'dark'
    ? { ...DarkTheme, colors: { ...DarkTheme.colors, background: Colors.dark.background, text: Colors.dark.text } }
    : { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: Colors.light.background, text: Colors.light.text } };

  return (
    <ThemeProvider value={theme}>
      <PaperProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" options={{ headerShown: false }} />
          <Stack.Screen name="Login" options={{ headerShown: false }} />
          <Stack.Screen name="VerifyOtp" options={{ headerShown: false }} />

          {/* tab screens */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </PaperProvider>
    </ThemeProvider>
  );
}
