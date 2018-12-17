
// make sure this gets deleted at the end and figure out how to set-up proxy
const port = require('../dev_port.json');

import React from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class CameraScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      user: null,
    }
  }
  static navigationOptions = {
    title: 'Profile',
  };

  componentDidMount() {
    // TODO find out a way to pass userID dynamically between stacks
    let userId = 1;
    let url = `${port.DEV_PORT}/api/user/${userId}`;
    fetch(url)
      .then(res => res.json())
      .then(data => this.setState ({
        loading: false,
        user: data.result[0]
      }))
  }

  render() {
    const user = this.state.user;

    return (
      <View style={styles.container}>
        {this.state.loading && 
          <View><Text>LoadingScreen goes here</Text></View>
        }
        {!this.state.loading &&
            <View style={{flex: 1}}>
              <View style={styles.profileContainer}>
                <Image style={styles.avatar} source={require('../assets/images/default_profile_pic.png')} />
                <Text style={styles.profileName}>{user.email}</Text>
              </View>
              <View style={styles.statsContainer}>
                <View style={styles.statBox}>
                  <Text style={styles.stat}>45</Text>
                  <Text style={styles.statLabel}>Rated</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.stat}>10</Text>
                  <Text style={styles.statLabel}>Favorited</Text>
                </View>
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
    flex: 0.6,
    backgroundColor: '#FFFFFF', 
  },
  statsContainer: {
    flex: 0.2,
    flexDirection: 'row',
    backgroundColor: 'tan'
  },
  statBox: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  stat: {
    fontSize: 20
  },
  statLabel: {
    fontSize: 15
  },
  profileContainer: {
    backgroundColor: '#693C12',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
})