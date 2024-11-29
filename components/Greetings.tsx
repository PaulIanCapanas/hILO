import { useState, useEffect } from 'react';
import { View, Text} from "react-native";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/initializeFirebase';
import queryDocument from '@/helpers/firebase/queryDocument';

export default function Greetings() {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const unregistered = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const data = await queryDocument('User Account', 'uid', user.uid);
          if (data.length > 0) {
            setUserData(data[0]);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUserData(null);
      }
    });

    return () => unregistered();
  }, []);

  if (!userData) {
    return (
      <View
        className="flex-1 items-center justify-center p-4"
      >
        <Text className="text-lg text-gray-600">Loading user data...</Text>
      </View>
    );
  }

  function handleUsername () {
    const username = (userData.name).split(" ")
    return username[0]
  }
  return (
    <View className="flex-1 bg-white mt-20">
      <View className="flex-1 justify-center px-4">
        <Text className="text-5xl font-bold mb-4" style={{color: '#4A4459'}}>Welcome</Text>
        <Text className="text-5xl font-bold mb-4" style={{color: '#4A4459'}}>{handleUsername()}!</Text>
      </View>
    </View>
  );
}

