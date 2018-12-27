import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';


export default class EventDetails extends React.Component {
  render() {
    const event = this.props.data[0];
    return (
      <View style={styles.container}>
        <Image style={{height: 200, width:300}} source={{uri: event.img_url}} resizeMode='contain'/>
        <Text style={styles.detailsTitle}>{event.name}</Text>
        <Text style={styles.description}>{event.store_name}</Text>
        <Text style={styles.description}>{event.details}</Text>
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
});