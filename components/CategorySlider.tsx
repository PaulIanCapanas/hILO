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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            color: '#4A4459',
            fontWeight: '500',
            marginBottom: 20
          }}
        >
          Create New Design
        </Text>
        <TouchableOpacity>
          <Text style={{color: '#65558F'}}>Show all</Text>
        </TouchableOpacity>
      </View>
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
    paddingVertical: 30,
  },
  scrollContainer: {
    paddingHorizontal: 15,
  },
  categoryBox: {
    backgroundColor: '#E8DEF8',
    width: 150,
    height: 60,
    borderRadius: 10,
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
