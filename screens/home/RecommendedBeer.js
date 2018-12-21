import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View
} from 'react-native';

export default class RecommendedBeer extends React.Component {
  render() {
    const recommendedBeer = this.props.data;
    return (
      <View style={{flex: 1, justifyContent: 'flex-start'}}>
        <Text style={styles.contentHeader}>Featured Beer</Text>
        <TouchableOpacity 
          style={[styles.recommendationContainer, styles.homeScreenFilename]}
          onPress={() => {
            this.props.navigate('Detail', {
              id: recommendedBeer.beer_id,
              category: "Beer",
            });
          }}>
                  <Image
                    style={{width: 100, height: 100}}
                    source={{uri: recommendedBeer.img_url }}
                    />
          <Text style={{fontWeight: "bold"}}>{recommendedBeer.beer_name}</Text>
          <Text style={styles.beerDetails}>{recommendedBeer.brewery_name}</Text>
          <Text style={styles.beerDetails}>IBU: {recommendedBeer.ibu}</Text>
          <Text style={styles.beerDetails}>ABV: {recommendedBeer.abv}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  recommendationContainer: {
    flex: 1,
    alignItems: 'center'
  },
  contentHeader: {
    textDecorationLine: "underline",
    textAlign: 'center',
    fontWeight: "bold",
    color: "#61170E",
    marginLeft: 10,
    marginTop: 12,
    marginBottom: 10
  },
  beerDetails: {
    fontSize: 12,
    textAlign: "center"
  }
});
