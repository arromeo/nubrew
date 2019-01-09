import React from 'react';
import { ScrollView, StyleSheet, Image, TouchableOpacity, View, Text, FlatList } from 'react-native';

export default class EventSearch extends React.Component {

  distanceTo = (item) => {
    return item.distanceTo ? (<Text style={styles.distance}>{item.distanceTo} kms</Text>) : undefined;
  }

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
                      category: "Store"
                    });
                }}>
                  <View style={[styles.eventDetailsContainer, styles.homeScreenFilename]}>
                  <View style={{flexDirection: "row"}}>

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
                  <View style={styles.distance}>
                    {this.distanceTo(item)}
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
  distance: {
    fontSize: 16
  },
  contentContainer: {
    paddingBottom: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'flex-start',
  },
  eventDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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