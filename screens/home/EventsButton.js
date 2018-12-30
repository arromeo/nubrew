import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class RecommendedButton extends React.Component {
  render() {
    return (
      <TouchableOpacity 
        style={styles.recommendationContainer}
        onPress={() => {
          this.props.navigate('Events');
        }}>
        <Ionicons style={styles.buttonIcon} name="md-notifications" size={25} color="#FFBC02"/>
        <Text style={styles.buttonLabel}>  Local Events</Text>
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
})