import { Stack } from "expo-router";
import "./globals.css"
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TTSProvider } from "@/src/context/TTSContext";
import { AuthProvider } from "@/lib/context/AuthContext";

export default function RootLayout() {
    return (
        <AuthProvider>
            <TTSProvider>
                <SafeAreaProvider>
                    <Stack>
                        <Stack.Screen
                            name="report"
                            options={{
                                title: "Report",
                            }}
                        />
                        <Stack.Screen
                            name="(tabs)"
                            options={{
                                headerShown: false
                            }}
                        />
                        <Stack.Screen
                            name="chatbot"
                            options={{
                                title: "Chatbot",
                            }}
                        />
                        <Stack.Screen
                            name="sources"
                            options={{
                                title: "Sources",
                            }}
                        />
                    </Stack>
                </SafeAreaProvider>
            </TTSProvider>
        </AuthProvider>
    )
}