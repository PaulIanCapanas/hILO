import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import { auth } from "@/firebase/initializeFirebase";
import { useState, useMemo } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import GoogleSignIn from "@/components/GoogleSignIn";
import { Routes } from "@/enums/routes";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
    <View className="flex-1 items-center justify-center bg-slate-100">
      <View className="w-full max-w-md px-5 py-8 bg-gray-100 rounded-lg shadow-md justify-center items-center">
        <Text className="text-4xl mb-4">hILO</Text>
        <View className="mb-4">
          <Text className="mb-2">Enter your Email:</Text>
          <TextInput
            className="text-gray-900 border"
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View className="mb-4">
          <Text className="mb-2">Enter your Password:</Text>
          <TextInput
            className="text-gray-900 border"
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TouchableOpacity onPress={handleSubmit}>
          <Text className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
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
    </View>
  );
}
