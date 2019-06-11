import React from 'react';
import { Platform, AsyncStorage } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import AddButton from "../components/AddButton"
import TabBarIcon from '../components/TabBarIcon';
import TestScreen from '../screens/TestScreen';
import SettingsScreen from "../screens/SettingsScreen";
import ImportScreen from "../screens/ImportScreen";
import ExportScreen from "../screens/ExportScreen";


// import icons
import {Feather} from "@expo/vector-icons"
const size = 26;


const RouteConfig = {
  HomeStack:{
    screen:createStackNavigator({TestScreen,
    navigationOptions: () => ({
      headerTitle: 'Home',
    })
  },
  ),navigationOptions: () => ({
    tabBarLabel: 'Home',
    tabBarIcon:({tintColor}) => (
      <Feather
          name="home"
          color={tintColor}
          size={size}
        />)})
  },
Import:{
  screen:ImportScreen,
  navigationOptions: () => ({
  title: 'Import',
  tabBarLabel: 'Import',
    tabBarIcon:({tintColor}) => (
      <Feather
					name="server"
					color={tintColor}
					size={size}
				/>
    )
  })},
  Add: {
    screen: TestScreen,
    navigationOptions: () => ({
      tabBarButtonComponent: () => (
        <AddButton/>)})
      },
  Export:{
    screen:ExportScreen,
          navigationOptions: () => ({
            title: 'Export',
            tabBarLabel: 'Export',
            tabBarIcon:({tintColor}) => (
              <Feather
                  name="search"
                  color={tintColor}
                  size={size}
                />
            )
          })},
          SettingsStack: {
            screen:createStackNavigator({SettingsScreen,
            navigationOptions: () => ({
              headerTitle: 'Profile',
            })
          },
          ),navigationOptions: () => ({
            tabBarLabel: 'Profile',
            tabBarIcon:({tintColor}) => (
              <Feather
                  name="user"
                  color={tintColor}
                  size={size}
                />)})
          }
}

const BottomNavigatorConfig = {
  navigationOptions: {
    header: null,
  },
	tabBarOptions: {
		activeTintColor: '#000',
		inactiveTintColor: 'rgb(200, 200, 200)',
		style: {
			backgroundColor: '#fff',
		},
		showLabel: false,
	},
};

export default createBottomTabNavigator(RouteConfig, BottomNavigatorConfig);