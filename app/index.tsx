import { Text, View, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Routes } from "@/enums/routes";

export default function Page() {
  const router = useRouter();

  function handleNavigateToLogin() {
    router.push(`/${Routes.LOGIN}`);
  }
  function handleNavigateToSignUp() {
    router.push(`/${Routes.SIGNUP}`);
  }

  return (
    <View className="flex-1 bg-gray-100">
      <Stack.Screen options={{ headerShown: false }} />
      
      <View className="absolute top-12 right-4 flex-row">
        <TouchableOpacity
          onPress={handleNavigateToLogin}
          className="bg-blue-500 px-4 py-2 rounded-lg mr-2"
        >
          <Text className="text-white font-semibold">Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNavigateToSignUp}
          className="bg-green-500 px-4 py-2 rounded-lg"
        >
          <Text className="text-white font-semibold">Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 justify-center items-center">
      <Text className="text-4xl font-bold mb-5">Welcome to hILO!</Text>
        
        <TouchableOpacity
          onPress={handleNavigateToLogin}
          className="bg-purple-600 px-8 py-3 rounded-full"
        >
          <Text className="text-white font-semibold text-lg">Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}