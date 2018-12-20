// make sure this gets deleted at the end and figure out how to set-up proxy
const port = require('../dev_port.json');

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import EventList from './home/EventList.js';
import RecommendedBeer from './home/RecommendedBeer.js';
import CrowdRecommendations from './home/CrowdRecommendations.js';
import RecommendedButton from './home/RecommendedButton.js';
import EventsButton from './home/EventsButton.js';
import GoToCamera from './goto/GoToCamera.js';

import { WebBrowser } from 'expo';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user_id: 1,
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
          <View style={styles.container}>
            <Text style={styles.contentHeader}>Upcoming Events</Text>
            <EventList data={this.state.event} searchDatabase={searchDatabase} navigate={navigate}/>
            <View style={styles.contentContainer}>
              <RecommendedBeer data={this.state.recommendedBeer} user={this.state.user_id} searchDatabase={searchDatabase} navigate={navigate}/>
              <View style={styles.buttonContainer}>
                <CrowdRecommendations style={styles.button} searchDatabase={searchDatabase} navigate={navigate}/>
                <RecommendedButton style={styles.button} searchDatabase={searchDatabase} navigate={navigate}/>
                <EventsButton style={styles.button} searchDatabase={searchDatabase} navigate={navigate}/>
              </View>
            </View>
          </View>
        }
        <GoToCamera navigate={navigate} user={this.state.user_id}/>
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
  }
});
