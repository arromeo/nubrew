import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class BreweryDetails extends React.Component {
  render() {
    const brewery = this.props.data[0];
    return (
      <View style={styles.container}>
        <Image style={{height: 200, width:300}} source={{uri: brewery.img_url}} resizeMode='contain'/>
        <Text style={styles.detailsTitle}>{brewery.name}</Text>
        <View style={styles.addressCard}>
          <Text>{brewery.street_address}</Text>
          <Text>{brewery.city}, {brewery.province}</Text>
          <Text>{brewery.postal_code}</Text>
        </View>
        <Text style={styles.description}>{brewery.description}</Text>
        <TouchableOpacity 
          style={styles.buttonStyle}
          onPress={() => {
            this.props.navigate('Inventory', {
              id: brewery.id,
              category: 'Brewery'
            })
          }}>
          <Ionicons style={styles.buttonIcon} name="md-list" size={25} color="#FFBC02"/>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.buttonStyle}
          onPress={() => {
            this.props.navigate('Map', {
              data: brewery,
            })
          }}>
          <Ionicons style={styles.buttonIcon} name="md-pin" size={25} color="#FFBC02"/>
        </TouchableOpacity>
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
    marginTop: 15,
    alignItems: 'center'
  },
  description: {
    marginTop: 15
  },
  buttonStyle: {
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    flex: 0.2,
    width: '75%',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#61170E',
  },
});