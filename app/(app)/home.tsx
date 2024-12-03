import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native'
import { useRouter } from 'expo-router'
import Burger from '@/components/Burger'
import CategorySlider from '@/components/CategorySlider'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/initializeFirebase'
import queryDocument from '@/helpers/firebase/queryDocument'
import { Collection } from '@/enums/collections'

export default function Page () {
  const [isBurgerVisible, setIsBurgerVisible] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unregistered = onAuthStateChanged(auth, async user => {
      if (user) {
        try {
          const data = await queryDocument(Collection.USERS, 'uid', user.uid)
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

  function handleUsername () {
    const username = userData.name.split(' ')
    return username[0]
  }
  if (loading) {
    return (
      <View className='flex-1 items-center justify-center p-4'>
        <ActivityIndicator size='large' color='#65558F' />
      </View>
    )
  }

  function handleOpenBurger () {
    setIsBurgerVisible(true)
  }

  function handleCloseBurger () {
    setIsBurgerVisible(false)
  }

  const header = '../../assets/images/header.jpg'

  return (
    <View className='flex-1 bg-white'>
      <ImageBackground
        source={require(header)}
        style={{
          flex: 1,
          width: '100%',
          height: 60,
          position: 'absolute',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity onPress={handleOpenBurger}>
          <Text className='text-3xl text-white ml-3'>☰</Text>
        </TouchableOpacity>
      </ImageBackground>
      <View className='flex-1'>
        <View className='absolute top-20'>
          <View style={{ flex: 1, marginTop: 20 }}>
            <View
              style={{ flex: 1, justifyContent: 'center', paddingLeft: 15 }}
            >
              <Text
                style={{ color: '#4A4459', fontSize: 45, fontWeight: 'bold' }}
              >
                Welcome,
              </Text>
              <Text
                style={{ color: '#4A4459', fontSize: 40, fontWeight: 'bold' }}
              >
                {handleUsername()}!
              </Text>
            </View>
          </View>
          <View className='mt-5'>
            <CategorySlider />
          </View>
        </View>
      </View>
      <Burger isVisible={isBurgerVisible} onClose={handleCloseBurger} />
    </View>
  )
}
