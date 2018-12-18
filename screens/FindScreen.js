// make sure this gets deleted at the end and figure out how to set-up proxy
const port = require('../dev_port.json');

import React from 'react';
import { ScrollView, StyleSheet, View, Text, FlatList, Picker, Button } from 'react-native';
import { SearchBar } from 'react-native-elements';
import BeerSearch from './search/BeerSearch.js';
import StoreSearch from './search/StoreSearch.js';
import BrewerySearch from './search/BrewerySearch.js';


export default class FindScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      pickerValue: "Beer",
      searchResult: null,
      searchResultCategory: null,
      loading: true,
    }
  }
  
  static navigationOptions = {
    title: 'Find',
  };

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

    const eventSearch = (data) => {
      return (
        <View>
          {this.state.loading &&
            <View><Text>LoadingScreen goes here</Text></View>
          }
          <FlatList
          data={this.state.searchResult}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => 
            <View style={styles.listItemContainer} key={item.id}>
              <View style={styles.searchResultContainer} key={item.id}>
                <Text>{item.name}</Text>
                <Text>{item.time}</Text>
                <Text>{item.details}</Text>
              </View>
            </View>
          }
          />
        </View>
      )
    }

    const noResult = () => {
      return (
        <View>
          {this.state.loading &&
            <View><Text>LoadingScreen goes here</Text></View>
          }
          <Text>No results could be found.</Text>
        </View>
      )
    }

    // if search category is beer... do... else if store... do... else if brewery... do...
    return (
      <ScrollView style={styles.container}>
        <View>
          <SearchBar
            showLoading
            lightTheme
            ref={search => this.search = search}
            onChangeText={(text) => { this.setState({input: text}) }}
            value={this.state.input}
            placeholder='Type Here...' />
          <View style={styles.pickerValueContainer}>
            <Picker
              selectedValue={this.state.pickerValue}
              style={styles.pickerValueContainer}
              onValueChange={(itemValue) => this.setState({pickerValue: itemValue})}>
              <Picker.Item label="Beers" value="Beer" />
              <Picker.Item label="Breweries" value="Brewery" />
              <Picker.Item label="Stores" value="Store" />
              <Picker.Item label="Events" value="Event" />
            </Picker>
          </View>
        </View>
          
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
              eventSearch()
            }
            {this.state.searchResultCategory === "None" &&
              noResult()
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
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  listItemContainer: {
    borderWidth: 1,
    borderStyle: "dotted",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  contentContainer: {
    paddingBottom: 15,
    borderWidth: 0.5,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "dotted",
    flexDirection: "row",
    justifyContent: 'center', 
    alignItems: 'center',
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
  searchResultContainer: {
    borderWidth: 1,
    borderStyle: "dotted",
    flexDirection: "column",
    width: '90%',
    margin: 10,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  pickerValueContainer: {
    flex: 0.5,
    width: '100%',
    justifyContent: 'center', 
    alignItems: 'center',
  },
});
