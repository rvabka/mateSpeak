import { StatusBar } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import React from 'react';
import { useGlobalContext } from '../../context/GlobalProvider';

const AuthLayout = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/Home" />;
  return (
    <>
      <Stack>
        <Stack.Screen
          name="signIn"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="signUp"
          options={{
            headerShown: false
          }}
        />
      </Stack>
      <StatusBar backgroundColor="#22c55e" barStyle="light-content" />
    </>
  );
};

export default AuthLayout;
