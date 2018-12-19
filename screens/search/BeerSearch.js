import React from 'react';
import { TouchableOpacity, View, Text, FlatList } from 'react-native';

export default class BeerSearch extends React.Component {
  render() {
    const styles = this.props.styles;
    return (
        <FlatList
        data={this.props.data}
        keyExtractor={item => item.beer_id.toString()}
        renderItem={({item}) => 
          <TouchableOpacity 
            style={styles.listItemContainer}
            onPress={() => {
              this.props.navigate('Detail', {
                category: "Beer",
                id: item.beer_id,
              })}
            }
          >
            <View style={styles.searchResultContainer}>
              <Text>Brewery: {item.brewery_name}'s</Text>
              <Text>Beer Name: {item.beer_name}</Text>
              <Text>Type: {item.category}</Text>
              <Text>{item.beer_description}</Text>
              <Text>IBU: {item.ibu} - ABV: {item.abv}</Text>
            </View>
          </TouchableOpacity>
        }
        />
    )
  }
}
