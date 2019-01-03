import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class BeerInformation extends React.Component {
  render() {
    return (
      <View style={styles.verticalContainer}>
        <Text style={styles.headerFont}>{this.props.data.brewery_name}'s {this.props.data.beer_name}</Text>
        <Text>Style: {this.props.data.category}</Text>
        <View style={styles.verticalContainer}>
          <Text>ABV: {this.props.data.abv}</Text>
          <Text>IBU: {this.props.data.ibu}</Text>
        </View>
        <Text>{this.props.data.beer_description}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  verticalContainer: {
    flex: 0.5,
    margin: 10,
    justifyContent: "center",
    alignItems: 'center',
  },
  headerFont: {
    color: 'black',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
  },
})