import { ScrollView, View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import { useState, useEffect, useMemo } from "react";
import { auth } from "@/firebase/initializeFirebase";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import uploadDocument from "@/helpers/firebase/uploadDocument";
import { useRouter } from "expo-router";
import { Routes } from "@/enums/routes";
import queryDocument from "@/helpers/firebase/queryDocument";

export default function SignupScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    const unregistered = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const existingUsers = await queryDocument(
          "User Account",
          "uid",
          user.uid
        )

        if (existingUsers.length === 0) {
          const userData = {
            firstName: firstName,
            lastName: lastName,
            uid: user.uid,
          }
          uploadDocument("User Account", userData)
            .then((documentId) => {
              console.log("User data uploaded successfully with ID:", documentId)
              router.push(`/${Routes.HOME}`);
            })
            .catch((error) => {
              console.log("Error uploading user data:", error)
            })
        } else {
          console.log("User data already exists.")
        }
      }
    })
    return () => unregistered()
  }, [firstName, lastName])

  const validateForm = useMemo(() => {
    return () => {
      if (!firstName.trim()) {
        Alert.alert("First name is required");
        return false;
      }

      if (!lastName.trim()) {
        Alert.alert("Last name is required");
        return false;
      }
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
  }, [firstName, lastName, email, password]);

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Signed up successfully!");
    } catch (error) {
      Alert.alert("Registration failed!");
    }
  };

  return (
    <View className="h-screen">
      <ScrollView className="bg-slate-100">
        <View className="w-full max-w-md px-5 py-8 bg-gray-100 rounded-lg shadow-md">
          <Text className="text-4xl mb-4">hILO</Text>
          <View className="mb-4">
            <Text>First Name:</Text>
            <TextInput
              className="text-gray-900 border"
              placeholder="First Name"
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              autoCapitalize="words"
            />
          </View>
          <View className="mb-4">
            <Text>Last Name:</Text>
            <TextInput
              className="text-gray-900 border"
              placeholder="Last Name"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              autoCapitalize="words"
            />
          </View>
          <View className="mb-4">
            <Text>Enter your Email</Text>
            <TextInput
              className="text-gray-900 border"
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
            />
          </View>
          <View className="mb-4">
            <Text>Enter your Password</Text>
            <TextInput
              className="text-gray-900 border"
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
          </View>
          <TouchableOpacity onPress={handleSubmit}>
            <Text className="bg-blue-500 text-white text-center px-4 py-2 rounded">
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
