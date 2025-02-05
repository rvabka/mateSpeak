import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import * as Font from 'expo-font';

const loadFonts = () => {
  return Font.loadAsync({
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf')
  });
};

interface FormFieldsProps {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
  styles?: object;
  [key: string]: any;
}

export default function FormFields({
  title,
  value,
  placeholder,
  handleChangeText,
  styles,
  ...props
}: FormFieldsProps) {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  return (
    <View className="flex justify-center items-center w-screen space-y-2 px-3 mb-3">
      <Text className="text-lg text-white font-PoppinsMedium">{title}</Text>
      <View className="flex-row justify-center items-center border-2 border-customGreen w-full h-16 px-4 mb-4 bg-black-100 rounded-2xl">
        <TextInput
          className="flex-1 font-PoppinsMedium text-base placeholder:text-gray-400 text-white"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !passwordVisible}
          {...props}
        />
        {title === 'Password' && (
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Text className="text-white">
              {passwordVisible ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
