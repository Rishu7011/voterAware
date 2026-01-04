import { router, Tabs } from "expo-router";
import "./globals.css"
import { Feather } from "@expo/vector-icons";
import { View } from "react-native";
import { AuthProvider } from "../lib/context/AuthContext";

export default function RootLayout() {
    const tabIcon = ({ name, focused }: { name: any; focused: boolean }) => (
        <Feather
            name={name}
            size={focused ? 28 : 24}
            color={focused ? "#1E88E5" : "gray"}
        />
    );
    return (

        <AuthProvider>
            <Tabs>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Home",
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            tabIcon({ name: "home", focused })
                        )
                    }}
                />
                <Tabs.Screen
                    name="learn"
                    options={{
                        title: "Learn",
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            tabIcon({ name: "book-open", focused })
                        )
                    }}
                    listeners={{
                        tabPress: (e) => {
                            e.preventDefault(); // stop default behavior
                            router.replace("/learn"); // always go to learn root
                        },
                    }}
                />
                <Tabs.Screen
                    name="chatbot"
                    options={{
                        title: "",
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                // If you want the icon to "float" or stay centered in the tab:
                                width: 80,
                                height: 80,
                                borderRadius: 35,
                                backgroundColor: focused ? '#E3F2FD' : 'transparent', // Light blue bg when active
                                marginTop: -10, // Adjust this to move it up or down to center visually
                            }}>
                                <Feather
                                    name="message-circle"
                                    size={42} // Slightly smaller size looks better inside a 70px circle
                                    color={focused ? "white" : "white"}
                                    className={` rounded-full p-4 ${focused ? "shadow-lg shadow-blue bg-blue-500" : "bg-blue-400 shadow-lg"}`}
                                />
                            </View>
                        )
                    }}
                />
                <Tabs.Screen
                    name="factcheck"
                    options={{
                        title: "Fact Check",
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            tabIcon({ name: "check-square", focused })
                        )
                    }}
                />
                <Tabs.Screen
                    name="setting"
                    options={{
                        title: "Settings",
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            tabIcon({ name: "sliders", focused })
                        )
                    }}
                />
            </Tabs>;
        </AuthProvider>
    )
}
