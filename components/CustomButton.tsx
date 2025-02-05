import { TouchableOpacity, Text } from 'react-native';
import React from 'react';

type CustomButtonProps = {
  text: string;
  handlePress: () => void;
  containterStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
};

export default function CustomButton({
  text,
  handlePress,
  containterStyles = '',
  textStyles = '',
  isLoading = false
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-customGreen rounded-xl min-h-[62px] w-full px-4 justify-center items-center ${containterStyles} ${
        isLoading ? 'opacity-50' : ''
      }`}
      disabled={isLoading}
    >
      <Text className={`text-white font-bold text-2xl ${textStyles}`}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
