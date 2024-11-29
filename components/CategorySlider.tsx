import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

const categories = [
  { id: '1', title: 'Plain' },
  { id: '2', title: 'Pattern' },
  { id: '3', title: 'Checkered' },
  { id: '4', title: 'Others' },
]

export default function CategorySlider () {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryBox}>
      <Text style={styles.categoryText}>{item.title}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 22, color: '#4A4459', paddingHorizontal: 15,  }}>
        Create New Design
      </Text>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
  },
  scrollContainer: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  categoryBox: {
    backgroundColor: '#E8DEF8',
    padding: 10,
    width: 150,
    height: 150,
    borderRadius: 20,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    fontWeight: 'semibold',
    fontSize: 20,
    color: '#4A4459',
  },
})
