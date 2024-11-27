import { useState, useEffect } from 'react'
import { Text, View, Image, Dimensions } from 'react-native'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/initializeFirebase'
import queryDocument from '@/helpers/firebase/queryDocument'

const SCREEN_WIDTH = Dimensions.get('window').width;
const MENU_WIDTH = SCREEN_WIDTH * 0.75;

export default function UserDetail() {
  const [userData, setUserData] = useState<any>(null)


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
          <View style={{marginLeft: 10, marginTop: 5}} className="mb-8">
            {userData.photo ? (
              <Image
                testID='profile-picture'
                source={{ uri: userData.photo }}
                style={{ width: 60, height: 60 }}
                className="rounded-full mb-2"
              />
            ) : (
              <Image
              testID='profile-picture'
                source={require(defaultDisplayPhoto)}
                style={{ width: 60, height: 60 }}
                className="rounded-full mb-2"
              />
            )}
            <Text className="text-lg font-bold text-gray-800">
              {userData.name}
            </Text>
          </View>
      </View>
    </View>
  )
}

