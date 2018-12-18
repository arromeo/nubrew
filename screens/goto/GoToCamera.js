import React from 'react';
import {
  TouchableOpacity,
  StyleSheet
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
          console.log("camera button works")
          this.props.navigate({
            routeName: 'Rate',
          });
        }}>
        <Ionicons name="md-camera" size={32} color="brown" style={styles.cameraIcon}/>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  cameraIcon: {
    paddingBottom: 30,
  }
})