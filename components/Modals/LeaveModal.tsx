import { View, Text, Modal, TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

interface LeaveModalProps {
  goBack: boolean;
  setGoBack: React.Dispatch<React.SetStateAction<boolean>>;
}

const LeaveModal: React.FC<LeaveModalProps> = ({ goBack, setGoBack }) => {
  return (
    <Modal visible={goBack} transparent animationType="slide">
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white p-6 rounded-xl items-center">
          <Text className="text-lg font-PoppinsBold">Warning!</Text>
          <Text className="mt-2 text-center font-PoppinsMedium text-base">
            You haven't learned all words in this level. {'\n'}
            <Text className="text-red-500 font-PoppinsBold">
              If you leave you will lost your progress!
            </Text>
          </Text>
          <View className="flex-row gap-4">
            <TouchableOpacity
              className="mt-4 bg-green-500 p-2 rounded-xl"
              onPress={() => {
                setGoBack(false);
              }}
            >
              <Text className="text-white text-lg font-PoppinsBold">Stay</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="mt-4 bg-green-500 p-2 rounded-xl"
              onPress={() => {
                setGoBack(false);
                router.back();
              }}
            >
              <Text className="text-white text-lg font-PoppinsBold">Leave</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LeaveModal;
