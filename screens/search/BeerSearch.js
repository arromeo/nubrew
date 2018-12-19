import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

export default class BeerSearch extends React.Component {
  render() {
    const styles = this.props.styles;
    return (
      <View>
        <FlatList
        data={this.props.data}
        keyExtractor={item => item.beer_id.toString()}
        renderItem={({item}) => 
          <View style={styles.listItemContainer}>
            <View style={styles.searchResultContainer}>
              <Text>Brewery: {item.brewery_name}'s</Text>
              <Text>Beer Name: {item.beer_name}</Text>
              <Text>Type: {item.category}</Text>
              <Text>{item.beer_description}</Text>
              <Text>IBU: {item.ibu} - ABV: {item.abv}</Text>
            </View>
          </View>
        }
        />
      </View>
    )
  }
}
