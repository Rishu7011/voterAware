import { InputOTP } from '@/components/ui/input-otp'

import { useLocalSearchParams, router } from 'expo-router'
import React, { useState } from 'react'
import { View, Text, Alert } from 'react-native'

const OtpScreen = () => {
  

  return (
    <View className="flex-1 justify-center items-center p-4 bg-white">
      <Text className="mb-4 text-lg font-semibold">
        Enter OTP
      </Text>

      {/* <InputOTP
        length={6}
        value={otp}
        onChangeText={setOtp}
        onComplete={(code) => {
          setOtp(code)
          confirmCode(code)
        }}
      /> */}

      {/* {loading && (
        <Text className="mt-4 text-gray-500">
          Verifying...
        </Text>
      )} */}
    </View>
  )
}

export default OtpScreen
