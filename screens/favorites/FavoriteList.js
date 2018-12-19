import React from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class FavoriteList extends React.Component {
  render() {
    return (
      <FlatList
        data={this.props.data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => 
        <View style={styles.listItemContainer}>

          <View>
            <Image
                source={
                  __DEV__
                  ? require('../../assets/images/robot-dev.png')
                  : require('../../assets/images/robot-prod.png')
                }
                style={styles.recommendationImage}
                size={50}
                />
          </View>

          <View style={styles.searchResultContainer}>
            <Text>{item.brewery_name}'s</Text>
            <Text>{item.beer_name}</Text>
            <Text>Type: {item.category}</Text>
            <Text>IBU: {item.ibu}</Text>
            <Text>ABV: {item.abv}</Text>
          </View>

          <View style={styles.optionsContainer}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigate({
                  routeName: 'Detail',
              });
            }}>
              <Ionicons name="md-search" size={32} color="black"/>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => {
                this.props.navigate({
                  routeName: 'Find',
              });
            }}>
              <Ionicons name="md-trash" size={32} color="red"/>
            </TouchableOpacity>
          </View>
        </View>
      }
      />
    )
  }
}

const styles = StyleSheet.create({
  recommendationContainer: {
    borderWidth: 1,
    borderStyle: "dotted",
    flexDirection: "column",
    width: '45%',
    margin: 10,
  },
  listItemContainer: {
    borderWidth: 1,
    borderStyle: "dotted",
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchResultContainer: {
    borderWidth: 1,
    borderStyle: "dotted",
    flexDirection: "column",
    margin: 10,
    justifyContent: 'center', 
    alignItems: 'center',
    textAlign: 'center',
    width: '40%',
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});
