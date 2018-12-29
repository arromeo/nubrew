import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddressCard from '../components/AddressCard';

export default class StoreDetails extends React.Component {
  render() {
    const store = this.props.data[0];
    return (
      <View style={styles.container}>
        <Image style={{height: 200, width:300}} source={{uri: store.img_url}} resizeMode='contain'/>

        <AddressCard type={store}/>

        <Text>{store.description}</Text>
        <TouchableOpacity 
          style={styles.buttonStyle}
          onPress={() => {
            this.props.navigate('Inventory', {
              id: store.id,
              category: 'Store'
            })
          }}>
          <Ionicons style={styles.buttonIcon} name="md-list" size={25} color="#FFBC02"/>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.buttonStyle}
          onPress={() => {
            this.props.navigate('Map', {
              data: store,
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