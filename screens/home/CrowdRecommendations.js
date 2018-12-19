import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class CrowdRecommendations extends React.Component {
  render() {
    return (
      <TouchableOpacity 
        style={[styles.recommendationContainer, styles.homeScreenFilename]}
        onPress={() => {
          this.props.navigate('CrowdFav');
        }}>
        <Ionicons name="md-medal" size={100} color="black"/>
        <Text>Crowd</Text>
        <Text>Recommendations</Text>
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
})