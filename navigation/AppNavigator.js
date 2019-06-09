import React from "react";
import {AsyncStorage} from "react-native"
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import LoginScreen from "../screens/auth/LoginScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import Welcome from "../screens/WelcomeScreen";
import Loading from "../screens/LoadingScreen";
import AddLink from "../screens/add/AddLinkScreen";
import AddText from "../screens/add/AddTextScreen";
import AddImage from "../screens/add/AddImageScreen";

const AppStack = createStackNavigator({ Main: MainTabNavigator});

const hasVisitedOnBoarding = async () => {
  await AsyncStorage.getItem("hasVisited")
}
const hasBeenAuthenticated = async () => {
  await AsyncStorage.getItem("isAuthenticated")
}

const AuthStack = createSwitchNavigator({ 
  Login:{screen:LoginScreen},
  Signup: {screen: SignUpScreen},
  ForgotPassword: {screen: ForgotPasswordScreen}
 });


export default createAppContainer(createSwitchNavigator({
    App: AppStack,
    Auth: AuthStack,
    Welcome,
    Loading,
    AddLink,
    AddText,
    AddImage
}, {
  initialRouteName: (hasVisitedOnBoarding?(hasBeenAuthenticated?'App':'Auth'):'Welcome')
}));