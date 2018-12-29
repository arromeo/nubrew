import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import AddressCard from '../components/AddressCard';

export default class EventDetails extends React.Component {
  render() {
    const event = this.props.data[0];
    console.log(event);
    return (
      <View style={styles.container}>
        <Image style={{height: 200, width:300}} source={{uri: event.img_url}} resizeMode='contain'/>

        <AddressCard type={event}/>

        <Text style={styles.description}>{event.description}</Text>
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
  description: {
    marginTop: 15
  },
});