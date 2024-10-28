import { View, Text, Button, TextInput, Alert, StyleSheet} from "react-native"
import { auth } from "@/firebase/initializeFirebase"
import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import GoogleSignIn from "@/components/GoogleSignIn"

export default function LoginScreen() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const handleSubmit = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      Alert.alert(`User has signed in!, Welcome ${email}`)
    } catch (error) {
      Alert.alert("User sign in has failed")
    }
  }

  return (
    <View>
      <View> 
        <Text>Email:</Text>
        <TextInput placeholder="Email" value={email} onChangeText={(text) => setEmail(text)}/>
      </View>
      <View className="">
        <Text>Password:</Text>
        <TextInput placeholder="Password" value={password} onChangeText={(text) => setPassword(text)}/>
      </View>
      <Button title="Login" onPress={handleSubmit}/>
      <View className="flex justify-center text-gray-700">
        <Text>Or</Text>
      </View>
      <View>
        <GoogleSignIn />
      </View>
    </View>
  )
}