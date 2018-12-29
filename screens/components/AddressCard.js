import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class AddressCard extends React.Component {
  render() {
    const type = this.props.type;
    return (
      <View style={styles.addressCard}>
        <Text style={styles.detailsTitle}>{type.name}</Text>
        <Text>{type.street_address}</Text>
        <Text>{type.city}, {type.province}</Text>
        <Text>{type.postal_code}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  detailsTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  addressCard: {
    margin: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})