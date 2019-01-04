import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import '../__mock__/xhr-mock';

import BeerDetails from '../screens/details/BeerDetails';
import BreweryDetails from '../screens/details/BreweryDetails';
import EventDetails from '../screens/details/EventDetails';
import StoreDetails from '../screens/details/StoreDetails';

import props from '../__mock__/props';

describe('Detail Components render properly', () => {
  it('BeerDetails component renders', () => {
    const tree = renderer.create(<BeerDetails data={props.beerData} navigate={props.navigation.navigate} user_id={props.user_id} navigationParams={props.navigationParams}/>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('BreweryDetails component renders', () => {
    const tree = renderer.create(<BreweryDetails data={props.breweryData} navigate={props.navigation.navigate}/>)
    expect(tree).toMatchSnapshot();
  })

  it('EventDetails component renders', () => {
    const tree = renderer.create(<EventDetails data={props.eventData} navigate={props.navigation.navigate}/>)
    expect(tree).toMatchSnapshot();
  })

  it('StoreDetails component renders', () => {
    const tree = renderer.create(<StoreDetails data={props.storeData} navigate={props.navigation.navigate}/>)
    expect(tree).toMatchSnapshot();
  })
})