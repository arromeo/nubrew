// make sure this gets deleted at the end and figure out how to set-up proxy
const port = require('../dev_port.json');

import React from 'react';
import { ScrollView, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import BeerSearch from './search/BeerSearch.js';
import GoToCamera from './components/GoToCamera.js';

export default class Recommendations extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      favorites: null,
      notTried: null,
      categories: null,
      ibuRange: null,
      loading: true,
    }
  }

  componentDidMount() {

    let url = `${port.DEV_PORT}/api/user/${this.screenProps.user_id}/recommended`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        switch (data.type) {
          case 'Not Tried':
            this.setState({
              notTried: data.result,
              loading: false,
            })
            return;
          case 'Categories':
            this.setState({
              categories: data.result,
              loading: false,
            })
            return;
        }
      })
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
              <BeerSearch data={this.state.favorites} navigate={navigate} />
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
  spinner: {
    margin: 150,
    alignSelf: 'center'
  }
});