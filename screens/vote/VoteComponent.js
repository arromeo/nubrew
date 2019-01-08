import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Slider } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class VoteComponent extends React.Component {
  render() {
    let thumbUpStyle = (vote) => {
      if (vote > 0) {
        return {
          flex: 0.2,
          padding: 10,
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'gold',
          opacity: 0.8,
        }
      } else {
        return {
          flex: 0.2,
          padding: 10,
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'lightgrey',
          opacity: 0.8,
        }
      }
    }

    let thumbDownStyle = (vote) => {
      if (vote < 0) {
        return {
          flex: 0.2,
          padding: 10,
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'gold',
          opacity: 0.8,
        }
      } else {
        return {
          flex: 0.2,
          padding: 10,
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'lightgrey',
          opacity: 0.8,
        }
      }
    }

    return (
      <View>
        {this.props.voteCast === 'None' &&
          <View style={styles.voteContainer}>
            <TouchableOpacity
              style={thumbDownStyle(this.props.previousVote)}
              onPress={() => {
                this.props.profileUpdate();
                this.props.updateVote(-1, this.props.navigationParams.id, this.props.user_id)
              }}>
              <Ionicons name="md-thumbs-down" size={45} color="red"/>
            </TouchableOpacity>
            <TouchableOpacity
              style={thumbUpStyle(this.props.previousVote)}
              onPress={() => {
                this.props.profileUpdate();
                this.props.updateVote(1, this.props.navigationParams.id, this.props.user_id)
              }}>
              <Ionicons name="md-thumbs-up" size={45} color="green"/>
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
