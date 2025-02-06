import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  BackHandler
} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useLocalSearchParams, useFocusEffect } from 'expo-router';
import { fetchWords, updateProgress } from '@/lib/appwrite';
import AnimatedCardFlip from './AnimatedCardFlip';
import Icon from 'react-native-vector-icons/AntDesign';
import ProgressBar from '@/components/ProgressBar';
import {
  PanGestureHandler,
  State,
  GestureHandlerRootView
} from 'react-native-gesture-handler';
import BackButton from '@/components/BackButton';
import { useGlobalContext } from '@/context/GlobalProvider';
import { addOwnUserWords } from '@/lib/appwrite';
import translateText from '../../api/libreTranslate';
import CustomModalProps from '@/components/Modals/CustomModal';
import LeaveModal from '@/components/Modals/LeaveModal';

interface wordsData {
  levelID: string;
  word: string;
  pronunciation: string;
  example: string;
}

const LevelDetail = () => {
  const { user } = useGlobalContext();
  const { levelID } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);

  const [words, setWords] = useState<wordsData[]>([]);
  const [currentWord, setCurrentWord] = useState(0);
  const [learnedWords, setLearnedWords] = useState(0);
  const [learnedWordsSet, setLearnedWordsSet] = useState<Set<string>>(
    new Set()
  );
  const [translatedWord, setTranslatedWord] = useState<string>('');

  const [finishedModal, setFinishedModal] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [goBack, setGoBack] = useState(false);

  useEffect(() => {
    const getWords = async () => {
      try {
        const wordsData = (await fetchWords(levelID)).map((doc: any) => ({
          levelID: doc.levelID,
          word: doc.word,
          pronunciation: doc.pronunciation,
          example: doc.example
        }));
        setWords(wordsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getWords();
  }, [levelID]);

  useEffect(() => {
    if (words.length > 0 && words[currentWord]) {
      const fetchTranslation = async () => {
        const translation = await translateText(
          words[currentWord].word,
          'pl',
          'en'
        );
        setTranslatedWord(translation);
      };
      fetchTranslation();
    }
  }, [words, currentWord]);

  const onBackPress = () => {
    if (learnedWords < words.length) {
      setGoBack(true);
      return true;
    }
    return false;
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [words.length, learnedWords])
  );

  const handleLearnWord = () => {
    if (words[currentWord] && !learnedWordsSet.has(words[currentWord].word)) {
      setLearnedWordsSet(prevSet => {
        const newSet = new Set(prevSet).add(words[currentWord].word);
        const newLearnedWords = newSet.size;
        setLearnedWords(newLearnedWords);
        if (newLearnedWords === words.length) {
          updateProgress(user.$id, levelID);
          setFinishedModal(true);
        }
        return newSet;
      });
    }
    goToNextWord();
  };

  const goToNextWord = () => {
    const nextIndex = (currentWord + 1) % words.length;
    setCurrentWord(nextIndex);
  };

  const onSwipe = ({ nativeEvent }: { nativeEvent: any }) => {
    if (nativeEvent.state === State.END) {
      goToNextWord();
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center p-4 bg-primaryColor">
        <ActivityIndicator size="large" color="green" />
      </SafeAreaView>
    );
  }

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="flex-1 justify-center items-center h-full p-6 bg-primaryColor">
        <BackButton onBackPress={onBackPress} />

        <ProgressBar learnedWords={learnedWords} totalWords={words.length} />

        <PanGestureHandler onHandlerStateChange={onSwipe}>
          <View className="flex-1 justify-center items-center">
            {words[currentWord] ? (
              <AnimatedCardFlip
                englishWord={words[currentWord].word}
                translatedWord={translatedWord}
                example={words[currentWord].example}
                onSwipeLeft={onSwipe}
              />
            ) : (
              <Text className="text-white text-xl">No more words.</Text>
            )}
          </View>
        </PanGestureHandler>

        <View className="flex-row justify-between w-full mt-4 p-2">
          <TouchableOpacity
            onPress={handleLearnWord}
            className="flex-col justify-center items-center bg-[#645BF1] p-2 rounded-xl"
          >
            <Icon name="check" size={24} color={'#fff'} />
            <Text className="text-white text-lg font-PoppinsMedium">
              Knew Word
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              addOwnUserWords(user.$id, translatedWord, words[currentWord].word);
              setReviewModal(true);
            }}
            className="flex-col justify-center items-center bg-[#F98A5C] p-2 rounded-xl"
          >
            <Icon name="hearto" size={24} color={'#fff'} />
            <Text className="text-white text-lg font-PoppinsMedium">
              Mark Review
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-col justify-center items-center bg-[#F55A71] p-2 rounded-xl">
            <Icon name="meh" size={24} color={'#fff'} />
            <Text className="text-white text-lg font-PoppinsMedium">
              See Morning
            </Text>
          </TouchableOpacity>
        </View>

        <CustomModalProps
          modalVisible={finishedModal}
          setModalVisible={setFinishedModal}
          title={'Great Job!'}
          description={'You have learned all words in this level.'}
        />
        <CustomModalProps
          modalVisible={reviewModal}
          setModalVisible={setReviewModal}
          title={'Great Job!'}
          description={'Word successfully added to repetition.'}
          extraStyles={'text-[#F55A71]'}
          isRouter={false}
        />
        <LeaveModal goBack={goBack} setGoBack={setGoBack} />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default LevelDetail;
