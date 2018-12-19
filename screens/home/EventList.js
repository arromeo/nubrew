import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { MonoText } from '../../components/StyledText';

export default class EventList extends React.Component {

  
  render() {
    console.log(this.props.data.result);
    
    return (
      <View style={styles.contentContainer}>
        <FlatList
          data={this.props.data}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => 
          <TouchableOpacity
            style={[styles.eventContainer, styles.homeScreenFilename]}
            onPress={() => {
              this.props.navigate('Detail', {
                id: item.id,
                category: "Event"
              });
              this.props.searchDatabase(item.id.toString(), "HighlightEvent");
            }}>
            <View style={[styles.eventDetailsContainer, styles.homeScreenFilename]}>
              <View>
                <Image
                  style={{width: 75, height: 75}}
                  source={{uri: item.store_img_url }}
                />
              </View>
              <View style={styles.eventDetails}>
                <Text style={styles.eventTitle}>{item.event_name}</Text>
                <Text>{item.store_name} @ {item.time}</Text>
                <Text>{item.city}, {item.province}</Text>
              </View>
            </View>
          </TouchableOpacity>
        }/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'flex-start',
  },
  eventDetailsContainer: {
    flexDirection: "row",
    flex: 1,
    margin: 5,
  },
  eventDetails: {
    marginLeft: 15,
    justifyContent: "center"
  },
  eventTitle: {
    fontWeight: "bold"
  }
});
