import React from 'react'
import { Button } from 'react-native'
import {
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult
} from 'firebase/auth'
import { auth } from '../firebase/initializeFirebase'

export default function GoogleSignIn () {
  const provider = new GoogleAuthProvider()
  const handleGoogleSignIn = async () => {
    try {
      await signInWithRedirect(auth, provider)

      const result = await getRedirectResult(auth)
      if (result) {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential?.accessToken
        const user = result.user
        console.log('User info:', user)
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error)
    }
  }
  return <Button title='Sign in with Google' onPress={handleGoogleSignIn} />
}
