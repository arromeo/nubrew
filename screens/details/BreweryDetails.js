import React from 'react';
import { StyleSheet, View, Text, Image} from 'react-native';

export default class BreweryDetails extends React.Component {
  render() {
    const brewery = this.props.data[0];
    return (
      <View style={styles.container}>
        <Text style={styles.detailsTitle}>{brewery.name}</Text>
        <Text>Name: {brewery.description}</Text>
        <Text>Name: {brewery.street_address}</Text>
        <Text>Name: {brewery.city}</Text>
        <Text>Name: {brewery.province}</Text>
        <Text>Name: {brewery.postal_code}</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 15
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: "bold",
  }
});