import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useLocalSearchParams } from 'expo-router'

export default function CanvasPage() {
  const { title, description, selectedDesignType } = useLocalSearchParams<{
    title: string
    description: string
    selectedDesignType: string
  }>();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Canvas Page</Text>
      <Text style={styles.label}>Title: {title}</Text>
      <Text style={styles.label}>Description: {description}</Text>
      <Text style={styles.label}>Design Type: {selectedDesignType}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
})