// make sure this gets deleted at the end and figure out how to set-up proxy
const port = require('../dev_port.json');

import React from 'react';
import { ScrollView, StyleSheet, View, Text, FlatList, Picker, Button } from 'react-native';
import { SearchBar } from 'react-native-elements'

export default class FindScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      searchCategory: "Select...",
      searchResult: null,
    }
  }
  
  static navigationOptions = {
    title: 'Find',
  };

  render() {

    const searchDatabase = () => {
      return;
    }

    const selectSearchCriteria = (category) => {
      this.setState = {
        searchCategory: category,
      }
    }

    const beerSearch = () => {
      return (
        <FlatList
        data={this.state.searchResult}
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
      )
    }
    
    const storeSearch = () => {
      return (
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
      )
    }

    const brewerySearch = () => {
      return (
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
      )
    }

    const eventSearch = () => {
      return (
        <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => 
          <View style={styles.listItemContainer} key={item.id}>
            <View style={styles.searchResultContainer} key={item.id}>
              <Text>{item.name}</Text>
              <Text>{item.location}</Text>
              <Text>{item.details}</Text>
            </View>
          </View>
        }
        />
      )
    }

    // if search category is beer... do... else if store... do... else if brewery... do...
    return (
      <ScrollView style={styles.container}>
        <View>
          <SearchBar
            showLoading
            lightTheme
            ref={search => this.search = search}
            onChangeText={(text) => { this.setState({input: text}) }}
            value={this.state.input}
            placeholder='Type Here...' />
          <View style={styles.searchCategoryContainer}>
            <Picker
              selectedValue={{height: 50, width: '100%'}}
              style={styles.searchCategoryContainer}
              onValueChange={(itemValue, itemIndex) => this.setState({searchCategory: itemValue})}>
              <Picker.Item label="Beers" value="Beer" />
              <Picker.Item label="Breweries" value="Brewery" />
              <Picker.Item label="Stores" value="Store" />
              <Picker.Item label="Events" value="Event" />
            </Picker>
          </View>
        </View>
          
        <Button 
          title="Search"
          onPress={() => searchDatabase()}
          />
        {this.state.loading &&
          <View><Text>LoadingScreen goes here</Text></View>
        }
        {!this.state.loading &&
          <View style={styles.searchContainer}>
            {this.state.searchCategory === "Beer" &&
              beerSearch()
            }
            {this.state.searchCategory === "Brewery" &&
              brewerySearch()
            }
            {this.state.searchCategory === "Store" &&
              storeSearch()
            }
            {this.state.searchCategory === "Event" &&
              eventSearch()
            }
          </View>
        }
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
  listItemContainer: {
    borderWidth: 1,
    borderStyle: "dotted",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  contentContainer: {
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
  },
  searchCategoryContainer: {
    flex: 0.5,
    width: '100%',
    justifyContent: 'center', 
    alignItems: 'center',
  },
});
