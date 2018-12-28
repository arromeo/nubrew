// make sure this gets deleted at the end and figure out how to set-up proxy
const port = require('../dev_port.json');

import React from 'react';
import { ScrollView, StyleSheet, View, Text, Button, ActivityIndicator } from 'react-native';
import StoreSearch from './search/StoreSearch.js';
import BrewerySearch from './search/BrewerySearch.js';
import EventSearch from './search/EventSearch.js';
import SearchComponent from './search/SearchComponent.js';
import BeerSearch from './search/BeerSearch.js'
import GoToCamera from './goto/GoToCamera.js';

export default class FindScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: null,
      searchResultCategory: null,
      loading: false,
    }
  }

  componentDidUpdate() {
    if (this.props.screenProps.currentSearch && this.props.screenProps.initSearch === true) {
      this.searchDatabase(this.props.screenProps.currentSearch , this.props.screenProps.currentSearchCategory);

      this.props.screenProps.changeSearch('');
      this.props.screenProps.initiateSearch();
    }
  }

  searchDatabase (value, category) {
    if (!value) {
      this.setState({
        loading: false,
      })
    } else {
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
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    const changeInput = (event) => {
      this.props.screenProps.changeSearch(event);
    }

    const pickCategory = (event) => {
      this.props.screenProps.changeSearchCategory(event);
    }


    // if search category is beer... do... else if store... do... else if brewery... do...
    return (
      <View style={{flex: 1}}>
        <ScrollView style={styles.container}>
          <SearchComponent
            input={this.props.screenProps.currentSearch}
            changeInput={changeInput}
            pickerValue={this.props.screenProps.currentSearchCategory}
            pickCategory={pickCategory}/>
            
          <Button 
            title="Search"
            color="#61170E"
            onPress={() => {
              this.searchDatabase(this.props.screenProps.currentSearch , this.props.screenProps.currentSearchCategory);
            }}
            />

          {this.state.loading &&
            <View style={styles.spinner}>
              <ActivityIndicator size={100} color="orange" />
            </View> 
          }
          {!this.state.loading &&
            <View style={styles.searchContainer}>
              {this.state.searchResultCategory === "Beer" &&
                <BeerSearch data={this.state.searchResult} crowdFavorite={true} styles={styles} navigate={navigate}/>
              }
              {this.state.searchResultCategory === "Brewery" &&
                <BrewerySearch data={this.state.searchResult} styles={styles} navigate={navigate}/>
              }
              {this.state.searchResultCategory === "Store" &&
                <StoreSearch data={this.state.searchResult} styles={styles} navigate={navigate}/>
              }
              {this.state.searchResultCategory === "Event" &&
                <EventSearch data={this.state.searchResult} styles={styles} navigate={navigate}/>
              }
              {this.state.searchResultCategory === "None" &&
                <View style={styles.searchResultContainer}>
                  <Text>No results could be found.</Text>
                </View>
              }
              <View style={{height: 100}}/>
            </View>
          }
        </ScrollView>
        <GoToCamera navigate={navigate}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  searchResultContainer: {
    flexDirection: "column",
    width: '90%',
    margin: 10,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  listItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  spinner: {
    margin: 150,
    alignSelf: 'center'
  }
});