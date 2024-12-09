import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Routes } from '@/enums/routes'


export default function CreateNewDesign () {
  const { designType } = useLocalSearchParams<{
    designType: string
  }>()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedDesignType, setSelectedDesignType] = useState(designType)
  const router = useRouter()

  useEffect(() => {
    setSelectedDesignType(designType);
  }, [designType]);

  function navToCanvasPage () {
    router.push({
        pathname: Routes.CANVAS,
        params: { title, description, selectedDesignType }
    })
  }

   const header = '../../assets/images/header.jpg'

  return (
    <ImageBackground
    source={require(header)}
    style={{
      flex: 1,
      width: '100%',
      justifyContent: 'center',
    }}
  >
    <View style={styles.container}>
      <Text style={styles.header}>Create New Design</Text>
      <View style={styles.table}>
      <TextInput
        style={styles.input}
        placeholder='Untitled'
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder='Description'
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <View style={styles.picker}>
      <Picker
        selectedValue={selectedDesignType}
        onValueChange={itemValue => setSelectedDesignType(itemValue)}
        
      >
        <Picker.Item label='Plain' value='Plain' />
        <Picker.Item label='Pattern' value='Pattern' />
        <Picker.Item label='Checkered' value='Checkered' />
        <Picker.Item label='Others' value='Others' />
      </Picker>
      </View>
      <TouchableOpacity onPress={navToCanvasPage} style={{padding: 10, alignItems: 'center', justifyContent: 'center',}}>
        <Text style={{backgroundColor: '#D7C9ED', borderRadius: 10, paddingHorizontal: 20, paddingVertical: 10}}>Create</Text>
      </TouchableOpacity>
      </View>
    </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    color: '#ffffff',
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  table: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    marginBottom: 15,
    borderColor: 'gray',
    borderWidth: 1,
    justifyContent: 'center'
  },
})
