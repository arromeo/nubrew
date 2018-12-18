// make sure this gets deleted at the end and figure out how to set-up proxy
const port = require('../dev_port.json');

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import EventList from './home/EventList.js';
import RecommendedBeer from './home/RecommendedBeer.js';
import CrowdRecommendations from './home/CrowdRecommendations.js';
import GoToCamera from './goto/GoToCamera.js';

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
            <EventList data={this.state.event} searchDatabase={searchDatabase} navigate={navigate}/>
            <View style={styles.contentContainer}>
              <RecommendedBeer data={this.state.recommendedBeer} searchDatabase={searchDatabase} navigate={navigate}/>
              <CrowdRecommendations searchDatabase={searchDatabase} navigate={navigate}/>
            </View>
          </View>
        }
        <GoToCamera navigate={navigate}/>
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
});
