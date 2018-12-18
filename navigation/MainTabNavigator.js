import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import FindScreen from '../screens/FindScreen';
import RateDrinkScreen from '../screens/RateDrinkScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import ProfileScreen from '../screens/ProfileScreen';

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

const ProfileStack = createStackNavigator({
  tabBarLabel: ProfileScreen,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-person'}
    />
  ),
};

const tabOptions = {
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    indicatorStyle: {
      backgroundColor: '#842B00'
    },
    style: {
      backgroundColor: '#61170E',
      marginTop: 25
    },
    activeTintColor: {
      color: '#FFFFFF'
    }
  }
}

export default createMaterialTopTabNavigator({
  HomeStack,
  FindStack,
  RateDrinkStack,
  FavoriteStack,
  ProfileStack,
}, tabOptions);
