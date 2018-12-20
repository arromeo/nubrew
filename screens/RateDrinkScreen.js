
// make sure this gets deleted at the end and figure out how to set-up proxy
const port = require('../dev_port.json');

import React from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { Camera, Permissions, ImageManipulator } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { SearchBar } from 'react-native-elements';

export default class CameraScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      couldNotFind: false,
      confirmDrink: false,
      data: null,
    };
  }
  static navigationOptions = {
    title: 'Scan',
  };

  // if camera permission granted in phone
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  // when picture saves, resize it to appropriate size, and send to server. Key information is "base64"
  onPictureSaved = async photo => {
    const imageCopy = await ImageManipulator.manipulateAsync(
      photo.uri, 
      [{ resize: { width: 320, height: 200 }}], 
      { compress: 0, format: 'png', base64: true });
    return fetch(`${port.DEV_PORT}/api/visionML`, 
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(imageCopy),
        })
      .then(res => res.json())
      .then(data => {
        this.setState({
          data: data[0],
          confirmDrink: data.confirmDrink,
          couldNotFind: data.couldNotFind,
        })
        console.log(JSON.stringify(data))
      })
      .catch((error) => {
        console.error(error);
      })
  }

  render() {
    const { navigate } = this.props.navigation;
    const snap = async () => {
      const options = {
        quality: 0.1,
        base64: true,
        exif: true,
        onPictureSaved: this.onPictureSaved,
      }
      if (this.camera) {
        await this.camera.takePictureAsync(options);
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
              onChangeText={(text) => { this.setState({input: text}) }}
              value={this.state.input}
              placeholder='Type Here...' />
          </View>
        </ScrollView>
      )
    } else {
      return (
        <View style={{ flex: 1 }}>
          {!this.state.confirmDrink &&
            <Camera style={styles.cameraContainer} 
              type={this.state.type} 
              ref={ref => { this.camera = ref; }}>

              <TouchableOpacity
                style={styles.cameraIcon}
                onPress={() => {
                  navigate({
                    routeName: 'Home',
                  });
                }}>
                <Ionicons name="md-arrow-round-back" size={32} color="white"/>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.pictureGuide}
                  onPress={() => {
                    snap();
                  }}>
                <Text style={styles.photoGuideFont}>Center the label.</Text>
                <Text style={styles.photoGuideFont}>Tap the Screen!</Text>
              </TouchableOpacity>
            </Camera>
          }
          {this.state.confirmDrink &&
            <View>
              <Text>FOUND THE DRINK {this.state.data.beer_name}</Text>
            </View>
          }
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
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  pictureGuide: {
    alignSelf: 'center',
    margin: 'auto',
    height: '90%',
    width: '90%',
    borderRadius: 10,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.3)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  cameraIcon: {
    position: 'absolute',
    left: 40,
    bottom: 40,
  },
  photoGuideFont: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 20,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.0)',
  }
})