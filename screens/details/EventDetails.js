import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class EventDetails extends React.Component {
  render() {
    const event = this.props.data[0];
    return (
      <View style={styles.container}>
        <Image style={{height: 200, width:300}} source={{uri: event.img_url}} resizeMode='contain'/>
        <Text style={styles.detailsTitle}>{event.name}</Text>
        <Text style={styles.description}>{event.store_name}</Text>
        <Text style={styles.description}>{event.details}</Text>
        <TouchableOpacity 
          style={styles.buttonStyle}
          onPress={() => {
            this.props.navigate('Map', {
              latitude: event.meridians.latitude,
              longitude: event.meridians.logitude,
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