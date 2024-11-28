import { Text, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Routes } from "@/enums/routes";
import { useSession } from "@/contexts/AuthContext";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function Page() {
  const { session, isLoading } = useSession();
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      if (!isLoading) {
        if (!session) {
          router.replace(`/${Routes.LOGIN}`);
        } else {
          router.replace(`/${Routes.HOME}`);
        }
      }
    }, [session, isLoading])
  );

  return (
    <View className="flex-1 bg-gray-100">
      <Stack.Screen options={{ headerShown: false }} />
      <Text>Loading...</Text>
    </View>
  );
}