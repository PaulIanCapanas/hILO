import { useEffect } from "react"
import { Image, View, TouchableOpacity, Text } from "react-native";
import {
  signInWithCredential,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { auth } from "@/firebase/initializeFirebase";
import { Routes } from "@/enums/routes";
import { useRouter } from "expo-router";
import uploadDocument from "@/helpers/firebase/uploadDocument";
import queryDocument from "@/helpers/firebase/queryDocument";

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignIn() {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: process.env.EXPO_PUBLIC_CLIENT_ID,
  });
  const router = useRouter();

  useEffect(() => {
    const unregistered = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const existingUsers = await queryDocument(
          "User Account",
          "uid",
          user.uid
        );

        if (existingUsers.length === 0) {
          const userData = {
            uid: user.uid,
            name: user.displayName,
            photo: user.photoURL,
          };
          uploadDocument("User Account", userData)
            .then((docId) => {
              console.log("User data uploaded successfully with ID:", docId);
            })
            .catch((error) => {
              console.error("Error uploading user data:", error);
            });
        } else {
          console.log("User data already exists.");
        }
      }
    });
    return () => unregistered();
  }, []);

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      // handleNavigate();
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          console.log("User signed in: ", userCredential.user);
          router.push(`/${Routes.HOME}`);
        })
        .catch((error) => {
          console.error("Google Sign-In Error: ", error);
        });
    }
  }, [response]);

  return (
   <View className="w-full">
      <TouchableOpacity
        disabled={!request}
        className="w-full flex-row items-center justify-center space-x-2 rounded-lg bg-white border border-gray-200 py-3 px-4"
        onPress={() => {
          promptAsync();
        }}
      >
        <Image
          source={require("../assets/images/google-logo.png")}
          style={{ width: 20, height: 20 }}
          className="mr-2"
        />
        <Text className="text-gray-700 text-base font-medium">Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
}
