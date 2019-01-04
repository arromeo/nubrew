import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import '../__mock__/xhr-mock';

import CrowdFavorite from '../screens/home/CrowdFavorite';
import EventList from '../screens/home/EventList';
import EventsButton from '../screens/home/EventsButton';
import RecommendedBeer from '../screens/home/RecommendedBeer';
import RecommendedButton from '../screens/home/RecommendedButton';

import props from '../__mock__/props';

describe('Home page components render correctly', () => {
  it('renders the CrowdFavorite component', () => {
    const tree = renderer.create(<CrowdFavorite navigate={props.navigation.navigate}/>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('renders the EventList component', () => {
    const tree = renderer.create(<EventList navigate={props.navigation.navigate} data={props.data}/>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('renders the EventsButton component', () => {
    const tree = renderer.create(<EventsButton navigate={props.navigation.navigate}/>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('renders the RecommendedBeer component', () => {
    const tree = renderer.create(<RecommendedBeer data={props.data} navigate={props.navigation.navigate}/>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('renders RecommendedButton component', () => {
    const tree = renderer.create(<RecommendedButton navigate={props.navigation.navigate}/>).toJSON();
    expect(tree).toMatchSnapshot();
  })
})