import { signUpWithEmail } from '@/lib/auth.actions'
import { useAuth } from '@/lib/context/AuthContext'
import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useState } from 'react'
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const { refreshSession } = useAuth()

  const validateForm = () => {
    if (!fullName.trim()) {
      Alert.alert('Validation Error', 'Full name is required.')
      return false
    }
    if (!email.trim()) {
      Alert.alert('Validation Error', 'Email is required.')
      return false
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email.')
      return false
    }
    if (password.length < 6) {
      Alert.alert(
        'Validation Error',
        'Password must be at least 6 characters long.'
      )
      return false
    }
    return true
  }

  const onSubmit = async () => {
    if (!validateForm()) return

    try {
      setLoading(true)
      console.log('Signing up with:', { email, fullName })

      const result = await signUpWithEmail({
        email,
        password,
        fullName,
      })

      if (result.user) {
        Alert.alert('Success', 'Account created successfully!')
        await refreshSession()
        router.replace('/') // navigate to home
      } else {
        throw new Error(result.error || 'Unexpected error')
      }
    } catch (error) {
      console.error(error)
      Alert.alert(
        'Sign Up Failed',
        error instanceof Error ? error.message : 'Something went wrong'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scroll}
      keyboardShouldPersistTaps="handled"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="how-to-vote" size={90} color="#137fec" />
        </View>

        <Text style={styles.title}>Create Account</Text>

        <Text style={styles.subtitle}>
          Sign up with your email to access secure voter information
        </Text>

        <View style={styles.form}>
          {/* Full Name */}
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter your full name"
            style={styles.input}
          />

          {/* Email */}
          <Text style={[styles.label, { marginTop: 16 }]}>Email Address</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          {/* Password */}
          <Text style={[styles.label, { marginTop: 16 }]}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            style={styles.input}
          />

          {/* Submit */}
          <Pressable
            onPress={onSubmit}
            disabled={loading}
            style={[styles.button, loading && styles.buttonDisabled]}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Creating account...' : 'Sign Up'}
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default SignUp

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  container: {
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    padding: 12,
    marginTop: 30,
    backgroundColor: '#e1f0ff',
    borderRadius: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#4a4a4a',
    textAlign: 'center',
    marginTop: 6,
    marginHorizontal: 20,
  },
  form: {
    width: '100%',
    marginTop: 30,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginTop: 6,
  },
  button: {
    backgroundColor: '#137fec',
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#8bbcf9',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
})
