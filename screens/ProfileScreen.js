
// make sure this gets deleted at the end and figure out how to set-up proxy
const port = require('../dev_port.json');

import React from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, View, Text } from 'react-native';
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
      <ScrollView style={styles.container}>
        {this.state.loading && 
          <View><Text>LoadingScreen goes here</Text></View>
        }
        {!this.state.loading &&
          <View style={styles.profileContainer}>
            <Text>Name: {user.first_name} {user.last_name}</Text>
            <Text>Email: {user.email}</Text>
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
  profileContainer: {
    paddingTop: 15,
    paddingBottom: 15,
    borderWidth: 0.5,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "dotted",
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
})