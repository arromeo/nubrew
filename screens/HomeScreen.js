// make sure this gets deleted at the end and figure out how to set-up proxy
const port = require('../dev_port.json');

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';

import EventList from './home/EventList.js';
import RecommendedBeer from './home/RecommendedBeer.js';
import CrowdFavorite from './home/CrowdFavorite.js';
import RecommendedButton from './home/RecommendedButton.js';
import EventsButton from './home/EventsButton.js';
import GoToCamera from './components/GoToCamera.js';

import { WebBrowser } from 'expo';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      event: null,
      recommendedBeer: null,
      loading: true,
    }
  }

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
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        {this.state.loading &&
          <View style={styles.spinner}>
            <ActivityIndicator size={100} color="orange" />
          </View> 
        }
        {!this.state.loading && 
          <View style={styles.container}>
            <Text style={styles.contentHeader}>Upcoming Events</Text>
            <EventList data={this.state.event} navigate={navigate}/>
            <View style={styles.contentContainer}>
              <RecommendedBeer data={this.state.recommendedBeer} navigate={navigate}/>
              <View style={styles.buttonContainer}>
                <CrowdFavorite navigate={navigate}/>
                <RecommendedButton navigate={navigate}/>
                <EventsButton navigate={navigate}/>
              </View>
            </View>
          </View>
        }
        <GoToCamera navigate={navigate}/>
        <Text style={styles.drinkResponsibly}>Please drink responsibly.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingBottom: 15,
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  contentHeader: {
    textDecorationLine: "underline",
    fontWeight: "bold",
    color: "#61170E",
    alignItems: 'flex-start',
    marginLeft: 10,
    marginTop: 8,
    marginBottom: 5
  },
  buttonContainer: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 5,
    justifyContent: "flex-start",
    alignSelf: 'flex-start',
    alignItems: "flex-start",
  },
  drinkResponsibly: {
    position: "absolute",
    bottom: 20,
    left: 20,
    fontWeight: "bold",
    fontSize: 15
  },
  spinner: {
    margin: 200,
    alignSelf: 'center'
  }
});
