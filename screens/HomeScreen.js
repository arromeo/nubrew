import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editThisLater: 0,
    }
  }
  static navigationOptions = {
    title: 'NuBrew',
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>

          <View style={styles.contentContainer}>
            <View style={[styles.eventDetailsContainer, styles.homeScreenFilename]}>
              <Text>Event Header</Text>
              <MonoText style={styles.codeHighlightText}>Event details goes here blah blah blah</MonoText>
            </View>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.eventImage}
            />
          </View>

          <View style={styles.contentContainer}>
            <View style={[styles.recommendationContainer, styles.homeScreenFilename]}>
              <Image
                source={
                  __DEV__
                    ? require('../assets/images/robot-dev.png')
                    : require('../assets/images/robot-prod.png')
                }
                style={styles.recommendationImage}
              />
              <Text>Brewer + Name</Text>
              <MonoText style={styles.codeHighlightText}>Drink Keywords Go Here</MonoText>
            </View>

            <View style={[styles.recommendationContainer, styles.homeScreenFilename]}>
              <Image
                source={
                  __DEV__
                    ? require('../assets/images/robot-dev.png')
                    : require('../assets/images/robot-prod.png')
                }
                style={styles.recommendationImage}
              />
              <Text>Location Recommendations</Text>
              <MonoText style={styles.codeHighlightText}>Get drink recommendations</MonoText>
            </View>
          </View>

          <View style={styles.contentContainer}>
            <View style={[styles.bottomOptionsContainer, styles.optionScreenFilename]}>
              <Text>FIND ICON</Text>
            </View>

            <View style={[styles.bottomOptionsContainer, styles.optionScreenFilename]}>
              <Text>RATE ICON</Text>
            </View>

            <View style={[styles.bottomOptionsContainer, styles.optionScreenFilename]}>
              <Text>YOUR FAV ICON</Text>
            </View>
          </View>

        </ScrollView>

      </View>
    );
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 15,
    paddingBottom: 15,
    borderWidth: 0.5,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "dotted",
    flexDirection: "row",
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderStyle: "dotted",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  eventDetailsContainer: {
    borderWidth: 1,
    borderStyle: "dotted",
    flexDirection: "column",
    width: '70%',
    margin: 10,
  },
  recommendationContainer: {
    borderWidth: 1,
    borderStyle: "dotted",
    flexDirection: "column",
    width: '45%',
    margin: 10,
  },
  bottomOptionsContainer: {
    borderWidth: 1,
    borderStyle: "dotted",
    flexDirection: "column",
    width: '28.33%',
    margin: 10,
  },
  recommendationImage: {

  },
  welcomeImage: {
    width: 50,
    height: 40,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  eventImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    margin: 10,
    width: '20%',
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  optionScreenFilename: {
    marginVertical: 7,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    borderWidth: 1,
    borderStyle: "dotted",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
});
