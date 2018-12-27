// make sure this gets deleted at the end and figure out how to set-up proxy
const port = require('../dev_port.json');

import React from 'react';
import { ScrollView, View, ActivityIndicator, StyleSheet } from 'react-native';
import BeerSearch from './search/BeerSearch.js';

export default class InventoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    }
  }

  componentDidMount() {
    const navigationParams = this.props.navigation.state.params;
    const data = {
      id: navigationParams.id,
      category: navigationParams.category,
    }
    fetch(`${port.DEV_PORT}/api/:location_id/inventory`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          data: data.result,
        })
      })
      .catch(err => {
        console.error(err);
      })
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <ScrollView style={styles.container}>
        {!this.state.data &&
          <View style={styles.spinner}>
            <ActivityIndicator size={100} color="orange" />
          </View> 
        }
        {this.state.data &&
          <BeerSearch data={this.state.data} navigate={navigate}/>
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  spinner: {
    margin: 200,
    alignSelf: 'center'
  },
})