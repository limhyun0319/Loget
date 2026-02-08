import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
    {/*시스템 설정에 따라 다크/라이트 테마 적용*/}
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* 모든 화면에서 헤더를 기본적으로 숨김 (필요할 때만 켬) */}
        <Stack.Screen name="index" /> 
        <Stack.Screen name="signup" />
        <Stack.Screen name="(tabs)" />
        
        {/* 모달이 필요한 경우만 유지 (안 쓰면 삭제 가능) */}
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
    </AuthProvider>
  );
}