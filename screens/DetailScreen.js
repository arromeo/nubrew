// make sure this gets deleted at the end and figure out how to set-up proxy
const port = require('../dev_port.json');

import React from 'react';
import { ScrollView, View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import BeerDetails from './details/BeerDetails.js';
import StoreDetails from './details/StoreDetails.js';
import BreweryDetails from './details/BreweryDetails.js';
import EventDetails from './details/EventDetails.js';

export default class DetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
      searchResult: null,
      searchResultCategory: null,
      loading: true,
    }

    this.searchDatabaseForDetails = this.searchDatabaseForDetails.bind(this);
  }

  searchDatabaseForDetails(navigationParams) {
    const data = {
      category: navigationParams.category,
      id: navigationParams.id,
    }
    fetch(`${port.DEV_PORT}/api/details`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          category: navigationParams.category,
          searchResult: data.searchResult,
          searchResultCategory: data.searchResultCategory,
          loading: false,
        })
      })
      .catch((error) => {
        console.error(error);
      })
  }
  
  componentDidMount() {
    this.searchDatabaseForDetails(this.props.navigation.state.params);
  }

  componentDidUpdate() {
    if (this.state.category !== this.props.navigation.state.params.category) {
      this.searchDatabaseForDetails(this.props.navigation.state.params);
    }
  }

  render() {
    const user_id = this.props.screenProps.user_id;
    const { navigate } = this.props.navigation
    return (
      <ScrollView style={styles.container}>
          {this.state.loading &&
            <View style={styles.spinner}>
              <ActivityIndicator size={100} color="orange" />
            </View> 
          }
        {!this.state.loading &&
          <View style={styles.searchContainer}>
            {this.state.searchResultCategory === "Beer" &&
              <BeerDetails
                data={this.state.searchResult}
                styles={styles} navigate={navigate}
                navigationParams={this.props.navigation.state.params}
                user_id={user_id}
                updateFavorites={this.props.screenProps.updateFavorites}
                changeSearch={this.props.screenProps.changeSearch}
                changeSearchCategory={this.props.screenProps.changeSearchCategory}
                initiateSearch={this.props.screenProps.initiateSearch}
                profileUpdate={this.props.screenProps.profileUpdate} />
            }
            {this.state.searchResultCategory === "Brewery" &&
              <BreweryDetails data={this.state.searchResult} styles={styles} navigate={navigate}/>
            }
            {this.state.searchResultCategory === "Store" &&
              <StoreDetails data={this.state.searchResult} styles={styles} navigate={navigate}/>
            }
            {this.state.searchResultCategory === "Event" &&
              <EventDetails data={this.state.searchResult} styles={styles} navigate={navigate}/>
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
  spinner: {
    margin: 150,
    alignSelf: 'center'
  }
})