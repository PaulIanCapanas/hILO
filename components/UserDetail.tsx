import { useState, useEffect } from 'react'
import { TouchableOpacity, Text, View, Image } from 'react-native'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/initializeFirebase'
import queryDocument from '@/helpers/firebase/queryDocument'
import { useSession } from '@/contexts/AuthContext'

export default function UserDetail() {
  const [userData, setUserData] = useState<any>(null)
  const { logOut } = useSession()

  useEffect(() => {
    const unregistered = onAuthStateChanged(auth, async user => {
      if (user) {
        try {
          const data = await queryDocument('User Account', 'uid', user.uid)
          if (data.length > 0) {
            setUserData(data[0])
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
        }
      } else {
        setUserData(null)
      }
    })

    return () => unregistered()
  }, [])

  const handleLogout = () => {
    logOut()
  }

  if (!userData) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg">Loading user data...</Text>
      </View>
    )
  }

  const defaultDisplayPhoto = '../assets/images/blank-profile-picture.png'

  return (
    <View className="flex-1 p-4">
        <Image
          source={{ uri: userData.photo || defaultDisplayPhoto }}
          style={{ width: 70, height: 70 }}
          className="rounded-full"
        />
        <Text className="text-lg font-bold my-2">
          {userData.firstName && userData.lastName
            ? `${userData.firstName} ${userData.lastName}`
            : userData.name}
        </Text>
      <TouchableOpacity
        onPress={handleLogout}
        className="absolute bottom-4 left-4 bg-red-500 px-4 py-2 rounded-2xl"
      >
        <Text className="text-white font-semibold">Logout</Text>
      </TouchableOpacity>
    </View>
  )
}