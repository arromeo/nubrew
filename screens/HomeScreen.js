// make sure this gets deleted at the end and figure out how to set-up proxy
const port = require('../dev_port.json');

import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editThisLater: 'this should change if the fetch works',
      event: [
        {
          id: 1,
          name: "Event1",
          description: "Blah blah blah blah",
          image: '../assets/images/robot-dev.png'
        },
        {
          id: 2,
          name: "Event2",
          description: "Blah blah blah blah",
          image: '../assets/images/robot-dev.png'
        }
      ],
      recommendedBeer: {
        id: 1,
        brewery: "Brewery1",
        name: "Beer1",
        description: "beer this beer that blah blah",
        keywords: "not sure how this one will work, not currently in use",
      },
    }
  }
  static navigationOptions = {
    title: 'NuBrew',
  };

  componentDidMount() {
    fetch(`${port.DEV_PORT}/api/test`)
      .then(res => res.json())
      .then(edit => this.setState ({
        editThisLater: edit.result
      }))
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const event = this.state.event;
    const recommendedBeer = this.state.recommendedBeer;
    return (
      <View style={styles.container}>
      <Text>{this.state.editThisLater}</Text>
        <ScrollView style={styles.container}>
          <View style={styles.contentContainer}>

            <FlatList
              data={event}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => 
              <View style={styles.eventContainer}>
                <View style={[styles.eventDetailsContainer, styles.homeScreenFilename]}>
                  <Text>{item.name}</Text>
                  <MonoText style={styles.codeHighlightText}>{item.description}</MonoText>
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
            }/>
          </View>

          <View style={styles.contentContainer}>
            <View style={[styles.recommendationContainer, styles.homeScreenFilename]}>
              <Image
                source={
                  __DEV__
                    ? require('../assets/images/robot-dev.png')
                    : require('../assets/images/robot-prod.png')
                }
                size={100}
              />
              <Text>{recommendedBeer.brewery} {recommendedBeer.name}</Text>
              <MonoText style={styles.codeHighlightText}>{recommendedBeer.description}</MonoText>
            </View>

            <View style={[styles.recommendationContainer, styles.homeScreenFilename]}>
              <Ionicons name="md-medal" size={100} color="black"/>
              <Text>Crowd Recommendations</Text>
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
    flex: 1,
  },
  eventContainer: {
    flex: 1,
    flexDirection: "row",
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  bottomOptionsContainer: {
    borderWidth: 1,
    borderStyle: "dotted",
    flexDirection: "column",
    width: '28.33%',
    margin: 10,
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
});
