import { Text } from "react-native";
import { useSession } from "@/contexts/AuthContext";
import { useRouter, Stack } from "expo-router";
import { Routes } from "@/enums/routes";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export default function AppLayout() {
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

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Stack>
      <Stack.Screen name={Routes.HOME} options={{ headerShown: false }} />
    </Stack>
  );
}