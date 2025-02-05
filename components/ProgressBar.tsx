import React, { useState } from 'react';
import { View, Text } from 'react-native';
import * as Progress from 'react-native-progress';

interface ProgressBarProps {
  learnedWords: number;
  totalWords: number;
}

const ProgressBar = ({ learnedWords, totalWords }: ProgressBarProps) => {
  return (
    <View className="mt-24">
      <Text className="mb-2 text-white text-lg tracking-wide  font-PoppinsMedium">
        {learnedWords} / {totalWords} learned{' '}
        <Text className="font-PoppinsBold text-customGreen tracking-wide text-lg ">
          words 🤓
        </Text>
      </Text>
      <Progress.Bar
        progress={learnedWords / totalWords}
        width={350}
        height={15}
        color="#4CAF50"
        borderRadius={10}
      />
    </View>
  );
};

export default ProgressBar;
