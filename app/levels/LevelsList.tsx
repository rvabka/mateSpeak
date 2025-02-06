import { View, Text, FlatList, TouchableOpacity, Image, RefreshControl } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { fetchProgress } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';
import Loading from '@/components/Loading';
import Icon from 'react-native-vector-icons/AntDesign';

interface Level {
  levelID: string;
  level: string;
  description: string;
  image: any;
}

interface Progress {
  levelID: string;
  ifPassed: boolean;
}

const levels: Level[] = [
  {
    levelID: '679a008a0003b741e05a',
    level: '1',
    description: 'Beginner',
    image: require('../../assets/images/backgroundBeginner.png'),
  },
  {
    levelID: '679a010b00397dae38b8',
    level: '2',
    description: 'Elementary',
    image: require('../../assets/images/backgroundElementary.png'),
  },
  {
    levelID: '679a0124002e2f4ba604',
    level: '3',
    description: 'Intermediate',
    image: require('../../assets/images/backgroundIntermediate.png'),
  },
  {
    levelID: '679a012c0033acf5c4df',
    level: '4',
    description: 'Advanced',
    image: require('../../assets/images/backgroundAdvanced.png'),
  },
];

const LevelsList = () => {
  const { user } = useGlobalContext();
  const router = useRouter();
  const [progress, setProgress] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getProgress = async () => {
    try {
      setLoading(true);
      const wordsData = (await fetchProgress(user.$id)).map((doc: any) => ({
        levelID: doc.level_id,
        ifPassed: doc.if_passed,
      }));
      setProgress(wordsData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProgress();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await getProgress();
    setRefreshing(false);
  };

  const checkIfPassed = (levelID: string) => {
    return progress.some(item => item.levelID === levelID);
  };

  const handlePressLevel = (item: Level) => {
    router.push({
      pathname: '/levels/LevelDetail',
      params: {
        levelID: item.levelID,
        level: item.level,
        description: item.description,
      },
    });
  };

  if (loading) return <Loading />;

  return (
    <View className="flex-1 relative">
      <FlatList
        data={levels}
        className="mt-5"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              if (!checkIfPassed(item.levelID)) {
                handlePressLevel(item);
              }
            }}
            disabled={checkIfPassed(item.levelID)}
            className={`mb-4 mx-2 ${checkIfPassed(item.levelID) ? 'opacity-50' : ''}`}
          >
            <View className="relative">
              <Image
                source={item.image}
                className={`w-full h-40 rounded-lg ${checkIfPassed(item.levelID) ? 'grayscale' : ''}`}
              />
              <View className="absolute inset-0 bg-opacity-50 rounded-lg justify-center items-center">
                <Text className="text-white text-2xl font-PoppinsBold">{item.description}</Text>
                <Text className="text-white text-2xl font-PoppinsMedium">Level {item.level}</Text>
                {checkIfPassed(item.levelID) && (
                  <Text className="flex items-center justify-center font-PoppinsLight text-center text-2xl text-white mt-2 border-2 border-white p-2 rounded-lg">
                    LEVEL PASSED <Icon name="check" size={24} color={'#22c55e'} />
                  </Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.levelID.toString()}
      />
    </View>
  );
};

export default LevelsList;
