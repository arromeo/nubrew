import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { MonoText } from '../../components/StyledText';

export default class RecommendedBeer extends React.Component {
  render() {
    const recommendedBeer = this.props.data;
    return (
      <TouchableOpacity 
        style={[styles.recommendationContainer, styles.homeScreenFilename]}
        onPress={() => {
          this.props.navigate({
            routeName: 'Find',
          });
        }}>
        <Image
          source={
            __DEV__
              ? require('../../assets/images/robot-dev.png')
              : require('../../assets/images/robot-prod.png')
          }
          size={100}
        />
        <Text>{recommendedBeer.brewery_name}'s</Text>
        <Text>{recommendedBeer.beer_name}</Text>
        <MonoText style={styles.codeHighlightText}>IBU: {recommendedBeer.ibu}</MonoText>
        <MonoText style={styles.codeHighlightText}>ABV: {recommendedBeer.abv}</MonoText>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  recommendationContainer: {
    borderWidth: 1,
    borderStyle: "dotted",
    flexDirection: "column",
    width: '45%',
    margin: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
});
