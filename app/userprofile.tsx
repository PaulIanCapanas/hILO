import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import queryDocument from '@/helpers/firebase/queryDocument';

interface UserData {
  first?: string;
  last?: string;
  name?: string;
  photo?: string;
}

export default function UserProfile() {
  const [userData, setUserData] = useState<UserData>({});

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await queryDocument('User Data', 'uid', '');
      if (data.length > 0) {
        setUserData(data[0]);
      }
    };
    fetchUserData();
  }, []);

  return (
    <View>
      <Text className="text-black">
        {userData.first && userData.last ? (
          `${userData.first} ${userData.last}`
        ) : (
          userData.name
        )}
      </Text>
      <Image source={{ uri: userData.photo }} style={{ width: 100, height: 100 }} />
    </View>
  );
}
