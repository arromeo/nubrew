import React from 'react';
import { ScrollView, StyleSheet, Image, TouchableOpacity, View, Text, FlatList } from 'react-native';

export default class EventSearch extends React.Component {
  render() {
    return (
        <ScrollView style={styles.container}>
            <View>
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
                }}>
                <View style={[styles.eventDetailsContainer, styles.homeScreenFilename]}>
                <View>
                  <Image
                    style={{width: 75, height: 75}}
                    source={{uri: item.img_url }}
                  />
                </View>
                <View style={styles.eventDetails}>
                  <Text style={styles.eventTitle}>{item.name}</Text>
                  <Text>{item.name} @ {item.time}</Text>
                  <Text>{item.city}, {item.province}</Text>
                </View>
              </View>
            </TouchableOpacity>
          }/>
            </View>
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  headerFont: {
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 20,
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
  },
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