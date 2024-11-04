import React from "react";
import { Button } from "react-native";
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { auth } from "@/firebase/initializeFirebase";
import uploadDocument from "@/helpers/firebase/uploadDocument";
import { useRouter } from "expo-router";
import { Routes } from "@/enums/routes";

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignIn() {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: process.env.EXPO_PUBLIC_CLIENT_ID,
  });
  const router = useRouter();

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          const userData = {
            name: userCredential.user.displayName,
            photo: userCredential.user.photoURL,
          };
          uploadDocument("User Account", userData)
            .then((docId) => {
              console.log("User data uploaded successfully with ID:", docId);
              router.push(Routes.HOME);
            })
            .catch((error) => {
              console.error("Error uploading user data:", error);
            });
          console.log("User signed in: ", userCredential.user);
        })
        .catch((error) => {
          console.error("Google Sign-In Error: ", error);
        });
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Sign in with Google"
      onPress={() => {
        promptAsync();
      }}
    />
  );
}