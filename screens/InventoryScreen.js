
// make sure this gets deleted at the end and figure out how to set-up proxy
const port = require('../dev_port.json');

import React from 'react';
import { ScrollView, FlatList, Image, StyleSheet, Text, View } from 'react-native';

export default class InventoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <FlatList
            data={this.state.data}
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
                <View>
                  <Image
                    style={{width: 75, height: 75}}
                    source={{uri: item.img_url}}
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
})