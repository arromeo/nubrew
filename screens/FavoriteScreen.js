import React from 'react';
import { ScrollView, StyleSheet, View, Text, FlatList, Image } from 'react-native';

export default class FindScreen extends React.Component {
  static navigationOptions = {
    title: 'Favorites',
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
      {
        name: "Beer4",
        brewery: "Brewery4",
        description: "blah blah blah blah",
        categories_id: "Porter",
        seasonal_id: "Summer",
        ibu: 150,
        abv: 0.05,
        vote_count: 5,
        image: 'url',
        id: 4
      }
    ]

    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={data}
          renderItem={({item}) => 
          <View style={styles.listItemContainer} key={item.id}>
            <Image
                source={
                  __DEV__
                    ? require('../assets/images/robot-dev.png')
                    : require('../assets/images/robot-prod.png')
                }
                style={styles.recommendationImage}
              />
            <View style={styles.searchResultContainer} key={item.id}>
              <Text>Type: {item.categories_id} (Season: {item.seasonal_id})</Text>
              <Text>{`${item.name} (${item.brewery})`}</Text>
              <Text>{item.description}</Text>
              <Text>IBU: {item.ibu} - ABV: {item.abv * 100}%</Text>
            </View>
          </View>
        }
        />
      </ScrollView>
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
    justifyContent: 'center',
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
  }
});
