import React, { useState, useEffect } from "react";
import { auth } from "@/firebase/initializeFirebase";
import { View, Text, Image } from "react-native";
import queryDocument from "@/helpers/firebase/queryDocument";
import { useRouter } from "expo-router";
import { Routes } from "@/enums/routes";

interface UserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  name?: string;
  photo?: string;
}

export default function UserProfileScreen() {
  const [user, setUser] = useState<UserData>({});
  const router = useRouter();

  useEffect(() => {
    if (!auth.currentUser) {
      router.push(Routes.LOGIN);
    }
    
    const fetchUserData = async () => {
      const data = await queryDocument("User Account", "first", "");
      if (data.length > 0) {
        setUser(data[0]);
        console.log(user);
      }
    };
    fetchUserData();
  }, []);

  return (
    <View>
      <Text className="text-black">
        {user.firstName && user.lastName
          ? `${user.firstName} ${user.lastName}`
          : user.name}
      </Text>
      <Text className="">
        Email: {user.email}
      </Text>
      <Image
        source={{ uri: user.photo }}
        style={{ width: 100, height: 100 }}
      />
    </View>
  );
}
