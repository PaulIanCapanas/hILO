import {
  ScrollView,
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  reload,
  signOut,
} from 'firebase/auth';
import uploadDocument from '@/helpers/firebase/uploadDocument';
import { useRouter } from 'expo-router';
import { Routes } from '@/enums/routes';
import queryDocument from '@/helpers/firebase/queryDocument';

export default function SignupScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const auth = getAuth();
  const [waitingForVerification, setWaitingForVerification] =
    useState<boolean>(false);

  const validateForm = useMemo(() => {
    return () => {
      if (!firstName.trim()) {
        Alert.alert('First name is required');
        return false;
      }

      if (!lastName.trim()) {
        Alert.alert('Last name is required');
        return false;
      }
      if (!email.trim()) {
        Alert.alert('Email is required');
        return false;
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        Alert.alert('Invalid email format');
        return false;
      }

      if (!password.trim()) {
        Alert.alert('Password is required');
        return false;
      } else if (password.length < 8) {
        Alert.alert('Password must at least be 8 characters long');
        return false;
      }

      return true;
    };
  }, [firstName, lastName, email, password]);

  function backToLogin() {
    return router.push(`/${Routes.LOGIN}`);
  }

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await sendEmailVerification(userCredential.user);
      setWaitingForVerification(true);
      await signOut(auth);
      Alert.alert(
        'Verification Required',
        'A verification email has been sent. Please check your inbox and verify your email before logging in.',
        [{ text: 'OK', onPress: () => backToLogin() }],
      );
      backToLogin();
    } catch (error: any) {
      const errorCode = error.code;
      let errorMessage = 'Registration failed';

      switch (errorCode) {
        case 'auth/email-already-in-use':
          errorMessage = 'Email is already registered';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Operation not allowed';
          break;
      }
      Alert.alert('Registration Error', errorMessage);
    }
  };

  const uploadUserData = useCallback(
    async (user: any) => {
      try {
        const existingUsers = await queryDocument(
          'User Account',
          'uid',
          user.uid,
        );
        if (existingUsers.length === 0) {
          const userData = {
            name: `${firstName} ${lastName}`,
            uid: user.uid,
            verified: true,
          };

          const documentId = await uploadDocument('User Account', userData);
          console.log('User data uploaded successfully with ID:', documentId);
        } else {
          console.log('User data already exists.');
        }
      } catch (error) {
        console.error('Error uploading user data:', error);
        Alert.alert('Registration Error', 'Could not complete registration');
      }
    },
    [firstName, lastName, router],
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await reload(user);
        if (user.emailVerified) {
          await uploadUserData(user);
          setWaitingForVerification(false);
        } else if (waitingForVerification) {
          Alert.alert(
            'Verify Your Email',
            'Please check your email and click the verification link. If you have verified, try logging in again.',
            [{ text: 'OK' }],
          );
        }
      }
    });
    return () => unsubscribe();
  }, [waitingForVerification, uploadUserData]);

  return (
    <View className="h-screen">
      <ScrollView className="bg-slate-100">
        <View className="w-full max-w-md px-5 py-64 bg-gray-100 rounded-lg shadow-md">
          <Text className="text-4xl mb-4 text-center">hILO</Text>
          <View className="mb-4">
            <Text className="mb-2">First Name:</Text>
            <TextInput
              className="h-12 text-gray-900 border rounded-md px-2"
              placeholder="John Matthew"
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              autoCapitalize="words"
            />
          </View>
          <View className="mb-4">
            <Text className="mb-2">Last Name:</Text>
            <TextInput
              className="h-12 text-gray-900 border rounded-md px-2"
              placeholder="Doe"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              autoCapitalize="words"
            />
          </View>
          <View className="mb-4">
            <Text className="mb-2">Email</Text>
            <TextInput
              className="h-12 text-gray-900 border rounded-md px-2"
              placeholder="johndoe@email.com"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
            />
          </View>
          <View className="mb-4">
            <Text>Password</Text>
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
              {waitingForVerification ? 'Verification Pending' : 'Register'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
