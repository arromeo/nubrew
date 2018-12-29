import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Slider } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class VoteComponent extends React.Component {
  render() {
    return (
      <View>
        {this.props.voteCast === 'None' &&
          <View style={styles.voteContainer}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                this.props.updateVote(-1, this.props.navigationParams.id, this.props.user_id)
              }}>
              <Ionicons style={{zIndex: 2}} name="md-thumbs-down" size={45} color="red"/>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                this.props.updateVote(1, this.props.navigationParams.id, this.props.user_id)
              }}>
              <Ionicons style={{zIndex: 2}} name="md-thumbs-up" size={45} color="green"/>
            </TouchableOpacity>
          </View>
        }
        {this.props.voteCast === 'Liked' &&
          <View style={styles.confirmationContainer}>
            <Ionicons name="md-thumbs-up" size={80} color="green"/>
          </View>
        }
        {this.props.voteCast === 'Disliked' &&
          <View style={styles.confirmationContainer}>
            <Ionicons name="md-thumbs-down" size={80} color="red"/>
          </View>
        }
      </View>
    )
  }
}
const styles = StyleSheet.create({
  voteContainer: {
    flex: 0.5,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 60,
    paddingRight: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center',
  },
  confirmationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    flex: 0.2,
    padding: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    opacity: 0.8,
  },
});
