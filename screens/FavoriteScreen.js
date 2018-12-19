// make sure this gets deleted at the end and figure out how to set-up proxy
const port = require('../dev_port.json');

import React from 'react';
import { ScrollView, StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GoToCamera from './goto/GoToCamera.js';

export default class FindScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      favorites: null,
      loading: true,
    }
  }

  componentDidMount() {

    // need to figure out how to pass userid through different stacks
    let userId = 1;
    let url = `${port.DEV_PORT}/api/user/${userId}/favorites`;
    fetch(url)
      .then(res => res.json())
      .then(data => this.setState ({
        favorites: data.result,
        loading: false,
      }))
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    const data = this.state.favorites;
    
    return (
      <View style={{flex: 1}}>
        <ScrollView style={styles.container}>
          {this.state.loading &&  
            <View><Text>LoadingScreen goes here</Text></View>
          }
          {!this.state.loading && 
            <FlatList
              data={data}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => 
              <View style={styles.listItemContainer}>

                <View>
                  <Image
                      source={
                        __DEV__
                        ? require('../assets/images/robot-dev.png')
                        : require('../assets/images/robot-prod.png')
                      }
                      style={styles.recommendationImage}
                      size={50}
                      />
                </View>

                <View style={styles.searchResultContainer}>
                  <Text>{item.brewery_name}'s</Text>
                  <Text>{item.beer_name}</Text>
                  <Text>Type: {item.category}</Text>
                  <Text>IBU: {item.ibu}</Text>
                  <Text>ABV: {item.abv}</Text>
                </View>

                <View style={styles.optionsContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      navigate({
                        routeName: 'Find',
                        params: {
                          type: 'FavoriteBeerDetail',
                          item
                        }
                    });}}
                  >
                    <Ionicons name="md-search" size={32} color="black"/>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => {
                      console.log("This is the find route")
                    }
                  }>
                    <Ionicons name="md-trash" size={32} color="red"/>
                  </TouchableOpacity>
                </View>
              </View>
            }
            />
          }
        </ScrollView>
        <GoToCamera navigate={navigate}/>
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
  },
  recommendationContainer: {
    borderWidth: 1,
    borderStyle: "dotted",
    flexDirection: "column",
    width: '45%',
    margin: 10,
  },
  listItemContainer: {
    borderWidth: 1,
    borderStyle: "dotted",
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchResultContainer: {
    borderWidth: 1,
    borderStyle: "dotted",
    flexDirection: "column",
    margin: 10,
    justifyContent: 'center', 
    alignItems: 'center',
    textAlign: 'center',
    width: '40%',
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});
