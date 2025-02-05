import React from 'react';
import { View, Text } from 'react-native';
import { Tabs } from 'expo-router';
import Icon from 'react-native-vector-icons/AntDesign';

interface TabIconProps {
  name: string;
  focused: boolean;
  text: string;
}

const TabIcon = ({ name, focused, text }: TabIconProps) => {
  return (
    <View className="flex items-center justify-center py-1">
      <Icon name={name} size={26} color={focused ? '#22c55e' : '#6b7280'} />
      <Text
        className={`${
          focused ? 'text-green-500 font-bold' : 'text-gray-500'
        } text-base w-full text-center`}
      >
        {text}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          display: 'flex',
          justifyContent: 'center',
          height: 80,
          paddingTop: 18,
          backgroundColor: '#171323',
          borderTopWidth: 1,
          borderTopColor: '#f3f4f6',
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 3
        },
        tabBarShowLabel: false
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon name="home" focused={focused} text="Home" />
          )
        }}
      />
      <Tabs.Screen
        name="Translate"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon name="form" focused={focused} text="Translate" />
          )
        }}
      />
      <Tabs.Screen
        name="toRepeat"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon name="book" focused={focused} text="toRepeat" />
          )
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
