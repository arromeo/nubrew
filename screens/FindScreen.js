// make sure this gets deleted at the end and figure out how to set-up proxy
const port = require('../dev_port.json');

import React from 'react';
import { ScrollView, StyleSheet, View, Text, FlatList, Image } from 'react-native';
import { SearchBar } from 'react-native-elements'

export default class FindScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: null,
    }
  }
  
  static navigationOptions = {
    title: 'Find',
  };

  render() {
    const data = [
      {
        name: "Beer1",
        brewery: "Brewery1",
        description: "blah blah blah blah",
        categories_id: "Pale Ale",
        seasonal_id: "Summer",
        ibu: 150,
        abv: 0.05,
        vote_count: 5,
        image: 'url',
        id: 1,
      },
      {
        name: "Beer2",
        brewery: "Brewery2",
        description: "blah blah blah blah",
        categories_id: "Winter Ale",
        seasonal_id: "Winter",
        ibu: 150,
        abv: 0.05,
        vote_count: 5,
        image: 'url',
        id: 2,
      },
      {
        name: "Beer3",
        brewery: "Brewery3",
        description: "blah blah blah blah",
        categories_id: "Hefenweizen",
        seasonal_id: "Summer",
        ibu: 150,
        abv: 0.05,
        vote_count: 5,
        image: 'url',
        id: 3,
      },
    ]

    const someMethod = () => {
      return;
    }

    const beerSearch = () => {
      return (
        <ScrollView style={styles.container}>
          <View style={styles.searchContainer}>
          <SearchBar
            onChangeText={someMethod}
            onClearText={someMethod}
            placeholder='Type Here...' />

            <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => 
              <View style={styles.listItemContainer} key={item.id}>
                <View style={styles.searchResultContainer} key={item.id}>
                  <Text>Type: {item.categories_id}</Text>
                  <Text>{`${item.name} (${item.brewery})`}</Text>
                  <Text>{item.description}</Text>
                  <Text>IBU: {item.ibu} - ABV: {item.abv * 100}%</Text>
                </View>
              </View>
            }
            />
            
          </View>
        </ScrollView>
      )
    }
    
    const storeSearch = () => {
      return (
        <ScrollView style={styles.container}>
          <View style={styles.searchContainer}>
          <SearchBar
            onChangeText={someMethod}
            onClearText={someMethod}
            placeholder='Type Here...' />

            <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => 
              <View style={styles.listItemContainer} key={item.id}>
                <View style={styles.searchResultContainer} key={item.id}>
                  <Text>{item.name}</Text>
                  <Text>{item.location}</Text>
                </View>
              </View>
            }
            />
            
          </View>
        </ScrollView>
      )
    }

    const brewerySearch = () => {
      return (
        <ScrollView style={styles.container}>
          <View style={styles.searchContainer}>
          <SearchBar
            onChangeText={someMethod}
            onClearText={someMethod}
            placeholder='Type Here...' />

            <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => 
              <View style={styles.listItemContainer} key={item.id}>
                <View style={styles.searchResultContainer} key={item.id}>
                  <Text>{item.name}</Text>
                  <Text>{item.location}</Text>
                </View>
              </View>
            }
            />
            
          </View>
        </ScrollView>
      )
    }

    // if search category is beer... do... else if store... do... else if brewery... do...
    return beerSearch();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  listItemContainer: {
    borderWidth: 1,
    borderStyle: "dotted",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
  bottomOptionsContainer: {
    borderWidth: 1,
    borderStyle: "dotted",
    flexDirection: "column",
    width: '28.33%',
    margin: 10,
  },
  searchResultContainer: {
    borderWidth: 1,
    borderStyle: "dotted",
    flexDirection: "column",
    width: '90%',
    margin: 10,
    justifyContent: 'center', 
    alignItems: 'center',
  }
});
