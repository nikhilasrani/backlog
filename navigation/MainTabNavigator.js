import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import AddButton from "../components/AddButton"
import TabBarIcon from '../components/TabBarIcon';
import TestScreen from '../screens/TestScreen';
import SettingsScreen from "../screens/SettingsScreen";
import ImportScreen from "../screens/ImportScreen";
import ExportScreen from "../screens/ExportScreen";


// import icons
import FAwesomeIcon from 'react-native-vector-icons/FontAwesome';
const size = 26;

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

const ExportStack = createStackNavigator({
  Export: ExportScreen,
});

ExportStack.navigationOptions = {
  title: 'Export',
  tabBarLabel: 'Export',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-add-circle' : 'md-add-circle'}
    />
  ),
};

const RouteConfig = {
  HomeStack: {
    screen: TestScreen,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => (
				<FAwesomeIcon
					name="home"
					color={tintColor}
					size={size}
				/>
    )
  })
},
ImportStack:{
  screen:ImportScreen,
  navigationOptions: () => ({
    tabBarIcon:({tintColor}) => (
      <FAwesomeIcon
					name="download"
					color={tintColor}
					size={size}
				/>
    )
  })},
  Add: {
    screen: TestScreen,
    navigationOptions: () => ({
      tabBarButtonComponent: () => (
        <AddButton/>)})},
  ExportStack:{
    screen:ExportScreen,
          navigationOptions: () => ({
            tabBarIcon:({tintColor}) => (
              <FAwesomeIcon
                  name="upload"
                  color={tintColor}
                  size={size}
                />
            )
          })},
          SettingsStack: {
            screen:SettingsScreen,
            navigationOptions: () => ({
              tabBarIcon:({tintColor}) => (
                <FAwesomeIcon
                    name="user"
                    color={tintColor}
                    size={size}
                  />)})
          }
        
}

const BottomNavigatorConfig = {
	tabBarOptions: {
		activeTintColor: '#000',
		inactiveTintColor: 'rgb(89, 102, 139)',
		style: {
			backgroundColor: '#fff',
		},
		showLabel: false,
	},
};

export default createBottomTabNavigator(RouteConfig, BottomNavigatorConfig);

/*export default createBottomTabNavigator({
  HomeStack,
  ImportStack,
  Add: {
    screen: TestScreen,
    navigationOptions: () => ({
      tabBarButtonComponent: () => (
        <AddButton/>)})},
        ExportStack,
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
*/