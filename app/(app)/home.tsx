import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Routes } from "@/enums/routes";
import Burger from "@/components/Burger";
import Greetings from '@/components/Greetings';
import CategorySlider from '@/components/CategorySlider';

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
      <View className="flex-1">
        <View className='absolute top-10'>
        <Greetings/>
        <View className='mt-5'>
        <CategorySlider/>
        </View>
        </View>
      </View>
      <Burger isVisible={isBurgerVisible} onClose={handleCloseBurger} />
    </View>
  );
}

