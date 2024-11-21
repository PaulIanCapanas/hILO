import { 
  View, 
  TouchableOpacity, 
  Text, 
  Modal, 
  Dimensions,
  SafeAreaView,
} from 'react-native';
import UserDetail from './UserDetail';

const SCREEN_WIDTH = Dimensions.get('window').width;
const MENU_WIDTH = SCREEN_WIDTH * 0.75;

export default function BurgerModal({ 
  isVisible, 
  onClose 
}: { 
  isVisible: boolean, 
  onClose: () => void 
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1">
        <View className="flex-1">
          <View 
            className="bg-white flex-1" 
            style={{ 
              width: MENU_WIDTH,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <View className="p-4 border-b border-gray-200">
              <TouchableOpacity
                testID='close-button'
                className="self-end p-2 mb-2" 
                onPress={onClose}
              >
                <Text className="text-gray-600 text-lg">✕</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-1">
              <UserDetail />
            </View>
          </View>
          <TouchableOpacity 
            style={{ width: SCREEN_WIDTH - MENU_WIDTH }}
            className="bg-black/50"
            onPress={onClose}
            activeOpacity={1}
            testID='modal-overlay'
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
}

