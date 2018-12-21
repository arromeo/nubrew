
// make sure this gets deleted at the end and figure out how to set-up proxy
const port = require('../dev_port.json');

import React from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, View, Text, Image } from 'react-native';
import { Camera, Permissions, ImageManipulator } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { SearchBar } from 'react-native-elements';
// import VotePrompt from './vote/VotePrompt.js';


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
          data: data.data[0],
          confirmDrink: data.confirmDrink,
          couldNotFind: data.couldNotFind,
        })
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
          {this.state.confirmDrink && !this.state.couldNotFind &&
            <View style={styles.container}>
              <View style={styles.verticalContainer}>
                <Text style={styles.headerFont}>{this.state.data.brewery_name}'s {this.state.data.beer_name}</Text>
                <Image source={{uri: this.state.data.img_url}} style={{height: 200, width: 150}}/>
                <Text>Is this the correct drink?</Text>
              </View>
              <View style={styles.contentContainer}>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => {
                    navigate('Detail', {
                      category: "Beer",
                      id: this.state.data.beer_id,
                    });
                  }}>
                  <Ionicons name="md-checkmark-circle-outline" size={25} color="green"/>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.buttonStyle}
                  onPress={() => {
                    this.setState({
                      couldNotFind: false,
                      confirmDrink: false,
                      data: null,
                    })
                  }}>
                  <Ionicons name="md-camera" size={25} color="white"/>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.buttonStyle}
                  onPress={() => {
                    navigate('Find');
                  }}>
                  <Ionicons name="md-close-circle-outline" size={25} color="red"/>
                </TouchableOpacity>
              </View>
            </View>
          }
          {this.state.couldNotFind && 
            <View>
              <Text>This triggers when the drink could not be identified by the google api</Text>
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
  headerFont: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25,
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
  },
  verticalContainer: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
    alignItems: 'center',
  },
  contentContainer: {
    flex: 0.5,
    paddingBottom: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center',
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