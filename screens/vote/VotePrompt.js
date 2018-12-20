import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GoToCamera from '../goto/GoToCamera.js';

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
          <Image source={{uri: beer.img_url}} style={{height: 200, width: 150}}/>
          <Ionicons name="md-star" size={75} color="goldenrod"/>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.headerFont}>{beer.brewery_name}'s {beer.beer_name}</Text>
          <Text>{beer.category}</Text>
          <View style={styles.contentContainer}>
            <Text>ABV: {beer.abv}</Text>
            <Text>IBU: {beer.ibu}</Text>
          </View>
          <Text>{beer.description}</Text>
        </View>
        <View>
          <Text>Slidebar goes here</Text>
        </View>
        <GoToCamera navigate={this.props.navigate}/>
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
  bottomContainer: {
    flex: 1,
    paddingBottom: 5,
    justifyContent: "center",
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
