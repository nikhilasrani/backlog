import React from 'react';
import { createStackNavigator} from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from "../screens/SettingsScreen";
import {Button} from "react-native-paper"

const RouteConfigs = {
  Home: {
    screen: HomeScreen,
    navigationOptions:({navigation}) => ({
    headerTitle: "Backlog",
    headerRight: (
      <Button
        icon="settings"
        color="#000"
        onPress={() => navigation.navigate("Settings")}
      />

    )
  })
},
  Settings: {
    screen:SettingsScreen,
    navigationOptions:({navigation}) => ({
      headerTitle:"Settings",
      headerLeft:(
      <Button
          icon="arrow-back"
          color="#000"
          onPress={() => navigation.navigate("Home")}
        />
      )
    })
  }
}

const StackNavigatorConfig = {
  navigationOptions: {
    header: null,
  },
  initialRouteName:"Home",
}


export default createStackNavigator(RouteConfigs, StackNavigatorConfig);
