// make sure this gets deleted at the end and figure out how to set-up proxy
const port = require('../dev_port.json');

import React from 'react';
import { ScrollView, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import BeerSearch from './search/BeerSearch.js';
import GoToCamera from './components/GoToCamera.js';

export default class CrowdRecommendation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      favorites: null,
      loading: true,
    }
  }

  componentDidMount() {

    let url = `${port.DEV_PORT}/api/crowdrecommendations`;
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
            <View style={styles.spinner}>
              <ActivityIndicator size={100} color="orange" />
            </View> 
          }
          {!this.state.loading && 
            <View>
              <BeerSearch data={this.state.favorites} navigate={navigate}/>
              <View style={{height: 100}}/>
            </View>
          }
         </ScrollView>
         {!this.state.loading &&
          <GoToCamera navigate={navigate} />
          }
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
  spinner: {
    margin: 200,
    alignSelf: 'center'
  }
});
