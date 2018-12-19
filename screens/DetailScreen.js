// make sure this gets deleted at the end and figure out how to set-up proxy
const port = require('../dev_port.json');

import React from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import BeerSearch from './search/BeerSearch.js';
import StoreSearch from './search/StoreSearch.js';
import BrewerySearch from './search/BrewerySearch.js';
import EventSearch from './search/EventSearch.js';

export default class DetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: null,
      searchResultCategory: null,
      loading: true,
    }
  }

  componentDidMount() {
    // category and value are hard coded, TODO Find out how to pass data between navigation stacks
    const value = 1;
    const category = "Beer";

    const data = {
      category: category,
      id: value,
    }
    fetch(`${port.DEV_PORT}/api/details`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      this.setState({
        searchResult: data.searchResult,
        searchResultCategory: data.searchResultCategory,
        loading: false,
      })
    })
    .catch((error) => {
      console.error(error);
    })
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {!this.state.loading &&
          <View style={styles.searchContainer}>
            {this.state.searchResultCategory === "Beer" &&
              <BeerSearch data={this.state.searchResult} styles={styles}/>
            }
            {this.state.searchResultCategory === "Brewery" &&
              <BrewerySearch data={this.state.searchResult} styles={styles}/>
            }
            {this.state.searchResultCategory === "Store" &&
              <StoreSearch data={this.state.searchResult} styles={styles}/>
            }
            {this.state.searchResultCategory === "Event" &&
              <EventSearch data={this.state.searchResult} styles={styles}/>
            }
            {this.state.searchResultCategory === "None" &&
              <Text>No results could be found.</Text>
            }
          </View>
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchResultContainer: {
    borderWidth: 1,
    borderStyle: "dotted",
    flexDirection: "column",
    width: '90%',
    margin: 10,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  listItemContainer: {
    borderWidth: 1,
    borderStyle: "dotted",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
})