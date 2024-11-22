import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Routes } from "@/enums/routes";
import Burger from "@/components/Burger";

export default function Page() {
  const router = useRouter();
  const [isBurgerVisible, setIsBurgerVisible] = useState(false);

  function handleOpenBurger() {
    setIsBurgerVisible(true);
  }

  function handleCloseBurger() {
    setIsBurgerVisible(false);
  }

  return (
    <View className="flex-1 bg-white">
      <View className="absolute top-6 left-4 z-10">
        <TouchableOpacity onPress={handleOpenBurger}>
          <Text className="text-3xl">☰</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-5xl font-bold mb-4 text-center">Welcome to hILO!</Text>
        <Text className="text-xl text-gray-600 mb-8 text-center">
          Weaving connections: Inspiring the future of Iloilo Woven Products
        </Text>
      </View>
      <Burger isVisible={isBurgerVisible} onClose={handleCloseBurger} />
    </View>
  );
}

