import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../context/GlobalProvider';
import { useRootNavigationState, useRouter } from 'expo-router';
import LevelsList from '@/app/levels/LevelsList';

const Home = () => {
  const rootNavigationState = useRootNavigationState();
  const { user, logout } = useGlobalContext();
  const router = useRouter();

  const boxShadowStyle = {
    shadowColor: '#ddd',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7
  };

  useEffect(() => {
    if (!user && rootNavigationState?.key) {
      router.replace('/');
    }
  }, [user, rootNavigationState?.key, router]);

  const capitalizeFirstLetter = (string: string) => {
    if (!string) return 'You need to log in';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <SafeAreaView className="flex-1 p-4 bg-primaryColor">
      <View
        style={boxShadowStyle}
        className="flex-row justify-between items-center mb-4 bg-primaryColor h-[100px] p-4 rounded-xl"
      >
        <View className="flex-row items-center gap-2">
          <Image
            source={{
              uri: `https://cloud.appwrite.io/v1/avatars/initials?name=${user?.username}&project=67897f5b002801b53f5c`
            }}
            style={{ width: 40, height: 40, borderRadius: 25 }}
          />
          <Text className="text-lg font-PoppinsMedium text-white">
            Welcome,{' '}
            <Text className="font-PoppinsBold text-customGreen">
              {capitalizeFirstLetter(user?.username) || 'User'}!
            </Text>
          </Text>
        </View>
        <TouchableOpacity
          onPress={logout}
          className="bg-customGreen py-2 px-3 rounded"
        >
          <Text className="text-white text-lg font-PoppinsMedium">
            Logout
          </Text>
        </TouchableOpacity>
      </View>
      <LevelsList />
    </SafeAreaView>
  );
};

export default Home;
