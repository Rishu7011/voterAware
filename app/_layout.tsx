import 'react-native-gesture-handler'
import { Stack } from 'expo-router'
import './globals.css'
import { StatusBar } from 'react-native'

export default function RootLayout() {
  return (
    <>
      <StatusBar hidden />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="report"
          options={{ headerShown: true, title: 'Report Misinformation' }}
        />
        <Stack.Screen
          name="sources"
          options={{ headerShown: true, title: 'Transparency & Sources' }}
        />
        <Stack.Screen
          name="settings"
          options={{ headerShown: true, title: 'Settings' }}
        />
        <Stack.Screen
          name="detail"
          options={{ headerShown: true, title: 'User Details' }}
        />
        
      </Stack>
    </>
  )
}
