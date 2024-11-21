import { useState, useEffect } from 'react'
import { TouchableOpacity, Text, View, Image, Dimensions } from 'react-native'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/initializeFirebase'
import queryDocument from '@/helpers/firebase/queryDocument'
import { useSession } from '@/contexts/AuthContext'

const SCREEN_WIDTH = Dimensions.get('window').width;
const MENU_WIDTH = SCREEN_WIDTH * 0.75;

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
      <View style={{ width: MENU_WIDTH }} className="flex-1 items-center justify-center p-4">
        <Text className="text-lg text-gray-600">Loading user data...</Text>
      </View>
    )
  }

  const defaultDisplayPhoto = '../assets/images/blank-profile-picture.png'

  return (
    <View style={{ width: MENU_WIDTH }} className="flex-1">
      <View className="flex-1">
          <View className="mb-8">
            {userData.photo ? (
              <Image
                source={{ uri: userData.photo }}
                style={{ width: 60, height: 60 }}
                className="rounded-full mb-2"
              />
            ) : (
              <Image
                source={require(defaultDisplayPhoto)}
                style={{ width: 60, height: 60 }}
                className="rounded-full mb-2"
              />
            )}
            <Text className="text-lg font-bold text-gray-800">
              {userData.firstName && userData.lastName
                ? `${userData.firstName} ${userData.lastName}`
                : userData.name || 'User'}
            </Text>
          </View>
      </View>
      <View className="p-6 items-center">
      <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-full"
          >
            <Text className="text-white font-semibold text-xs">Logout</Text>
          </TouchableOpacity>
      </View>
    </View>
  )
}

