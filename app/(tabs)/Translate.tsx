import { View, Text, TouchableOpacity, TextInput, Modal } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../context/GlobalProvider';
import { useRootNavigationState, useRouter } from 'expo-router';
import translateText from '../../api/libreTranslate';
import Icon from 'react-native-vector-icons/AntDesign';
import { debounce } from 'lodash';
import { addOwnUserWords } from '@/lib/appwrite';

const Translate = () => {
  const rootNavigationState = useRootNavigationState();
  const { user } = useGlobalContext();
  const router = useRouter();

  const [englishWord, setEnglishWord] = useState<string>('');
  const [translatedWord, setTranslatedWord] = useState<string>('');

  const [showPupup, setShowPopup] = useState(false);

  const fetchTranslation = useCallback(
    debounce(async (text: string) => {
      if (!text.trim()) {
        setTranslatedWord('');
        return;
      }

      try {
        const translation = await translateText(text, 'en', 'pl');
        setTranslatedWord(translation);
      } catch (error) {
        console.error('Translation error:', error);
      }
    }, 300),
    []
  );

  useEffect(() => {
    fetchTranslation(englishWord);
  }, [englishWord, fetchTranslation]);

  useEffect(() => {
    if (englishWord.trim() === '') {
      setTranslatedWord('');
    }
  }, [englishWord]);

  useEffect(() => {
    if (!user && rootNavigationState?.key) {
      router.replace('/');
    }
  }, [user, rootNavigationState?.key, router]);

  const addToDatabase = async (
    accountId: string,
    englishWord: string,
    translatedWord: string
  ) => {
    if (englishWord != '' && translatedWord != '') {
      await addOwnUserWords(accountId, englishWord, translatedWord);
      setShowPopup(true);
    }
  };

  return (
    <SafeAreaView className="flex-1 p-8 px-4 bg-primaryColor">
      <View>
        <Text className="text-white text-4xl font-PoppinsBold">translate!</Text>
      </View>

      <View className="relative bg-customGreen h-[150px] p-4 rounded-2xl mt-6">
        <View
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
          className="absolute top-2 right-2 rounded-full p-3"
        >
          <Text className="text-3xl">🇵🇱</Text>
        </View>

        <TextInput
          placeholder="Enter text..."
          placeholderTextColor="white"
          onChange={e => setEnglishWord(e.nativeEvent.text)}
          value={englishWord}
          className="text-white text-lg font-PoppinsMedium"
        />
      </View>

      <View className="bg-white h-[150px] p-4 rounded-2xl mt-4">
        <View className="absolute top-2 right-2 rounded-full p-3 bg-customGreen">
          <Text className="text-3xl">🇬🇧</Text>
        </View>
        <Text className="text-lg text-black font-PoppinsMedium w-[88%]">
          {translatedWord ? translatedWord : 'Translation will appear here...'}
        </Text>
        <View className="flex-row justify-end mt-2"></View>
      </View>

      <TouchableOpacity
        className="flex-row justify-center items-center p-4 rounded-xl mt-3"
        activeOpacity={0.7}
        onPress={() => addToDatabase(user.$id, englishWord, translatedWord)}
      >
        <Icon name="heart" size={30} color="#22c55e" />
        <Text className="text-white text-xl font-PoppinsMedium ml-2">
          Add to Repeat
        </Text>
      </TouchableOpacity>

      <Modal visible={showPupup} transparent animationType="slide">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-xl items-center">
            <Text className="text-lg font-PoppinsBold">Great Job!</Text>
            <Text className="mt-2 text-center font-PoppinsMedium text-base">
              New word successfully added to repetition.
            </Text>
            <TouchableOpacity
              className="mt-4 bg-green-500 p-2 rounded-xl"
              onPress={() => {
                setShowPopup(false), setEnglishWord('');
              }}
            >
              <Text className="text-white text-lg font-PoppinsBold">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Translate;
