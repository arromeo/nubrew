import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View
} from 'react-native';
import { MonoText } from '../../components/StyledText';

export default class RecommendedBeer extends React.Component {
  render() {
    const recommendedBeer = this.props.data;
    return (
      <View style={{flex: 1}}>
        <Text style={styles.contentHeader}>Crowd Favorites</Text>
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
          <Text>{recommendedBeer.brewery_name}'s</Text>
          <Text>{recommendedBeer.beer_name}</Text>
          <MonoText style={styles.codeHighlightText}>IBU: {recommendedBeer.ibu}</MonoText>
          <MonoText style={styles.codeHighlightText}>ABV: {recommendedBeer.abv}</MonoText>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  recommendationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentHeader: {
    textDecorationLine: "underline",
    textAlign: 'center',
    fontWeight: "bold",
    color: "#61170E",
    marginLeft: 10,
    marginTop: 8,
    marginBottom: 5
  }
});
