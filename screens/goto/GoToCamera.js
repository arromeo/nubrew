import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class GoToCamera extends React.Component {

  render() {
    return (
      <TouchableOpacity
        style={{
          flex: 0.1,
        }}
        onPress={() => {
          this.props.navigate({
            routeName: 'Rate',
          });
        }}>
        <View style={styles.iconCircle}></View>
          <Ionicons name="md-camera" size={32} color="#FFBC02" style={styles.cameraIcon}/>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  cameraIcon: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  iconCircle: {
    position: 'absolute',
    bottom: 20,
    right: 19,
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#61170E'
  }
})