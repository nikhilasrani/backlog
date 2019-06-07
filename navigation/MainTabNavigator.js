import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import TestScreen from '../screens/TestScreen';
import SettingsScreen from "../screens/SettingsScreen";
import ImportScreen from "../screens/ImportScreen";

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
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
    />
  ),
};

const ImportStack = createStackNavigator({
  Import: ImportScreen,
});

ImportStack.navigationOptions = {
  title: 'Import',
  tabBarLabel: 'Import',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-add-circle-outline' : 'md-add-circle-outline'}
    />
  ),
};


export default createBottomTabNavigator({
  HomeStack,
  ImportStack,
  SettingsStack,
},{tabBarOptions: {
  activeTintColor: '#000',
  labelStyle: {
    fontSize: 12,
  },
  style: {
    backgroundColor: '#fff',
  },
},navigationOptions:{
  header: null,
}});
