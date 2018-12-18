import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

export default class StoreSearch extends React.Component {
  render() {
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

const styles = StyleSheet.create({
  listItemContainer: {
    borderWidth: 1,
    borderStyle: "dotted",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchResultContainer: {
    borderWidth: 1,
    borderStyle: "dotted",
    flexDirection: "column",
    width: '90%',
    margin: 10,
    justifyContent: 'center', 
    alignItems: 'center',
  },
});
