import React from 'react';
import { StyleSheet, View, Text, Slider } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class VoteComponent extends React.Component {
  render() {
    return (
      <View>
        {this.props.voteCast === 'None' &&
          <View style={styles.sliderContainer}>
            <Ionicons name="md-thumbs-down" size={50} color="red"/>
            <Slider
              style={styles.sliderStyle}
              value={this.props.value}
              thumbTintColor={'green'}
              minimumValue={-1}
              maximumValue={1}
              minimumTrackTintColor={'white'}
              maximumTrackTintColor={'white'}
              thumbImage={"test"}
              onValueChange={(event) => {
                this.props.onValueChange(event);
              }}
              onSlidingComplete={(event) => {
                this.props.onSlidingComplete(event, this.props.navigationParams.user_id, this.props.navigationParams.id);
              }}
              />
            <Ionicons style={styles.buttonIcon} name="md-thumbs-up" size={50} color="green"/>
          </View>
        }
        {this.props.voteCast === 'Liked' &&
          <View><Text>LIKED</Text></View>
        }
        {this.props.voteCast === 'Disliked' &&
          <View><Text>Disliked</Text></View>
        }
      </View>
    )
  }
}
const styles = StyleSheet.create({
  sliderStyle: {
    flex: 1,
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderContainer: {
    flex: 0.5,
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center',
  },
});
