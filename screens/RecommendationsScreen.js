// make sure this gets deleted at the end and figure out how to set-up proxy
const port = require('../dev_port.json');

import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BeerSearch from './search/BeerSearch';

import GoToCamera from './components/GoToCamera.js';

export default class Recommendations extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notTried: null,
      categories: null,
      ibuAverage: null,
      loading: true,
    }
  }

  componentDidMount() {

    let url = `${port.DEV_PORT}/api/user/${this.props.screenProps.user_id}/recommended`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({
          notTried: data['notTried'],
          categories: data['Categories'],
          ibuAverage: data['ibuAverage'],
          loading: false,
        })
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        {this.state.loading &&
          <View style={styles.spinner}>
            <ActivityIndicator size={100} color="orange" />
          </View> 
        }
        {!this.state.loading &&
          <View style={{width: '80%', height: '100%'}}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                navigate('RecommendationList', {
                  category: 'notTried',
                  data: this.state.notTried,
                })
              }}>
              <Ionicons style={styles.buttonIcon} name="md-star" size={25} color="#FFBC02"/>
              <Text style={styles.buttonLabel}>Try Something New</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                  navigate('RecommendationList', {
                    category: 'Category',
                    data: this.state.categories,
                })
              }}>
              <Ionicons style={styles.buttonIcon} name="md-star" size={25} color="#FFBC02"/>
              <Text style={styles.buttonLabel}>By previous likes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                navigate('RecommendationList', {
                  category: 'IBU',
                  data: this.state.ibuAverage,
                })
              }}>
              <Ionicons style={styles.buttonIcon} name="md-star" size={25} color="#FFBC02"/>
              <Text style={styles.buttonLabel}>By IBU Average</Text>
            </TouchableOpacity>
          </View>
        }
        <GoToCamera navigate={navigate}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    margin: 150,
    alignSelf: 'center'
  },
  buttonStyle: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    flex: 0.2,
    width: '100%',
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: '#61170E',
    justifyContent: 'space-between',
  },
  buttonLabel: {
    paddingRight: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    flexWrap: 'wrap',
  },
  buttonIcon: {
    paddingLeft: 20,
  }
});