import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import '../__mock__/xhr-mock';

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

import props from './props';

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
