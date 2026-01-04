import { FilePicker } from '@/components/ui/file-picker'
import { Picker } from '@/components/ui/picker'
import { submitReport } from '@/lib/report.action'
import { FontAwesome5 } from '@expo/vector-icons'
import { Link } from 'expo-router'
import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Report = () => {
  const [image, setImage] = useState<any[]>([])
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined)
  const [description, setDescription] = useState<string>('')

  const handleSubmit = async () => {
    if (!description || !selectedValue) {
      alert('Please fill all required fields')
      return
    }

    try {
      const firstImage = image.length > 0 ? image[0] : undefined
      console.log('Submitting report with:', { description, reason: selectedValue, image: firstImage })

      const result = await submitReport({
        description,
        reason: selectedValue,
        image: firstImage,
      })

      console.log('Report submission result:', result)
      alert('Report submitted successfully')

      setDescription('')
      setSelectedValue(undefined)
      setImage([])
    } catch (error) {
      console.error(error)
      alert('Failed to submit report')
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View className="mx-2 gap-6">
          <Text className="text-slate-600 text-base font-normal leading-normal">
            See something suspicious? Let Fact-checkers know. Your report helps
            keep your democracy transparent.
          </Text>

          {/* Description */}
          <View className="gap-2">
            <Text className="font-bold text-[1.25rem]">What did you see?</Text>
            <TextInput
              placeholder="Paste the link or the headline here..."
              placeholderTextColor="#000000"
              multiline
              numberOfLines={4}
              className="w-full min-h-36 rounded-lg bg-green-100 border-slate-500 p-4 text-base font-medium"
              style={{ borderWidth: 2 }}
              value={description}
              onChangeText={setDescription}
            />
          </View>

          {/* Evidence */}
          <View className="gap-2">
            <Text className="font-bold text-[1.25rem]">
              Evidence <Text className="font-normal text-[1rem]">(optional)</Text>
            </Text>

            <FilePicker
              variant="ghost"
              style={{
                borderWidth: 2,
                borderStyle: 'dashed',
                borderColor: '#000000',
                borderRadius: 8,
                backgroundColor: 'transparent',
              }}
              placeholder="Select your files"
              placeholderColor="#64748b"
              fileType="all"
              multiple
              maxFiles={5}
              onFilesSelected={setImage}
              onError={(e) => console.error(e)}
            />
          </View>

          {/* Reason */}
          <View className="gap-2">
            <Text className="font-bold text-[1.25rem]">
              Why is this suspicious?
            </Text>

            <Picker
              variant="outline"
              inputStyle={{ color: '#000000', fontWeight: '500' }}
              options={[
                { label: 'Misinformation', value: 'misinfo' },
                { label: 'Fake News', value: 'fake' },
                { label: 'Hate Speech', value: 'hate' },
                { label: 'Other', value: 'other' },
              ]}
              value={selectedValue}
              onValueChange={setSelectedValue}
              placeholder="Select a reason..."
            />
          </View>

          <Text className="text-sm text-gray-500 text-center mt-2">
            <FontAwesome5 name="lock" size={18} color="#6b7280" /> Reports are
            anonymous and secure. Read our{' '}
            <Link href={'/privacyPolicy' as any} className="underline">
              Privacy Policy
            </Link>
            .
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.submitButton}
          activeOpacity={0.8}
        >
          <Text style={styles.submitText}>Submit Report</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Report

const styles = StyleSheet.create({
  scrollContent: {
    padding: 12,
    paddingBottom: 120,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  submitButton: {
    backgroundColor: '#1d4ed8',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
})
