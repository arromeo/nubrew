// make sure this gets deleted at the end and figure out how to set-up proxy
const port = require('../dev_port.json');

import React from 'react';
import { ScrollView, StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import EventList from './home/EventList.js';
import GoToCamera from './goto/GoToCamera.js';

export default class Events extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      loading: true,
    }
  }

  componentDidMount() {

    let url = `${port.DEV_PORT}/api/events`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState ({
          events: data,
          loading: false,
        })
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    console.log(this.state.events);

    return (
      <View style={{flex: 1}}>
        <ScrollView style={styles.container}>
          {this.state.loading &&  
            <View><Text>LoadingScreen goes here</Text></View>
          }
          {!this.state.loading && 
            <View>
                <FlatList
                  data={this.state.events.result}
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
          }
        </ScrollView>
      </View>
    );
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