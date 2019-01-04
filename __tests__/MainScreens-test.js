import 'react-native';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import FindScreen from '../screens/FindScreen';
import RateDrinkScreen from '../screens/RateDrinkScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CrowdRecScreen from '../screens/CrowdRecScreen';
import DetailScreen from '../screens/DetailScreen';
import RecommendationsScreen from '../screens/RecommendationsScreen';
import EventsScreen from '../screens/EventsScreen';
import InventoryScreen from '../screens/InventoryScreen';
import RecommendationListScreen from '../screens/RecommendationListScreen';
import renderer from 'react-test-renderer';
import '../__mock__/xhr-mock';

const props = {
  navigation: {
    navigate: function() {
      return;
    },
    state: {
      params: {
        category: "Beer",
        id: 1,
        data: {
          meridians: {
            latitude: 49.270621,
            longitude: -123.135671
          }
        }
      }
    }
  },
  screenProps: {
    user_id: 1,
    currentSearch: "Pilsner",
    currentSearchCategory: "Beer",
    favorites: [
      {
      beer_id: 1,
      category: "Porter",
      beer_name: "Nitro Milk Stout",
      brewery_name: "Left Hand Brewing Company",
      ibu: 25,
      abv: "6.0%",
      img_url: "https://products3.imgix.drizly.com/ci-left-hand-milk-stout-nitro-1cc9bd255865b63b.png?auto=format%2Ccompress&fm=jpeg&q=20"
      },
      {
      beer_id: 3,
      category: "Hefeweizen",
      beer_name: "Weissbier",
      brewery_name: "Erdinger Brewery",
      ibu: 10,
      abv: "5.3%",
      img_url: "https://www.totalwine.com/media/sys_master/twmmedia/h7c/he3/8820602306590.png"
      }
      ]
  }
}

describe('Main screens render properly', () => {

  it('renders the HomeScreen', async () => {
    const tree = renderer.create(<HomeScreen navigation={props.navigation}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders the FindScreen', async () => {
    const tree = renderer.create(<FindScreen navigation={props.navigation} screenProps={props.screenProps}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders the RateDrinkScreen', async () => {
    const tree = renderer.create(<RateDrinkScreen navigation={props.navigation}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders the FavoriteScreen', async () => {
    const tree = renderer.create(<FavoriteScreen navigation={props.navigation} screenProps={props.screenProps}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders the ProfileScreen', async () => {
    const tree = renderer.create(<ProfileScreen navigation={props.navigation} screenProps={props.screenProps}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders the CrowdRecScreen', async () => {
    const tree = renderer.create(<CrowdRecScreen navigation={props.navigation}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders the DetailScreen', async () => {
    const tree = renderer.create(<DetailScreen navigation={props.navigation} screenProps={props.screenProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders the RecommendationsScreen', async () => {
    const tree = renderer.create(<RecommendationsScreen navigation={props.navigation} screenProps={props.screenProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders the EventsScreen', async () => {
    const tree = renderer.create(<EventsScreen navigation={props.navigation} screenProps={props.screenProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders the InventoryScreen', async () => {
    const tree = renderer.create(<InventoryScreen navigation={props.navigation} screenProps={props.screenProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders the RecommendationListScreen', async () => {
    const tree = renderer.create(<RecommendationListScreen navigation={props.navigation} screenProps={props.screenProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
