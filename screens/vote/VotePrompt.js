import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Slider } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class VotePrompt extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      favorites: null,
      loading: true,
      value: 0,
    }
  }
  render() {
    const beer = this.props.data;
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Image source={{uri: beer.img_url}} style={{height: 200, width: 150}}/>
          <View style={styles.verticalContainer}>
            <Text>Incorrect beer? Try by name!</Text>
            <TouchableOpacity 
              style={styles.buttonStyle}
              onPress={() => {
                this.props.navigate({
                  routeName: 'Find',
                });
              }}>
              <Ionicons style={styles.buttonIcon} name="md-search" size={25} color="#FFBC02"/>
              <Text style={styles.buttonLabel}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                console.log("favorite function goes in here");
              }}>
              <Ionicons style={styles.buttonIcon} name="md-star" size={25} color="#FFBC02"/>
              <Text style={styles.buttonLabel}>Favorites</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.verticalContainer}>
          <Text style={styles.headerFont}>{beer.brewery_name}'s {beer.beer_name}</Text>
          <Text>Style: {beer.category}</Text>
          <View style={styles.verticalContainer}>
            <Text>ABV: {beer.abv}</Text>
            <Text>IBU: {beer.ibu}</Text>
          </View>
          <Text>{beer.beer_description}</Text>
        </View>
        <View style={styles.verticalContainer}>
          <Slider
            value={this.state.value}
            onValueChange={value => this.setState({ value })}
          />
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
    margin: 10,
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
  buttonStyle: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    flex: 0.2,
    width: '100%',
    borderRadius: 25,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#61170E',
  },
  buttonLabel: {
    color: '#FFBC02'
  },
  buttonIcon: {
    paddingLeft: 8
  }
});
