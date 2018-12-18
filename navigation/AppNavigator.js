import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import FindScreen from '../screens/FindScreen';
import RateDrinkScreen from '../screens/RateDrinkScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const getCurrentRoute = (navigationState) => {
  if (!navigationState) {
      return null
  } else if (!navigationState.routes) {
      return navigationState
  }

  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
      return getCurrentRoute(route)
  }

  return route
}

const Routes = {
  TabStack: { key: "TabStack" },

  Home: { key: "Home", title: "Home" }, 
  Find: { key: "Find", title: "Find" },
  Rate: { key: "Rate", title: "Rate" },
  Favorites: { key: "Favorites", title: "Favorites" },
  Profile: { key: "Profile", title: "Title" }
}

const tabNavigator = createMaterialTopTabNavigator({
    [Routes.Home.key]: {
      screen: HomeScreen,
      navigationOptions: { tabBarLabel: 'Home2',
      tabBarIcon: ({ focused }) => (
        <Ionicons name="md-camera" size={20} color="white" />
    ) }},
    [Routes.Find.key]: { screen: FindScreen },
    [Routes.Favorites.key]: { screen: FavoriteScreen },
    [Routes.Profile.key]: { screen: ProfileScreen },
    // [Routes.Rate.key]: {screen: RateDrinkScreen}
 }, {
    initialRouteName: Routes.Home.key,
    tabBarOptions:
    {
      showIcon: true,
      showLabel: true,
      activeTintColor: 'red',
      style: { backgroundColor: '#61170E' },
      iconStyle: { color: 'white'}
    }
 })

const mainNavigator = createStackNavigator(
  {
    [Routes.TabStack.key]: tabNavigator
  }, {
    initialRouteName: Routes.TabStack.key,
    navigationOptions: ({ navigation }) => {
       // triggered each time you're changing a tab

       const navRoute = getCurrentRoute(navigation.state)
          , route = navRoute && navRoute.routeName && Routes[navRoute.routeName]
          , title = route ? route.title : ""

       return { title }
    }
  });
export default mainNavigator