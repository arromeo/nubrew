import React from 'react';
import { TouchableOpacity, View, Text, FlatList } from 'react-native';

export default class EventDetails extends React.Component {
  render() {
    const styles = this.props.styles;
    return (
        <FlatList
        data={this.props.data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => 
          <TouchableOpacity style={styles.listItemContainer}
            onPress={() => {
              this.props.navigate('Detail', {
                category: "Event",
                id: item.id,
              })}
            }
          >
            <View style={styles.searchResultContainer}>
              <Text>{item.name}</Text>
              <Text>{item.time}</Text>
              <Text>{item.details}</Text>
            </View>
          </TouchableOpacity>
        }
        />
    )
  }
}
