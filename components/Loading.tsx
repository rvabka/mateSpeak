import { SafeAreaView, ActivityIndicator } from 'react-native';
import React from 'react';

const Loading = () => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center p-4 bg-primaryColor">
      <ActivityIndicator size="large" color="green" />
    </SafeAreaView>
  );
};

export default Loading;
