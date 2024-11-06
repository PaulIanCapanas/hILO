import { useState, useEffect } from 'react';
import { Button, Text, View, Image } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/initializeFirebase'; 
import queryDocument from '@/helpers/firebase/queryDocument'; 
import { useSession } from '@/contexts/AuthContext';


export default function UserProfile() {
  const [userData, setUserData] = useState<any>(null); 
  const { logOut } = useSession()

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

  const handleLogout = () => {
    logOut(); 
  };

  if (!userData) {
    return <View><Text>Loading user data...</Text></View>; 
  }

  return (
    <View>
         <Image
        source={{ uri: userData.photo }}
        style={{ width: 100, height: 100 }}
      />
      <Text>
        Logged in as: {userData.firstName && userData.lastName ? `${userData.firstName} ${userData.lastName}` : userData.name}
      </Text>
      <View className='items-center max-w-md rounded-lg bg-red-500'>
      <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
};