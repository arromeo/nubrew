// make sure this gets deleted at the end and figure out how to set-up proxy
const port = require('../dev_port.json');

import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import FavoriteList from './favorites/FavoriteList.js';
import GoToCamera from './goto/GoToCamera.js';

export default class CrowdRecommendation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      favorites: null,
      loading: true,
    }
  }

  componentDidMount() {

    let url = `${port.DEV_PORT}/api/recommended`;
    fetch(url)
      .then(res => res.json())
      .then(data => this.setState ({
        favorites: data.result,
        loading: false,
      }))
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={{flex: 1}}>
        <ScrollView style={styles.container}>
          {this.state.loading &&  
            <View><Text>LoadingScreen goes here</Text></View>
          }
          {!this.state.loading && 
            <View>
              <FavoriteList data={this.state.favorites} navigate={navigate} crowdFavorite={true}/>
              <View style={{height: 100}}/>
            </View>
          }
          <GoToCamera navigate={navigate}/>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  headerFont: {
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 20,
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
  }
});
