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
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      event: null,
      recommendedBeer: null,
      loading: true,
    }
  }
  static navigationOptions = {
    title: 'NuBrew',
  };

  randomGen = (data) => {
    return Math.floor(Math.random() * data.length);
  }

  componentDidMount() {
    fetch(`${port.DEV_PORT}/api/index`)
      .then(res => res.json())
      .then(data => this.setState ({
        event: data.result.events,
        recommendedBeer: data.result.featured_beer[this.randomGen(data.result.featured_beer)],
        loading: false
      }))
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const event = this.state.event;
    const recommendedBeer = this.state.recommendedBeer;
    const { navigate } = this.props.navigation;

    const searchDatabase = (value, category) => {
      const data = {
        category: category,
        keywords: value,
      }
      return fetch(`${port.DEV_PORT}/api/find`, 
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
      .then(res => res.json())
      .then(data => {
        if (data.searchResult.length) {
          this.setState({
            searchResult: data.searchResult,
            searchResultCategory: data.searchResultCategory,
            input: "",
            loading: false,
          })
        }})
      .catch((error) => {
        console.error(error);
      })
    }

    return (
      <View style={styles.container}>
        {this.state.loading && 
          <View><Text>LoadingScreen goes here</Text></View>
        }
        {!this.state.loading && 
          <ScrollView style={styles.container}>
            <View style={styles.contentContainer}>

              <FlatList
                data={event}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => 
                <TouchableOpacity
                  style={[styles.eventContainer, styles.homeScreenFilename]}
                  onPress={() => {
                    navigate({
                      routeName: 'Find',
                    });
                    searchDatabase(item.id.toString(), "HighlightEvent");
                  }}>
                  <View style={[styles.eventDetailsContainer, styles.homeScreenFilename]}>
                    <Text>{item.event_name} at {item.store_name}</Text>
                    <MonoText style={styles.codeHighlightText}>{item.details.split('').slice(0, 60).join("")}...</MonoText>
                  </View>
                </TouchableOpacity>
              }/>
            </View>

            <View style={styles.contentContainer}>
              <TouchableOpacity 
                style={[styles.recommendationContainer, styles.homeScreenFilename]}
                onPress={() => {
                  navigate({
                    routeName: 'Find',
                  });
                  searchDatabase(recommendedBeer.id, "Recommendations");
                }}>
                <Image
                  source={
                    __DEV__
                      ? require('../assets/images/robot-dev.png')
                      : require('../assets/images/robot-prod.png')
                  }
                  size={100}
                />
                <Text>{recommendedBeer.brewery_name}'s</Text>
                <Text>{recommendedBeer.beer_name}</Text>
                <MonoText style={styles.codeHighlightText}>IBU: {recommendedBeer.ibu}</MonoText>
                <MonoText style={styles.codeHighlightText}>ABV: {recommendedBeer.abv}</MonoText>
              </TouchableOpacity>
      
              <TouchableOpacity 
                style={[styles.recommendationContainer, styles.homeScreenFilename]}
                onPress={() => {
                  navigate({
                    routeName: 'Find',
                    params: {
                      type: 'CrowdRecommendations',
                    }
                  });}}
              >
                <Ionicons name="md-medal" size={100} color="black"/>
                <Text>Crowd</Text>
                <Text>Recommendations</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        }

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
    justifyContent: 'center',
    alignItems: 'center',
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
