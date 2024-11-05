import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import queryDocument from "@/helpers/firebase/queryDocument";

interface UserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  name?: string;
  photo?: string;
}

export default function UserProfileScreen() {
  const [user, setUser] = useState<UserData>({});

  useEffect(() => {
      const fetchUserData = async () => {
      const data = await queryDocument("User Account", "firstName", "");
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
        Name: {user.firstName && user.lastName
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
