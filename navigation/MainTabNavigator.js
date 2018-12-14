import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import FindScreen from '../screens/FindScreen';
import RateDrinkScreen from '../screens/RateDrinkScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import CameraScreen from '../screens/CameraScreen';


const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const FindStack = createStackNavigator({
  Find: FindScreen,
});

FindStack.navigationOptions = {
  tabBarLabel: 'Find',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-search'}
    />
  ),
};

const FavoriteStack = createStackNavigator({
  tabBarLabel: FavoriteScreen,
});

FavoriteStack.navigationOptions = {
  tabBarLabel: 'Favorites',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-star'}
    />
  ),
};

const RateDrinkStack = createStackNavigator({
  tabBarLabel: RateDrinkScreen,
});

RateDrinkStack.navigationOptions = {
  tabBarLabel: 'Rate',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-beer'}
    />
  ),
};

const CameraStack = createStackNavigator({
  tabBarLabel: CameraScreen,
});

CameraStack.navigationOptions = {
  tabBarLabel: 'Camera',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-camera'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  FindStack,
  RateDrinkStack,
  FavoriteStack,
  CameraStack
});
