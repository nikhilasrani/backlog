import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from "../screens/auth/LoginScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import AuthLoadingScreen from "../screens/auth/AuthLoading";

const AppStack = createStackNavigator({ Main: MainTabNavigator});


const AuthStack = createSwitchNavigator({ 
  Login:{screen:LoginScreen},
  Signup: {screen: SignUpScreen},
  ForgotPassword: {screen: ForgotPasswordScreen}
 });


export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
}, {
  initialRouteName: 'AuthLoading',
}));