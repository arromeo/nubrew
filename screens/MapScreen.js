
// make sure this gets deleted at the end and figure out how to set-up proxy
const port = require('../dev_port.json');

import React from 'react';
import { Platform } from 'react-native';
import { MapView, Location, Constants, Permissions, IntentLauncherAndroid } from 'expo';

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      errorMessage: null,
    }
  }
  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  // TODO: Android error, cannot retrieve permission (https://github.com/expo/expo/issues/946)
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    // IntentLauncherAndroid.startActivityAsync(IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS);
    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
    this.setState({ location });
  };
  
  render() {
    const navigationParams = this.props.navigation.state.params;

    console.log('this is the navigation params:  ', this.props.navigation.state.params)
    
    return (

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: navigationParams.latitude || 49.281235,
          longitude: navigationParams.longitude || -123.114854,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />

    )
  }
}