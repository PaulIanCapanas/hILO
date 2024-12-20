import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import queryDocument from '@/helpers/firebase/queryDocument'
import { Collection } from '@/enums/collections'

export default function CanvasPage () {
  const { key, title, description, selectedDesignType } = useLocalSearchParams<{
    key: string
    title: string
    description: string
    selectedDesignType: string
  }>()
  const [designData, setDesignData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDesignData = async () => {
      setLoading(true)
      try {
        const data = await queryDocument(Collection.DESIGNS, 'key', key)
        if (data.length > 0) {
          setDesignData(data[0])
        }
      } catch (error) {
        console.error('Error fetching design data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDesignData()
  }, [key])

  if (loading) {
    return (
      <View
        className='flex-1 items-center justify-center p-4'
        testID='loading-indicator'
      >
        <ActivityIndicator size='large' color='#65558F' />
      </View>
    )
  }

  function updatedAtToString () {
    const date = designData.updatedAt
    const dateString = date.toDate().toDateString()
    return dateString
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}</Text>
      <Text style={styles.label}>{selectedDesignType}</Text>
      <Text style={styles.label}>{updatedAtToString()}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
})
