
// make sure this gets deleted at the end and figure out how to set-up proxy
const port = require('../dev_port.json');

import React from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { Camera, Permissions } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { SearchBar } from 'react-native-elements';

export default class CameraScreen extends React.Component {
  static navigationOptions = {
    title: 'Scan',
  };

  // initial state
  state = {
    hasCameraPermission: false,
    zoom: 0,
    flash: 'off',
    autoFocus: 'on',
    type: 'back',
    whiteBalance: 'auto',
    ratio: '16:9',
    barcodeScanning: false,
    faceDetecting: false,
    showGallery: false,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const someMethod = () => {
      return;
    }

    const snap = async () => {
      if (this.camera) {
        this.camera.takePictureAsync();
      }
    };

    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View/>;
    } else if (hasCameraPermission === false) {
      return (
        <ScrollView style={styles.container}>
          <View style={styles.searchContainer}>
            <SearchBar
              onChangeText={someMethod}
              onClearText={someMethod}
              placeholder='Type Here...' />
          </View>
        </ScrollView>
      )
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => { this.camera = ref; }}>
            <View
              style={styles.cameraIconContainer}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  snap()
                }}>
                <Ionicons name="md-camera" size={32} color="white" style={styles.cameraIcon}/>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  cameraIconContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    paddingBottom: 20,
  }
})