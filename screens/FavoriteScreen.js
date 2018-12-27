// make sure this gets deleted at the end and figure out how to set-up proxy
const port = require('../dev_port.json');

import React from 'react';
import { ScrollView, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import FavoriteList from './favorites/FavoriteList.js';
import GoToCamera from './goto/GoToCamera.js';


export default class FindScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={{flex: 1}}>
        <ScrollView style={styles.container}>
          {this.state.loading &&
            <View style={styles.spinner}>
              <ActivityIndicator size={100} color="orange" />
            </View> 
          }
          {!this.state.loading && 
            <View>
              <FavoriteList data={this.props.screenProps.favorites} navigate={navigate} crowdFavorite={false} />
            </View>
          }
          <View style={{height: 100}}/>
        </ScrollView>
        <GoToCamera navigate={navigate}/>
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
  },
  spinner: {
    margin: 150,
    alignSelf: 'center'
  }
});
