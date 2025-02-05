import { View, Text, Image, ImageBackground, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import mateSpeakLogo from '../../assets/images/mateSpeakLogo.png';
import background from '../../assets/images/background.png';
import FormFields from '@/components/FormFields';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { getCurrentUser, signInToAccount } from '@/lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const signIn = () => {
  const { setUser, setIsLoggedIn, user } = useGlobalContext();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [isSubbmiting, setIsSubbmiting] = useState(false);

  const submit = async () => {
    if (!form.password || !form.password) {
      Alert.alert('Error', 'Check your form once more:)');
    }

    setIsSubbmiting(true);
    try {
      await signInToAccount(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);

      router.replace('/Home');
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    } finally {
      setIsSubbmiting(false);
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
              Log in to MateSpeak
            </Text>
            <View className="flex items-center w-screen mt-5 px-4">
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
                text="Sign in"
                handlePress={submit}
                containterStyles="mt-5"
                isLoading={isSubbmiting}
              />
              <View className="justify-center pt-5 flex-row gap-2">
                <Text className="text-lg text-white font-PoppinsMedium">
                  Don't have an account?
                </Text>
                <Link
                  href="/signUp"
                  className="text-lg font-PoppinsBold text-customGreen"
                >
                  Sign Up
                </Link>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default signIn;
