import { Stack } from "expo-router";
import "./globals.css"
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      <StatusBar hidden={true} />
      <Stack>

        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="report" options={{ headerShown: true, title: "Report Misinformation" }} />
        <Stack.Screen name="sources" options={{ headerShown: true, title: "Transparency & Sources" }} />
      </Stack>
    </>
  )
}
