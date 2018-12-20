import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class CrowdRecommendation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      favorites: null,
      loading: true,
    }
  }
  render() {
    const beer = this.props.data;
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.horizontalContainer}>
            <Image source={{uri: beer.img_url}} style={{height: 200, width: 150}}/>
            <View style={styles.verticalContainer}>
              <Text>Search by Text</Text>
              <Text>Add to favorites</Text>
            </View>
          </View>
        </View>
        <View style={styles.verticalContainer}>
          <Text style={styles.headerFont}>{beer.brewery_name}'s {beer.beer_name}</Text>
          <Text>{beer.category}</Text>
          <View style={styles.contentContainer}>
            <Text>ABV: {beer.abv}</Text>
            <Text>IBU: {beer.ibu}</Text>
          </View>
          <Text>{beer.description}</Text>
        </View>
        <View style={styles.verticalContainer}>
          <Text>Slidebar goes here</Text>
        </View>
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
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
  },
  verticalContainer: {
    flex: 0.5,
    paddingBottom: 5,
    justifyContent: "center",
    alignItems: 'center',
  },
  horizontalContainer: {
    flex: 0.5,
    paddingBottom: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center',
  },
});
