import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import '../__mock__/xhr-mock';

import BeerSearch from '../screens/search/BeerSearch';
import BrewerySearch from '../screens/search/BrewerySearch';
import EventSearch from '../screens/search/EventSearch';
import StoreSearch from '../screens/search/StoreSearch';
import SearchComponent from '../screens/search/SearchComponent';

import props from './props';

describe('Search components render appropriately', () => {
  it('renders the BeerSearch component', () => {
    const tree = renderer.create(<BeerSearch navigate={props.navigation.navigate} data={props.data}/>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('renders the BrewerySearch component', () => {
    const tree = renderer.create(<BrewerySearch navigate={props.navigation.navigate} data={props.data}/>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('renders the EventSearch component', () => {
    const tree = renderer.create(<EventSearch navigate={props.navigation.navigate} data={props.data}/>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('renders the StoreSearch component', () => {
    const tree = renderer.create(<StoreSearch navigate={props.navigation.navigate} data={props.data}/>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('renders the SearchComponent component', () => {
    const tree = renderer.create(<SearchComponent/>).toJSON();
    expect(tree).toMatchSnapshot();
  })
})