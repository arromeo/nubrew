import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class CrowdFavorite extends React.Component {
  render() {
    return (
      <TouchableOpacity 
        style={[styles.recommendationContainer, styles.homeScreenFilename]}
        onPress={() => {
          this.props.navigate('CrowdFav');
        }}>
        <Ionicons style={styles.buttonIcon} name="md-contacts" size={25} color="#FFBC02"/>
        <Text style={styles.buttonLabel}>  Crowd Favorites</Text>
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  recommendationContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    width: '100%',
    flex: 0.2,
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
})