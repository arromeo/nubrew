import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { MonoText } from '../../components/StyledText';

export default class EventList extends React.Component {
  render() {
    
    return (
      <View style={styles.contentContainer}>
        <FlatList
          data={this.props.data}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => 
          <TouchableOpacity
            style={[styles.eventContainer, styles.homeScreenFilename]}
            onPress={() => {
              this.props.navigate({
                routeName: 'Detail',
              });
              this.props.searchDatabase(item.id.toString(), "HighlightEvent");
            }}>
            <View style={[styles.eventDetailsContainer, styles.homeScreenFilename]}>
              <Text>{item.event_name} at {item.store_name}</Text>
              <MonoText style={styles.codeHighlightText}>{item.details.split('').slice(0, 60).join("")}...</MonoText>
            </View>
          </TouchableOpacity>
        }/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 15,
    paddingBottom: 15,
    borderWidth: 0.5,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "dotted",
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  eventDetailsContainer: {
    borderWidth: 1,
    borderStyle: "dotted",
    flexDirection: "column",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
});
