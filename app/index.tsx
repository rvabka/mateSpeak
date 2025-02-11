import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  View,
  Image,
  ImageBackground
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import mateSpeakLogo from '../assets/images/mateSpeakLogo.png';
import background from '../assets/images/background.png';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import '../global.css';
import { useGlobalContext } from '@/context/GlobalProvider';
import scheduleDailyNotification from './notifications';
import * as Notifications from 'expo-notifications';

export default function Index() {
  const { user } = useGlobalContext();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true
    })
  });

  useEffect(() => {
    scheduleDailyNotification(21, 25);

    setTimeout(async () => {
      const notifs = await Notifications.getAllScheduledNotificationsAsync();
      console.log('📢 Powiadomienia w systemie:', notifs);
    }, 5000);
  }, []);

  const handleChangeView = async () => {
    try {
      if (!user) {
        await router.push('/signIn');
      } else {
        await router.push('/Home');
      }
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <ImageBackground source={background} style={{ flex: 1 }}>
      <SafeAreaView className="flex-1 bg-gradient-to-r from-primaryColor via-[#2a213f] to-[#362b52]">
        <StatusBar barStyle="light-content" />
        <ScrollView contentContainerStyle={{ height: '100%' }} className="px-8">
          <View className="w-full justify-center items-center min-h-[85vh] px-2">
            <Image
              source={mateSpeakLogo}
              className=""
              resizeMode="contain"
              style={{ width: 400 }}
            />
            <View className="flex-row items-center justify-center mt-2">
              <Text className="text-2xl text-white text-center font-PoppinsBold">
                Unlock your <Text className="text-customGreen">World🌎</Text>
              </Text>
            </View>
            <CustomButton
              text="Continue"
              handlePress={handleChangeView}
              containterStyles="w-full mt-7"
              textStyles="text-xl"
            />
          </View>
        </ScrollView>
        <StatusBar backgroundColor="#22c55e" barStyle="light-content" />
      </SafeAreaView>
    </ImageBackground>
  );
}
