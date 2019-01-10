
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
      avgIBU: null,
      topStyles: null
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
        totalBeers: data.result.totalTried,
        topStyles: data.result.topStyles
      })})

  }

  componentDidUpdate() {
    let userId = 1;
    if (this.props.screenProps.updateProfile === true) {
      fetch(`${port.DEV_PORT}/api/user/${userId}/stats`)
      .then(res => res.json())
      .then(data => {
        this.props.screenProps.profileUpdate();
        this.setState({
          favoriteBeers: data.result.totalFavorites,
          totalBeers: data.result.totalTried,
          topStyles: data.result.topStyles
        })})
      }
  }

  calculateAvg() {
    let totalIBU = 0;
    this.state.favoriteBeers.forEach(beer => {
      totalIBU += beer.ibu;
    });
    return Math.round(totalIBU / this.state.favoriteBeers.length);
  }

  listCategories() {
    return (
      <View style={styles.topList}>
        <Text style={styles.topListTitle}>Top 3 Categories</Text>
        <Text style={styles.topListItem}>1. {this.state.topStyles[0].category}</Text>
        <Text style={styles.topListItem}>2. {this.state.topStyles[1].category}</Text>
        <Text style={styles.topListItem}>3. {this.state.topStyles[2].category}</Text>
      </View>
    )
  }

  render() {
    const user = this.state.user;
    const logout = () => {
      console.log("This is in the profile screen. We need to implement a log out function here");
    }
    return (
      <View style={styles.container}>
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
          <View style={styles.profileCountContainer}>
            <View style={styles.countBox}>
              <Text style={styles.countNumber}>{ this.props.screenProps.favorites.length}</Text>
              <Text style={styles.countLabel}>Favorites</Text>
            </View>
            <View style={styles.countBox}>
              <Text style={styles.countNumber}>{ this.state.totalBeers.length}</Text>
              <Text style={styles.countLabel}>Tried</Text>
            </View>
            <View style={styles.countBox}>
              <Text style={styles.countNumber}>{ this.calculateAvg() }</Text>
              <Text style={styles.countLabel}>Avg IBU</Text>
            </View>
            <View style={{height: 100, backgroundColor: '#fff'}}></View>
          </View>
        }
        {this.state.topStyles && this.listCategories()}

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            logout()
          }}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
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
    color: '#FFBC02',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20
  },
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  profileContainer: {
    backgroundColor: '#61170E',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 0.5
  },
  profileCountContainer: {
    flexDirection: 'row',
  },
  countBox: {
    flex: 0.33,
    justifyContent: 'center',
    alignItems: 'center'
  },
  countNumber: {
    fontSize: 24
  },
  topList: {
    flex: 0.25,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 10
  },
  topListTitle: {
    fontSize: 18
  },
  topListItem: {
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 15,
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
    backgroundColor: '#61170E',
    borderRadius: 50,
    width: '80%',
    height: 40,
  },
  buttonText: {
    color: '#FFBC02'
  },
  spinner: {
    margin: 150,
    alignSelf: 'center'
  }
})