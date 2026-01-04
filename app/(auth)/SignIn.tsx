import { signInWithEmail } from "@/lib/auth.actions"
import { Link, router } from "expo-router"
import React, { useState } from "react"
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { MaterialIcons } from "@expo/vector-icons"

const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and password are required")
      return
    }

    try {
      setLoading(true)
      const result = await signInWithEmail({ email, password })

      console.log("Signed in:", result)
      router.replace("/") // go to home after login
    } catch (error) {
      Alert.alert(
        "Login failed",
        error instanceof Error ? error.message : "Something went wrong"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.container}>
        <View style={styles.iconBox}>
          <MaterialIcons name="lock" size={80} color="#137fec" />
        </View>

        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>
          Sign in to continue
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
          />

          <Text style={[styles.label, { marginTop: 16 }]}>
            Password
          </Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            secureTextEntry
            style={styles.input}
          />

          <Pressable
            onPress={onSubmit}
            disabled={loading}
            style={[styles.button, loading && styles.disabled]}
          >
            <Text style={styles.buttonText}>
              {loading ? "Signing in..." : "Sign In"}
            </Text>
          </Pressable>

          <Pressable onPress={() => router.push("/(auth)/SignUp")}>
            <Text style={styles.link}>
              Don’t have an account? Sign Up
            </Text>
          </Pressable>
        </View>
        <Link href={"/report" as any}>report</Link>
      </SafeAreaView>
    </ScrollView>
  )
}

export default SignIn
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  iconBox: {
    marginTop: 40,
    padding: 16,
    backgroundColor: "#e1f0ff",
    borderRadius: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 6,
  },
  form: {
    width: "100%",
    marginTop: 40,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginTop: 6,
  },
  button: {
    backgroundColor: "#137fec",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 24,
    alignItems: "center",
  },
  disabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  link: {
    marginTop: 20,
    color: "#137fec",
    textAlign: "center",
    fontWeight: "500",
  },
})
