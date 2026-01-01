import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'


export default function ImageUpload() {
  const [image, setImage] = useState<string | null>(null)

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const removeImage = () => {
    setImage(null)
  }

  return (
    <View style={styles.container}>
      {image ? (
        <View style={styles.imageWrapper}>
          <Image source={{ uri: image }} style={styles.preview} />

          {/* ❌ Cross Button */}
          <TouchableOpacity style={styles.closeButton} onPress={removeImage}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-image-plus-icon lucide-image-plus"><path d="M16 5h6" /><path d="M19 2v6" /><path d="M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /><circle cx="9" cy="9" r="2" /></svg> */}
          <Ionicons name="image-outline" size={24} color="#6b7280" />

          <Text style={styles.text}>
            Upload a screenshot if you have one.
          </Text>

          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Select Image</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#6b7280',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: '#111827',
    fontWeight: '600',
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
  },
  preview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#000',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: '#fff',
    fontSize: 18,
    lineHeight: 18,
  },
})

