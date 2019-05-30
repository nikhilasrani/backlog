import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import TestScreen from '../screens/TestScreen';
import SettingsScreen from "../screens/SettingsScreen";

const HomeStack = createStackNavigator({
  Test: TestScreen,
  
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios'? `ios-home`:'md-home'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  title: 'Settings',
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'}
    />
  ),
};


export default createBottomTabNavigator({
  HomeStack,
  SettingsStack,
},{tabBarOptions: {
  activeTintColor: '#fec105',
  labelStyle: {
    fontSize: 12,
  },
  style: {
    backgroundColor: '#fff',
  },
},navigationOptions:{
  header: null,
}});
