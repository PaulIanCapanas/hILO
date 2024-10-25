import { View, Text, Button, TextInput, Alert } from "react-native";
import { useState, useEffect, useCallback } from 'react'
import { auth } from "@/firebase/initializeFirebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import uploadDocument from "@/helpers/firebase/uploadDocument";

export default function SignupScreen() {
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  
  const handlesubmit = async () => {
    try {
      await uploadDocument("User Account", {
        first: firstName,
        last: lastName
      })
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      Alert.alert(`Signed up successfully: ${userCredential}`)
    } catch (error) {
      Alert.alert("Registration failed!")
    }
  }
  
  return (
    <View>
      <Text>Sign Up</Text>
      <View>
        <Text>Enter your First Name</Text>
        <TextInput placeholder="First Name" value={firstName} onChangeText={(text) => setFirstName(text)}/>
      </View>
      <View>
        <Text>Enter your Last Name</Text>
        <TextInput placeholder="Last Name" value={lastName} onChangeText={(text) => setLastName(text)}/>
      </View>
      <View>
        <Text>Enter your Email</Text>
        <TextInput placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} keyboardType="email-address"/>
      </View>
      <View>
        <Text>Enter your Password</Text>
        <TextInput placeholder="Password" value={password} onChangeText={(text) => setPassword(text)} secureTextEntry/>
      </View>
      <Button title="Register" onPress={handlesubmit} />
    </View>
  )
}                        