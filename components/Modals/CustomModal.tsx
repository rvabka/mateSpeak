import { View, Text, Modal, TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

interface CustomModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description: string;
  extraStyles?: string;
  isRouter?: boolean;
}

const CustomModalProps: React.FC<CustomModalProps> = ({
  modalVisible,
  setModalVisible,
  title,
  description,
  extraStyles,
  isRouter = true
}) => {
  return (
    <Modal visible={modalVisible} transparent animationType="slide">
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white p-6 rounded-xl items-center">
          <Text className="text-lg font-PoppinsBold">{title}</Text>
          <Text className={`mt-2 text-center font-PoppinsMedium text-base ${extraStyles}`}>
            {description}
          </Text>
          <TouchableOpacity
            className="mt-4 bg-green-500 p-2 rounded-xl"
            onPress={() => {
              setModalVisible(false);
              isRouter && router.back();
            }}
          >
            <Text className="text-white text-lg font-PoppinsBold">Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModalProps;
