import { Stack } from "expo-router"
import "./globals.css"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { TTSProvider } from "@/src/context/TTSContext"
import { AuthProvider } from "@/lib/context/AuthContext"
import { useAuthGuard } from "@/hooks/useAuthGuard"
import { ToastProvider } from "@/components/ui/toast"

function RootNavigation() {
  // ✅ AuthGuard is now INSIDE AuthProvider
  useAuthGuard()

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="report"
        options={{ title: "Report" }}
      />
      <Stack.Screen
        name="chatbot"
        options={{ title: "Chatbot" }}
      />
      <Stack.Screen
        name="sources"
        options={{ title: "Sources" }}
      />
    </Stack>
  )
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <TTSProvider>
        <SafeAreaProvider>
          <ToastProvider>
            <RootNavigation />
          </ToastProvider>
        </SafeAreaProvider>
      </TTSProvider>
    </AuthProvider>
  )
}
