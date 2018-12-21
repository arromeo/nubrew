import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class GoToCamera extends React.Component {

  render() {
    return (

        <TouchableOpacity style={styles.iconCircle}
          onPress={() => {
            this.props.navigate('Rate');
          }}>
          <Ionicons name="md-camera" size={32} color="#FFBC02"/>
        </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  iconCircle: {
    position: 'absolute',
    bottom: 20,
    right: 19,
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#61170E',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})