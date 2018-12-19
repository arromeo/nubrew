import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

export default class BrewerySearch extends React.Component {
  render() {
    const styles = this.props.styles;
    return (
      <View>
        <FlatList
        data={this.props.data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => 
          <View style={styles.listItemContainer}>
            <View style={styles.searchResultContainer}>
              <Text>{item.name}</Text>
              <Text>{item.description}</Text>
              <Text>{item.street_address}, {item.city}, {item.province}, {item.postal_code}</Text>
            </View>
          </View>
        }
        />
      </View>
    )
  }
}