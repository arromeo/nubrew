
// make sure this gets deleted at the end and figure out how to set-up proxy
const port = require('../dev_port.json');

import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Camera, Permissions, ImageManipulator } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import ConfirmPrompt from './vote/ConfirmPrompt.js';


export default class RateDrinkScreen extends React.Component {
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
      loading: false,
      couldNotFind: false,
      confirmDrink: false,
      data: null,
    };
  }

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
      { compress: 0.5, format: 'png', base64: true });
    return fetch(`${port.DEV_PORT}/api/visionML`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(imageCopy),
        })
      .then(res => res.json())
      .then(data => {
        console.log("Hello data: ", data);
        if (data.couldNotFind) {
          this.setState({
            confirmDrink: true,
            couldNotFind: true,
            loading: false,
          })
        } else {
          this.setState({
            data: data.data[0],
            confirmDrink: true,
            couldNotFind: false,
            loading: false,
          })
        }
      })
      .catch((error) => {
        console.error(error);
      })
  }

  render() {
    const { navigate } = this.props.navigation;
    const snap = async () => {
      this.setState({
        loading: true,
      })
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

    const resetToCamera = () => {
      this.setState({
        couldNotFind: false,
        confirmDrink: false,
        loading: false,
        data: null,
      })
    }

    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View/>;
    } else if (hasCameraPermission === false) {
      return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.paragraphFont}>Sorry! This feature is not available if camera permission is not provided.</Text>
        <Ionicons name="md-sad" size={50} color="red"/>
        <TouchableOpacity 
          style={styles.buttonStyle}
          onPress={() => {
            navigate('Find');
          }}>
          <Ionicons name="md-search" size={50} color="yellow"/>
        </TouchableOpacity>
      </View>
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
                {!this.state.loading && 
                  <View>
                    <Text style={styles.photoGuideFont}>Center the label.</Text>
                    <Text style={styles.photoGuideFont}>Tap the Screen!</Text>
                  </View>
                }
                {this.state.loading &&
                  <View style={styles.spinner}>
                    <ActivityIndicator size={100} color="orange" />
                  </View> 
                }

              </TouchableOpacity>
            </Camera>
          }
          {this.state.confirmDrink && 
            <ConfirmPrompt data={this.state.data} navigate={navigate} resetToCamera={resetToCamera} couldNotFind={this.state.couldNotFind}/>
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
  paragraphFont: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    paddingTop: 10,
    width: '90%',
    textAlign: 'center',
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
  },
  buttonStyle: {
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    flex: 0.2,
    width: '75%',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#61170E',
  },
  spinner: {
    margin: 150,
    alignSelf: 'center'
  }
})