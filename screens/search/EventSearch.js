import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

export default class EventSearch extends React.Component {
  render() {
    return (
      <View>
        <FlatList
        data={this.props.data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => 
          <View style={styles.listItemContainer} key={item.id}>
            <View style={styles.searchResultContainer} key={item.id}>
              <Text>{item.name}</Text>
              <Text>{item.time}</Text>
              <Text>{item.details}</Text>
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
