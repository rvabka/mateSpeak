import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  RefreshControl
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../context/GlobalProvider';
import { useFocusEffect, useRootNavigationState, useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchOwnUserWords, deleteOwnUserWord } from '@/lib/appwrite';
import Loading from '@/components/Loading';
import FlippingCard from '@/components/FlippingCard';

interface ownUserWords {
  accountId: string;
  words: string[];
  learnedWords: string[];
  translatedWords: string[];
}

const ToRepeat = () => {
  const rootNavigationState = useRootNavigationState();
  const { user } = useGlobalContext();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [savedWords, setSavedWords] = useState<ownUserWords[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const wordsData = await fetchOwnUserWords(user.$id);
      const formattedWordsData = wordsData.map((doc: any) => ({
        accountId: doc.accountId,
        words: doc.words || [],
        learnedWords: doc.learnedWords || [],
        translatedWords: doc.translatedWords || []
      }));
      setSavedWords(formattedWordsData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  useEffect(() => {
    if (!user && rootNavigationState?.key) {
      router.replace('/');
    }
  }, [user, rootNavigationState?.key, router]);

  if (loading) return <Loading />;

  return (
    <SafeAreaView className="flex-1 bg-primaryColor p-4">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-white text-2xl font-PoppinsBold">your words</Text>
        <TouchableOpacity
          className="p-3 bg-customGreen rounded-lg flex-row items-center"
          onPress={() => setShowModal(true)}
        >
          <Icon name="menu" size={24} color="white" />
          <Text className="text-white text-lg ml-2 font-PoppinsMedium">
            View Words
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mt-4">
        {savedWords.length > 0 ? (
          <FlatList
            data={savedWords.flatMap(doc =>
              doc.words.map((word, index) => ({
                id: `${doc.accountId}-${index}`,
                word,
                translatedWord: doc.translatedWords[index] || 'N/A'
              }))
            )}
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item }) => (
              <FlippingCard
                word={item.word}
                translatedWord={item.translatedWord}
              />
            )}
          />
        ) : (
          <Text className="text-center text-gray-600">No words saved yet</Text>
        )}
      </View>
      <Modal visible={showModal} transparent animationType="slide">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-xl w-4/5">
            <Text className="text-lg font-PoppinsBold text-center mb-4">
              Saved Words
            </Text>
            {savedWords.length > 0 ? (
              <FlatList
                data={savedWords.flatMap(doc =>
                  doc.words.map((word, index) => ({
                    id: `${doc.accountId}-${index}`,
                    word,
                    translatedWord: doc.translatedWords[index] || 'N/A'
                  }))
                )}
                keyExtractor={item => item.id}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                renderItem={({ item }) => (
                  <View className="p-3 bg-gray-200 rounded-lg mb-2 flex-row justify-between">
                    <Text className="text-black text-lg font-PoppinsMedium">
                      <Text className="text-customGreen font-PoppinsBold">
                        {item.word}
                      </Text>{' '}
                      - {item.translatedWord}
                    </Text>
                    <TouchableOpacity
                      onPress={async () => {
                        deleteOwnUserWord(
                          user.$id,
                          item.word,
                          item.translatedWord
                        );
                        await new Promise(resolve => setTimeout(resolve, 300));
                        fetchData();
                        setShowModal(false);
                      }}
                    >
                      <Icon name="delete" size={24} color="red" />
                    </TouchableOpacity>
                  </View>
                )}
              />
            ) : (
              <Text className="text-center text-gray-600">
                No words saved yet
              </Text>
            )}
            <TouchableOpacity
              className="mt-4 bg-green-500 p-2 rounded-xl"
              onPress={() => setShowModal(false)}
            >
              <Text className="text-white text-lg font-PoppinsBold text-center">
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ToRepeat;
