import { Text } from "react-native";
import { useEffect } from "react";
import { useRouter, Stack } from "expo-router";
import { Routes } from "@/enums/routes";

import { useSession } from "@/contexts/AuthContext";

export default function AppLayout() {
  const { session, isLoading } = useSession();
  const router = useRouter();

  if (isLoading) {
    return <Text>Loading...</Text>; //SplashScreen instead of this siguro?
  }

  useEffect(() => {
    if (!session) {
      router.push(`/${Routes.LOGIN}`);
    } else {
      router.push(`/${Routes.HOME}`);
    }
  }, [session]);

  return (
    <Stack>
      <Stack.Screen name={Routes.USERPROFILE} options={{ headerShown: false}} />
      <Stack.Screen name={Routes.HOME} options={{ headerShown: false }} />
    </Stack>
  );
}