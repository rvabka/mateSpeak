import { View, Text, Image, ImageBackground, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import mateSpeakLogo from '../../assets/images/mateSpeakLogo.png';
import background from '../../assets/images/background.png';
import FormFields from '@/components/FormFields';
import * as Font from 'expo-font';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { createUser } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const loadFonts = () => {
  return Font.loadAsync({
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Light': require('../../assets/fonts/Poppins-Light.ttf')
  });
};

const signUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    email: '',
    password: '',
    username: ''
  });
  const [isSubbmiting, setIsSubmiting] = useState(false);

  const submit = async () => {
    if (!form.username || !form.password || !form.email) {
      Alert.alert('Error', 'Check your form once more:)');
      return;
    }

    setIsSubmiting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLoggedIn(true);

      router.replace('/signIn');
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <ImageBackground source={background} style={{ flex: 1 }}>
      <SafeAreaView className="">
        <ScrollView>
          <View className="relative w-screen justify-center items-center min-h-[85vh]">
            <View className="w-screen absolute top-0 flex-row items-center justify-between px-4">
              <Image
                source={mateSpeakLogo}
                className="-ml-4"
                resizeMode="contain"
                style={{ width: 125 }}
              />
            </View>
            <Text className="text-white text-center text-2xl mt-4 font-PoppinsBold">
              Sign up to MateSpeak
            </Text>
            <View className="flex items-center w-screen mt-5 px-4">
              <FormFields
                title="Username"
                value={form.username}
                placeholder="Username"
                handleChangeText={(text: string) =>
                  setForm({ ...form, username: text })
                }
                styles={{ width: '80%' }}
              />
              <FormFields
                title="Email"
                value={form.email}
                placeholder="Email"
                handleChangeText={(text: string) =>
                  setForm({ ...form, email: text })
                }
                styles={{ width: '80%' }}
                keyboardType="email-address"
              />
              <FormFields
                title="Password"
                value={form.password}
                placeholder="Password"
                handleChangeText={(text: string) =>
                  setForm({ ...form, password: text })
                }
                styles={{ width: '80%' }}
              />
              <CustomButton
                text="Sign up"
                handlePress={submit}
                containterStyles="mt-5"
                isLoading={isSubbmiting}
              />
              <View className="justify-center pt-5 flex-row gap-2">
                <Text className="text-lg text-white font-PoppinsMedium">
                  Have an account already?
                </Text>
                <Link
                  href="/signIn"
                  className="text-lg font-PoppinsBold text-customGreen"
                >
                  Sign in
                </Link>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default signUp;
