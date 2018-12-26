import React from 'react';
import { StyleSheet, View, Text, Slider } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class VoteComponent extends React.Component {
  render() {
    return (
      <View>
        {this.props.voteCast === 'None' &&
          <View style={styles.sliderContainer}>
            <Ionicons style={{zIndex: 2}} name="md-thumbs-down" size={50} color="red"/>
            <Slider
              style={styles.sliderStyle}
              value={this.props.value}
              thumbTintColor={'green'}
              minimumValue={-1}
              maximumValue={1}
              minimumTrackTintColor={'white'}
              maximumTrackTintColor={'white'}
              onSlidingComplete={(event) => {
                this.props.onSlidingComplete(event, this.props.user_id, this.props.navigationParams.id);
              }}
              />
            <Ionicons style={{zIndex: 2}} name="md-thumbs-up" size={50} color="green"/>
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
  sliderStyle: {
    flex: 1,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
    zIndex: 0
  },

  sliderContainer: {
    flex: 0.5,
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
  }
});
