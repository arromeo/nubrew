import 'react-native';
import React from 'react';
import App from '../App';
import HomeScreen from '../screens/HomeScreen';

import renderer from 'react-test-renderer';

describe('App snapshot', () => {

  it('renders the loading screen', async () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the root without loading screen', async () => {
    const tree = renderer.create(<App skipLoadingScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the homescreen screen', async () => {
    const tree = renderer.create(<HomeScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
