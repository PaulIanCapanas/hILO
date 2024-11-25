import { ScrollView, View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import { useState, useMemo } from "react";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import GoogleSignIn from "@/components/GoogleSignIn";
import { Routes } from "@/enums/routes";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const auth = getAuth();

  const validateForm = useMemo(() => {
    return () => {
      if (!email.trim()) {
        Alert.alert("Email is required");
        return false;
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        Alert.alert("Invalid email format");
        return false;
      }

      if (!password.trim()) {
        Alert.alert("Password is required");
        return false;
      } else if (password.length < 8) {
        Alert.alert("Password must at least be 8 characters long");
        return false;
      }
      return true;
    };
  }, [email, password]);

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert(`User has signed in!, Welcome ${email}`);
      router.push(`/${Routes.HOME}`);
    } catch (error) {
      Alert.alert("User sign in has failed");
    }
  };

  return (
    <View className="h-screen">
       <ScrollView className="bg-white">
        <View className="w-full max-w-md px-5 py-64 inset-0 justify-center align-middle">
          <Text className="text-4xl mb-4 text-center">hILO</Text>
          <View className="mb-4">
            <Text className="mb-2">Email:</Text>
            <TextInput
              className="h-12 text-gray-900 border rounded-md px-2"
              placeholder="johndoe@email.com"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View className="mb-6">
            <Text className="mb-2">Password:</Text>
            <TextInput
              className="h-12 text-gray-900 border rounded-md px-2"
              placeholder="********"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
          </View>
          <TouchableOpacity 
            onPress={handleSubmit}
            className="h-12 items-center justify-center bg-blue-500 px-4 py-2 rounded-lg mb-4"
          >
            <Text className="text-white text-center">
              Login
            </Text>
          </TouchableOpacity>
          <View className="mb-4 justify-center items-center">
            <Text className="text-gray-500">Or</Text>
          </View>
          <View className="mb-4">
            <GoogleSignIn />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
