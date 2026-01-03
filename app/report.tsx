import {StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SelectField from '../components/selectfield'
import ImageUpload from '@/components/ImageUpload'
import { Link } from 'expo-router'
import { TextInput } from 'react-native'
import { FilePickerImages } from '@/components/demo/file-picker/file-picker-images'

const report = () => {
    const [reason, setReason] = useState<number | undefined>(undefined)

    const handleSubmit = () => {

    }

    return (
        <SafeAreaView className='mx-2'>
            <View>
                <Text className='text-slate-600 dark:text-slate-300 text-base font-normal leading-normal'>See something suspicious? Let Fact-checkers know. Your report helps keep your democracy transparent.</Text>
            </View>
            <View className='gap-2'>
                <Text className='font-bold text-[1.25rem]'>
                    What did you see?
                </Text>
                <TextInput
                    placeholder="Paste the link or the headline here..."
                    multiline
                    numberOfLines={4}
                    className="border rounded-lg p-2 border-gray-300 "
                />
            </View>
            <View className='gap-2'>
                <Text className='font-bold text-[1.25rem]'>
                    Evidence
                    <Text className='font-normal text-[1rem] '> (optional) </Text>
                </Text>
                {/* <ImageUpload /> */}
                <FilePickerImages />

            </View>
            <View className='gap-2'>
                <Text className='font-bold text-[1.25rem]'>
                    What is this suspicious?
                </Text>
                <SelectField
                    placeholder="Select a reason"
                    value={reason}
                    onChange={setReason}
                />
            </View>
            <Text className='text-sm text-gray-500 text-center'>
                Reports are anonymous and secure. Read our <Link href={`/PrivacyPolicy` as any} className=" underline">Privacy Policy</Link>.
            </Text>

            <TouchableOpacity onPress={handleSubmit} className='bg-blue-700 rounded-lg p-3 items-center mt-4 mx-3'>
                <Text className='font-bold  text-white'>Submit Report</Text>
            </TouchableOpacity>
            <Link href={'/sources' as any} className='items-center mt-4 mb-8'>
                <Text className='text-blue-700 underline'>View Trusted Sources</Text>
            </Link>
            <Link href={'/SignUp' as any} className='items-center mt-4 mb-8'>
                <Text className='text-blue-700 underline'> SignUp </Text>
            </Link>
            <Link href={'/SignIn' as any} className='items-center mt-4 mb-8'>
                <Text className='text-blue-700 underline'>Sign In</Text>
            </Link>
        </SafeAreaView>
    )
}

export default report

const styles = StyleSheet.create({})