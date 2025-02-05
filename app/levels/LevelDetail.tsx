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
import { useLocalSearchParams, useFocusEffect, router } from 'expo-router';
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
  const [showPopup, setShowPopup] = useState({
    finishedLevel: false,
    goBack: false
  });

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

  const onBackPress = () => {
    if (learnedWords < words.length) {
      setShowPopup(goBack => ({
        ...goBack,
        goBack: true
      }));
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
          setShowPopup(finishedLevel => ({
            ...finishedLevel,
            finishedLevel: true
          }));
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
                pronunciation={words[currentWord].pronunciation}
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
          <TouchableOpacity className="flex-col justify-center items-center bg-[#F98A5C] p-2 rounded-xl">
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

        <Modal
          visible={showPopup.finishedLevel}
          transparent
          animationType="slide"
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white p-6 rounded-xl items-center">
              <Text className="text-lg font-PoppinsBold">Great Job!</Text>
              <Text className="mt-2 text-center font-PoppinsMedium text-base">
                You have learned all words in this level.
              </Text>
              <TouchableOpacity
                className="mt-4 bg-green-500 p-2 rounded-xl"
                onPress={() => {
                  setShowPopup(finishedLevel => ({
                    ...finishedLevel,
                    finishedLevel: true
                  }));
                  router.back();
                }}
              >
                <Text className="text-white text-lg font-PoppinsBold">
                  Go Back
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal visible={showPopup.goBack} transparent animationType="slide">
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
                    setShowPopup(goBack => ({ ...goBack, goBack: false }));
                  }}
                >
                  <Text className="text-white text-lg font-PoppinsBold">
                    Stay
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="mt-4 bg-green-500 p-2 rounded-xl"
                  onPress={() => {
                    setShowPopup(goBack => ({ ...goBack, goBack: false }));
                    router.back();
                  }}
                >
                  <Text className="text-white text-lg font-PoppinsBold">
                    Leave
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default LevelDetail;
