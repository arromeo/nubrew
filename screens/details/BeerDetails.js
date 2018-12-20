import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Slider } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default class BeerDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      thumbImage: 'https://image.flaticon.com/icons/svg/168/168557.svg',
    }
  }
  render() {
    const beer = this.props.data[0];
    return (

      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Image source={{uri: beer.img_url}} style={{height: 200, width: 150}}/>
          <View style={styles.verticalContainer}>
            <TouchableOpacity 
              style={styles.buttonStyle}
              onPress={() => {
                this.props.navigate({
                  routeName: 'Find',
                });
              }}>
              <Ionicons style={styles.buttonIcon} name="md-search" size={25} color="#FFBC02"/>
              <Text style={styles.buttonLabel}>Find</Text>
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
        <View style={styles.sliderContainer}>
          <Ionicons style={styles.buttonIcon} name="md-thumbs-down" size={50} color="red"/>
          <Slider
            style={styles.sliderStyle}
            value={this.state.value}
            thumbTintColor={'green'}
            minimumValue={-1}
            maximumValue={1}
            minimumTrackTintColor={'white'}
            maximumTrackTintColor={'white'}
            thumbImage={"test"}
            onValueChange={value => this.setState({ value })}
          />
          <Ionicons style={styles.buttonIcon} name="md-thumbs-up" size={50} color="green"/>
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
  sliderStyle: {
    flex: 1,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerFont: {
    color: 'black',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
  },
  sliderContainer: {
    flex: 0.5,
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'baseline',
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
