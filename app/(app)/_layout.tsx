import { Text } from "react-native";
import { useRouter, Stack } from "expo-router";
import { Routes } from "@/enums/routes";

import { useSession } from "@/contexts/AuthContext";

export default function AppLayout() {
  const { session, isLoading } = useSession();
  const router = useRouter();

  if (isLoading) {
    return <Text>Loading...</Text>; //SplashScreen instead of this siguro?
  }

  if (!session) {
    return router.push(Routes.LOGIN);
  }

  return (
    <Stack/>
  );
}
