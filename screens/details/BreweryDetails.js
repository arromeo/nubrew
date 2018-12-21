import React from 'react';
import { StyleSheet, View, Text, Image} from 'react-native';

export default class BreweryDetails extends React.Component {
  render() {
    const brewery = this.props.data[0];
    return (
      <View style={styles.container}>
        <Image style={{height: 200, width:300}} source={{uri: brewery.img_url}} resizeMode='stretch'/>
        <Text style={styles.detailsTitle}>{brewery.name}</Text>
        <View style={styles.addressCard}>
          <Text>{brewery.street_address}</Text>
          <Text>{brewery.city}, {brewery.province}</Text>
          <Text>{brewery.postal_code}</Text>
        </View>
        <Text style={styles.description}>{brewery.description}</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 15
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  addressCard: {
    marginLeft: 15,
    marginTop: 15
  },
  description: {
    marginTop: 15
  }
});