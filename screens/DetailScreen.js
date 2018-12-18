// make sure this gets deleted at the end and figure out how to set-up proxy
const port = require('../dev_port.json');

import React from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';

export default class DetailScreen extends React.Component {

  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <Text>Details Page</Text>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
})