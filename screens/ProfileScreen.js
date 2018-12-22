
// make sure this gets deleted at the end and figure out how to set-up proxy
const port = require('../dev_port.json');

import React from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      user: this.props.screenProps.user_id,
      favoriteBeers: null,
      totalBeers: null,
    }
  }

  componentDidMount() {
    let userId = 1;
    // get user info
    fetch(`${port.DEV_PORT}/api/user/${userId}`)
      .then(res => res.json())
      .then(data => this.setState({
        loading: false,
        user: data.result[0]
      }))

    // get full list of beers the users tried/favorited
    fetch(`${port.DEV_PORT}/api/user/${userId}/stats`)
      .then(res => res.json())
      .then(data => {
        this.setState({
        favoriteBeers: data.result.totalFavorites,
        totalBeers: data.result.totalTried
      })})

  }

  render() {
    const user = this.state.user;

    return (
      <ScrollView style={styles.container}>
        {this.state.loading &&
          <View style={styles.spinner}>
            <ActivityIndicator size={100} color="orange" />
          </View> 
        }
        {!this.state.loading &&
          <View style={styles.profileContainer}>
            <Image style={styles.avatar} source={require('../assets/images/default_profile_pic.png')} />
            <Text style={styles.profileName}>{user.email}</Text>
          </View>
        }
        {!this.state.loading && this.state.favoriteBeers &&
          <View style={styles.profileContainer}>
            <View style={styles.detailsContainer}>
              <Image style={styles.avatar} source={require('../assets/images/beer.png')} />
              <Text>{this.state.favoriteBeers.length} beers favorited.</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Image style={styles.avatar} source={require('../assets/images/beer.png')} />
              <Text>{this.state.totalBeers.length} beers tried</Text>
            </View>
            <TouchableOpacity>

            </TouchableOpacity>
          </View>
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  placeImages: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  profileName: {
    color: '#FEF2B2',
    fontWeight: 'bold',
    marginBottom: 20
  },
  container: {
    flex: 1,
  },
  profileContainer: {
    backgroundColor: '#61170E',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 0.5
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  spinner: {
    margin: 150,
    alignSelf: 'center'
  }
})