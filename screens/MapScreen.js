
// make sure this gets deleted at the end and figure out how to set-up proxy
const port = require('../dev_port.json');

import React from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import { MapView, Location, Constants, Permissions } from 'expo';

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
  
  //https://github.com/react-native-community/react-native-maps/blob/master/docs/marker.md
  render() {
    const navigationParams = this.props.navigation.state.params.data;

    console.log('this is the navigation params:  ', navigationParams)
    
    return (

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: navigationParams.meridians.latitude,
          longitude: navigationParams.meridians.longitude,
          latitudeDelta: 0.006,
          longitudeDelta: 0.003,
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: navigationParams.meridians.latitude,
            longitude: navigationParams.meridians.longitude
          }}
          pinColor='#FFA500'
          hideCallout
        >
          <MapView.Callout tooltip={false}>
            <View style={styles.markerContainer}>
              <View style={styles.calloutHeader}>
                <Image
                  style={styles.imageStyle}
                  source={{uri: navigationParams.img_url }}
                  />
                <Text style={styles.name}>{navigationParams.name}</Text>
              </View>
              <Text style={styles.description}>{navigationParams.description}</Text>
            </View>
          </MapView.Callout>
        </MapView.Marker>
      </MapView>

    )
  }
}

const styles = StyleSheet.create({
  markerContainer: {
    width: 250,
    height: 'auto',
    flex: 1,
    margin: 15,
    flexWrap: 'wrap',
  },
  imageStyle: {
    height: 75,
    width: 75,
    borderRadius: 25,
    marginRight: 20
  },
  calloutHeader: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    flexWrap: 'wrap',
  },
  name: {
    fontWeight: "bold",
  },
  description: {
    flexWrap: 'wrap'
  }
})