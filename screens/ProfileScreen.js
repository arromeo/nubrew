
// make sure this gets deleted at the end and figure out how to set-up proxy
const port = require('../dev_port.json');

import React from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator } from 'react-native';

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      user: this.props.screenProps.user_id,
      favoriteBeers: null,
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

    // get full list of beers the users tried
    fetch(`${port.DEV_PORT}/api/user/${userId}/favorites`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
        favoriteBeers: data.result,
      })})
  }

  render() {
    const user = this.state.user;

    return (
      <View style={styles.container}>
        {this.state.loading &&
          <View style={styles.spinner}>
            <ActivityIndicator size={100} color="orange" />
          </View> 
        }
        {!this.state.loading &&
          <View>
            <View style={styles.profileContainer}>
              <Image style={styles.avatar} source={require('../assets/images/default_profile_pic.png')} />
              <Text style={styles.profileName}>{user.email}</Text>
            </View>
          </View>
        }
        {this.state.favoriteBeers &&
          <View>
            <View style={styles.detailsContainer}>
              <Image style={styles.avatar} source={require('../assets/images/beer.png')} />
              <Text>{this.state.favoriteBeers.length} beers favorited.</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Image style={styles.avatar} source={require('../assets/images/beer.png')} />
              <Text>number of beers tried</Text>
            </View>
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 10
  },
  profileName: {
    color: '#FEF2B2',
    fontWeight: 'bold',
    marginBottom: 20
  },
  container: {
    flex: 0.4,
    alignItems: 'center',
    backgroundColor: '#61170E'
  },
  profileContainer: {
    backgroundColor: '#61170E',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  spinner: {
    margin: 150,
    alignSelf: 'center'
  }
})