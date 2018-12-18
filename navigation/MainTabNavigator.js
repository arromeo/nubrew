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
  title: 'Home',
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
  title: 'Find',
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
  title: 'Favorites',
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
  title: 'Rate',
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
    style: {
      backgroundColor: '#61170E'
    },
  }
}

export default createMaterialTopTabNavigator({
  HomeStack,
  FindStack,
  FavoriteStack,
  ProfileStack,
}, tabOptions);
