import React from 'react';
import { Platform, View, Text } from 'react-native';
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
    [Routes.Favorites.key]: {
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
    [Routes.Profile.key]: {
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

 // add routes to mainNavigator for those you don't want to appear on the top tab
const mainNavigator = createStackNavigator(
  {
    [Routes.TabStack.key]: tabNavigator,
    [Routes.Rate.key]: RateDrinkScreen,
  }, {
    initialRouteName: Routes.TabStack.key,
    navigationOptions: ({ navigation }) => {
  
      // Triggers on each screen change. Sets the title.
      const navRoute = getCurrentRoute(navigation.state)
      const route = navRoute && navRoute.routeName && Routes[navRoute.routeName]
      const title = route ? route.title : ""

      // Sets the background color of the header.
      const headerStyle = {
        backgroundColor: 'orange'
      }

      // This sets the icon that shows up in the header. Can be replaced with
      // logo if we make one.
      const headerTitle = <View style={{flexDirection: 'row'}}><Ionicons
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-beer'} size={28} style={{ marginLeft: 10, color: "brown"}}
    /><Text style={{marginLeft: 10, fontSize: 20}}>{ title }</Text></View>
       return { title, headerStyle, headerTitle }
    },
    
  });
export default mainNavigator