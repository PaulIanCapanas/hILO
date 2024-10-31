import React, { useEffect } from 'react';
import { Button } from 'react-native';
import { 
  signInWithCredential, 
  GoogleAuthProvider 
} from 'firebase/auth';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { auth } from '@/firebase/initializeFirebase'; 
import { makeRedirectUri } from 'expo-auth-session';


WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignInButton() {

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID,
    responseType: 'id_token',
    redirectUri: makeRedirectUri({
      scheme: 'hilo-app' 
    }),
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          console.log('User signed in:', userCredential.user);
        })
        .catch((error) => {
          console.error('Firebase Sign-In Error: ', error);
        });
    }
  }, [response]);

  return (
    <Button 
      disabled={!request} 
      title="Sign in with Google" 
      onPress={() => promptAsync()} 
    />
  );
};