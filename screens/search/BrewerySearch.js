import React from 'react';
import { ScrollView, StyleSheet, Image, TouchableOpacity, View, Text, FlatList } from 'react-native';

export default class BrewerySearch extends React.Component {
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
                    navigate('Detail', {
                      id: item.id,
                      category: "Event"
                    });
                  this.props.searchDatabase(item.id.toString(), "HighlightEvent");
                }}>
                <View style={[styles.eventDetailsContainer, styles.homeScreenFilename]}>
                <View>
                  <Image
                    style={{width: 75, height: 75}}
                    source={{uri: item.img_url }}
                  />
                </View>
                <View>
                  <Text style={styles.eventTitle}>{item.name}</Text>
                  <Text style={styles.eventDetails}>{item.street_address}</Text>
                  <Text style={styles.eventDetails}>{item.city}, {item.province}</Text>
                  <Text style={styles.eventDetails}>{item.postal_code}</Text>
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
    marginLeft: 7,
    justifyContent: "center",
    fontSize: 11
  },
  eventTitle: {
    marginLeft: 5,
    fontWeight: "bold"
  }
});