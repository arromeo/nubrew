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

  render() {
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
      if (data.searchCategory === "None") {
        this.setState({
          searchResultCategory: "None",
        })
      } else {
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
  
    return (
      <ScrollView style={styles.container}>
        <SearchComponent input={this.state.input} changeInput={changeInput} pickerValue={this.state.pickerValue} pickCategory={pickCategory}/>
          
        <Button 
          title="Search"
          onPress={() => searchDatabase(this.state.input, this.state.pickerValue)}
          />

        {!this.state.loading &&
          <View style={styles.searchContainer}>
            {this.state.searchResultCategory === "Beer" &&
              <BeerSearch data={this.state.searchResult}/>
            }
            {this.state.searchResultCategory === "Brewery" &&
              <BrewerySearch data={this.state.searchResult}/>
            }
            {this.state.searchResultCategory === "Store" &&
              <StoreSearch data={this.state.searchResult}/>
            }
            {this.state.searchResultCategory === "Event" &&
              <EventSearch data={this.state.searchResult}/>
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
  }
})