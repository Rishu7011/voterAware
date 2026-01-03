import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useState } from 'react'
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

const CreateAccount = () => {
  // const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  // const [loading, setLoading] = useState(false)

  // const countryCode = '+91'

  // const handleSignInWithPhoneNumber = async () => {
  //   if (phone.length !== 10) {
  //     alert('Enter valid 10 digit number')
  //     return
  //   }

  //   try {
  //     setLoading(true)

  //     const confirmation = await auth().signInWithPhoneNumber(
  //       countryCode + phone
  //     )

  //     // ✅ PASS ONLY verificationId
  //     router.push({
  //       pathname: '/(auth)/otp',
  //       params: {
  //         verificationId: confirmation.verificationId,
  //       },
  //     })
  //   } catch (error) {
  //     console.log('Error signing in with phone number:', error)
  //     alert('Failed to send OTP')
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  return (
    <ScrollView>
      <SafeAreaView className="flex flex-col items-center bg-white">
        <View
          className="p-3 mt-6"
          style={{ backgroundColor: '#e1f0ff', borderRadius: 10 }}
        >
          <MaterialIcons name="how-to-vote" size={90} color="#137fec" />
        </View>

        <Text className="text-3xl font-bold mt-10">
          Voter Verification
        </Text>

        <Text className="text-center mx-4 text-gray-800 text-base mt-2">
          Enter your mobile number to securely{'\n'}
          access fact-checking resources and voter{'\n'}
          information.
        </Text>

        <View className="w-full px-8 mt-10">
          <Text className="font-semibold text-[15px]">
            Email Address
          </Text>

          {/* <TextInput
            value={phone}
            onChangeText={setPhone}
            keyboardType="number-pad"
            maxLength={10}
            placeholder="Enter your mobile number"
            className="mt-2 border border-gray-300 rounded-lg px-4 py-3"
          /> */}

          {/* <TextInput
            value={phone}
            onChangeText={setPhone}
            keyboardType="number-pad"
            maxLength={10}
            placeholder="Enter your mobile number"
            className="mt-2 border border-gray-300 rounded-lg px-4 py-3"
          /> */}
          

          <Text className="mt-2 text-xs text-gray-500">
            We'll send a text with a verification code.
          </Text>

          <Pressable
            onPress={handleSignInWithPhoneNumber}
            disabled={loading}
            className={`w-full items-center justify-center rounded-lg py-4 mt-4 ${
              loading ? 'bg-gray-400' : 'bg-[#137fec]'
            }`}
          >
            <Text className="text-white font-medium">
              {loading ? 'Sending OTP...' : 'Verify & Login'}
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default CreateAccount

const styles = StyleSheet.create({})
