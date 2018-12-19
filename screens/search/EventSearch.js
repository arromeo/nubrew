import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

export default class EventSearch extends React.Component {
  render() {
    const styles = this.props.styles;
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
