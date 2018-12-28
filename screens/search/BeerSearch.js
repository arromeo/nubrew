import React from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class BeerSearch extends React.Component {
  render() {
    return (
      <FlatList
        data={this.props.data}
        keyExtractor={item => item.beer_id.toString()}
        renderItem={({item}) => 
        <View style={styles.listItemContainer}>

          <View>
            <Image
                source={{ uri: item.img_url }}
                style={{ height: 100, width: 100 }}
                />
          </View>

          <View style={styles.searchResultContainer}>
            <Text style={styles.beerTitle}>{item.beer_name}</Text>
            <Text style={styles.beerDetails}>{item.brewery_name}</Text>
            <Text style={styles.beerDetails}>Type: {item.category}</Text>
          </View>

          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                console.log('beer_id?: ', item);
                this.props.navigate('Detail', {
                  category: "Beer",
                  id: item.beer_id,
                });
            }}>
              <Ionicons name="md-search" size={32} color="black"/>
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
    flexDirection: "column",
    width: '45%',
    margin: 10,
  },
  listItemContainer: {
    flex: 1,
    marginTop: 7,
    marginBottom: 7,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchResultContainer: {
    flexDirection: "column",
    margin: 10,
    justifyContent: 'center', 
    alignItems: 'flex-start',
    textAlign: 'center',
    width: '50%',
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionButton: {
    marginTop: 5,
    marginBottom: 5
  },
  beerTitle: {
    fontWeight: 'bold',
    fontSize: 15
  }, 
  beerDetails: {
    fontSize: 12
  }
});
