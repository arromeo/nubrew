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
      <View>
        <View>
          <Image source={beer.img_url} size={100}/>
          <Ionicons name="md-star" size={32} color="yellow"/>
        </View>
        <View>
          <Text>{beer.brewery_name}'s {beer.beer_name}</Text>
          <Text>{beer.category}</Text>
          <View>
            <Text>ABV: {beer.abv}</Text>
            <Text>IBU: {beer.ibu}</Text>
          </View>
          <Text>{beer.description}</Text>
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
  }
});
