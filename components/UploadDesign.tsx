import { View, TouchableOpacity, Text, Alert } from 'react-native'
import uploadDocument from '@/helpers/firebase/uploadDocument'
import { Collection } from '@/enums/collections'
import { auth } from '@/firebase/initializeFirebase'
import { Routes } from '@/enums/routes'
import { useRouter } from 'expo-router'
import { randomUUID } from 'expo-crypto';

interface UploadDesignProps {
  title: string
  description: string
  selectedDesignType: string
}

export default function UploadDesign({
  title,
  description,
  selectedDesignType,
}: UploadDesignProps) {
  const userID = auth.currentUser?.uid
  const router = useRouter()

  const generateRandomId = randomUUID()

  const handleUpload = async () => {
    if (!userID) {
      Alert.alert('Error', 'User  not authenticated')
      return
    }

    const designData = {
      key: generateRandomId,
      title: title,
      category: selectedDesignType,
      createdBy: userID,
      collaborators: [],
      sharedWith: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    try {
      const documentId = await uploadDocument(Collection.DESIGNS, designData)
      console.log('Success', `Design uploaded with ID: ${documentId}`)

      router.push({
        pathname: Routes.CANVAS,
        params: { key: generateRandomId, title, description, selectedDesignType },
      })
    } catch (error) {
      console.log('Upload Error', 'Failed to upload design')
      Alert.alert('Upload Error', 'Failed to upload design')
    }
  }

  return (
    <View>
      <TouchableOpacity
        onPress={handleUpload}
        style={{ padding: 10, alignItems: 'center', justifyContent: 'center' }}
      >
        <Text
          style={{
            backgroundColor: '#D7C9ED',
            borderRadius: 10,
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
        >
          Create Design
        </Text>
      </TouchableOpacity>
    </View>
  )
}
