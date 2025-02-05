import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import React from 'react';
import { useRouter } from 'expo-router';

interface BackButtonProps {
  onBackPress: () => boolean;
}

const BackButton = ({ onBackPress }: BackButtonProps) => {
  const router = useRouter();

  return (
    <View>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 0,
          left: -190,
          padding: 8,
          zIndex: 10
        }}
        onPress={onBackPress}
      >
        <Icon name="left" size={36} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;
