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
 Rate: { key: "Rate", title: "Rate"},
 Favorites: { key: "Favorites", title: "Favorites" },
 Profile: { key: "Profile", title: "Title" }
}

const tabNavigator = createMaterialTopTabNavigator({
    [Routes.Home.key]:
    {
      screen: HomeScreen,
      navigationOptions:
      {
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
          focused={focused}
          name={
            Platform.OS === 'ios'
              ? `ios-home${focused ? '' : '-outline'}`
              : 'md-home'
          }
          />
        )
      }
    },
    [Routes.Find.key]: {
      screen: FindScreen,
      navigationOptions:
      {
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-link' : 'md-search'}
          />
        )
      }
    },
    [Routes.Favorites.key]: { screen: FavoriteScreen,
      screen: FavoriteScreen,
      navigationOptions:
      {
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-link' : 'md-star'}
          />
        )
      }
    },
    [Routes.Profile.key]: { screen: ProfileScreen, 
      screen: ProfileScreen,
      navigationOptions:
      {
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-options' : 'md-person'}
          />
        )
      }
    },
 }, {
    initialRouteName: Routes.Home.key,
    tabBarOptions:
    {
      showIcon: true,
      showLabel: false,
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
      const route = navRoute && navRoute.routeName && Routes[navRoute.routeName]
      const title = route ? route.title : ""
      const headerStyle = {
        backgroundColor: 'orange'
      }

       return { title, headerStyle }
    },
    
  });
export default mainNavigator