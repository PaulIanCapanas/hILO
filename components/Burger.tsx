import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import UserDetail from './UserDetail';
import { useSession } from '@/contexts/AuthContext';
import Modal from 'react-native-modal';

const SCREEN_WIDTH = Dimensions.get('window').width;
const MENU_WIDTH = SCREEN_WIDTH * 0.75;

export default function BurgerModal({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) {
  const { logOut } = useSession();

  function handleLogOut() {
    logOut();
    onClose && onClose();
  }

  return (
    <Modal
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      isVisible={isVisible}
      useNativeDriver={true}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      style={{ margin: 0 }}
    >
      <SafeAreaView className="flex-1">
        <View className="flex-1 flex-row justify-end">
          <View
            className=" flex-1"
            style={{
              backgroundColor: '#E8DEF8',
              width: MENU_WIDTH,
              shadowColor: '#000',
              shadowOffset: {
                width: -2,
                height: 0,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <View className="p-4 border-b border-gray-200">
              <TouchableOpacity
                testID="close-button"
                style={{ padding: 2, marginBottom: 2 }}
                onPress={onClose}
              >
                <Text className="text-gray-600 text-lg">✕</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-1 justify-center items-center">
              <UserDetail />
            </View>
            <View className="p-6 items-center mb-5 flex ">
              <TouchableOpacity
                onPress={handleLogOut}
                style={{
                  backgroundColor: '#D7C9ED',
                  borderRadius: 10,
                  paddingHorizontal: 30,
                  paddingVertical: 10,
                  marginBottom: 30,
                }}
              >
                <Text className="text-black font-semibold text-xs">Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={{ width: SCREEN_WIDTH - MENU_WIDTH }}
            className="bg-black/50"
            onPress={onClose}
            activeOpacity={1}
            testID="modal-overlay"
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
}
