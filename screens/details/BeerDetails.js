import React from 'react';
import { StyleSheet, View, Text, Image} from 'react-native';

export default class BeerDetails extends React.Component {
  render() {
    const beer = this.props.data[0];
    return (
      <View style={styles.container}>
        <Text style={styles.detailsTitle}>{beer.beer_name}</Text>
          <View style={styles.imageContainer}>
            <Image
              style={{width: 200, height: 200}}
              source={{uri: beer.img_url }}
            />
          </View>
          <View>
            <Text style={styles.description}>{beer.beer_description}</Text>
          </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 15
  },
  detailsContainer: {
    flex: 1
  },
  imageContainer: {
    flex: 1,
    backgroundColor: "pink",
  },
  details: {
    flex: 1
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center"
  },
  addressCard: {
    marginLeft: 15,
    marginTop: 15
  },
  description: {
    marginTop: 15
  }
});