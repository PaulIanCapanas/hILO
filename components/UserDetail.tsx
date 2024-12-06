import { useState, useEffect } from 'react'
import { ActivityIndicator, Text, View, Image, Dimensions } from 'react-native'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/initializeFirebase'
import queryDocument from '@/helpers/firebase/queryDocument'
import { Collection } from '@/enums/collections';

const SCREEN_WIDTH = Dimensions.get('window').width
const MENU_WIDTH = SCREEN_WIDTH * 0.75

export default function UserDetail () {
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unregistered = onAuthStateChanged(auth, async user => {
      if (user) {
        try {
          const data = await queryDocument(Collection.USERS, 'uid', user.uid);
          if (data.length > 0) {
            setUserData(data[0])
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
        } finally {
          setLoading(false)
        }
      } else {
        setUserData(null)
        setLoading(false)
      }
    })

    return () => unregistered()
  }, [])

  if (loading) {
    return (
      <View
        style={{ width: MENU_WIDTH }}
        className='flex-1 items-center justify-center p-4'
        testID='loading-indicator'
      >
        <ActivityIndicator size='large' color='#65558F' />
      </View>
    )
  }

  const defaultDisplayPhoto = '../assets/images/blank-profile-picture.png'

  return (
    <View className='flex-1'>
        <View className='justify-center items-center'>
          {userData.photo ? (
            <Image
              testID='profile-picture'
              source={{ uri: userData.photo }}
              style={{ width: 100, height: 100, borderRadius: 50, marginTop: 20 }}
              className='mb-2'
            />
          ) : (
            <Image
              testID='profile-picture'
              source={require(defaultDisplayPhoto)}
              style={{ width: 100, height: 100, borderRadius: 50, marginTop: 20 }}
              className='mb-2'
            />
          )}
          <Text style={{fontSize: 20, fontWeight: 500, color: '#4A4459'}}>{userData.name}</Text>
        </View>
    </View>
  )
}
