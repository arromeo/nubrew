// make sure this gets deleted at the end and figure out how to set-up proxy
const port = require('../dev_port.json');

import React from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import BeerSearch from './search/BeerSearch.js';
import StoreSearch from './search/StoreSearch.js';
import BrewerySearch from './search/BrewerySearch.js';
import EventSearch from './search/EventSearch.js';
import SearchComponent from './search/SearchComponent.js';

export default class DetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: null,
      searchResultCategory: null,
      loading: true,
    }
  }

  render() {
    const searchDatabase = (value, category) => {
      const data = {
        category: category,
        id: value,
      }
      return fetch(`${port.DEV_PORT}/api/details`, 
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then(data => {
          if (data.searchCategory === "None") {
            this.setState({
              searchResultCategory: "None",
            })
          } else {
            this.setState({
              searchResult: data.searchResult,
              searchResultCategory: data.searchResultCategory,
              loading: false,
            })
          }})
        .catch((error) => {
          console.error(error);
        })
    }

    // this needs to be passed between stacks, value hard coded for now
    const hardCodedId = 1;
    const hardCodedCategory = "Beer";
    // fix this later
  
    return (
      <ScrollView style={styles.container}>
        <SearchComponent input={this.state.input} changeInput={changeInput} pickerValue={this.state.pickerValue} pickCategory={pickCategory}/>
          
        <Button 
          title="Search"
          onPress={() => searchDatabase(hardCodedIdt, hardCodedCategory)}
          />

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