import { View, Text, TouchableOpacity, FlatList, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../context/GlobalProvider';
import { useRootNavigationState, useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ToRepeat = () => {
  const rootNavigationState = useRootNavigationState();
  const { user } = useGlobalContext();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [savedWords, setSavedWords] = useState([
    { id: '1', word: 'apple', translation: 'jabłko' },
    { id: '2', word: 'house', translation: 'dom' },
    { id: '3', word: 'car', translation: 'samochód' }
  ]);

  useEffect(() => {
    if (!user && rootNavigationState?.key) {
      router.replace('/');
    }
  }, [user, rootNavigationState?.key, router]);

  return (
    <SafeAreaView className="flex-1 bg-primaryColor p-4">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-white text-2xl font-PoppinsBold">Your Words</Text>
        <TouchableOpacity
          className="p-3 bg-customGreen rounded-lg flex-row items-center"
          onPress={() => setShowModal(true)}
        >
          <Icon name="menu" size={24} color="white" />
          <Text className="text-white text-lg ml-2 font-PoppinsMedium">
            View Words
          </Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showModal} transparent animationType="slide">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-xl w-4/5">
            <Text className="text-lg font-PoppinsBold text-center mb-4">
              Saved Words
            </Text>
            {savedWords.length > 0 ? (
              <FlatList
                data={savedWords}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <View className="p-3 bg-gray-200 rounded-lg mb-2 flex-row justify-between">
                    <Text className="text-black text-lg font-PoppinsMedium">
                      {item.word}
                    </Text>
                    <TouchableOpacity>
                      <Icon name="delete" size={24} color="red" />
                    </TouchableOpacity>
                  </View>
                )}
              />
            ) : (
              <Text className="text-center text-gray-600">
                No words saved yet
              </Text>
            )}
            <TouchableOpacity
              className="mt-4 bg-green-500 p-2 rounded-xl"
              onPress={() => setShowModal(false)}
            >
              <Text className="text-white text-lg font-PoppinsBold text-center">
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ToRepeat;
