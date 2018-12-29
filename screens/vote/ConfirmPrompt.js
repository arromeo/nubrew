import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class ConfirmPrompt extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        {this.props.couldNotFind &&
          <View style={styles.verticalContainer}>
            <Text style={styles.headerFont}>We couldn't find your drink!</Text>
            <Text style={styles.paragraphFont}>Sometimes the labels change or maybe we don't have it in our database just yet! We'll keep this in mind for the future. Try taking up the entire label in the photo or searching by the drink's name!</Text>
          </View>
        }
        {!this.props.couldNotFind &&
          <View style={styles.verticalContainer}>
            <Text style={styles.headerFont}>{this.props.data.brewery_name}'s {this.props.data.beer_name}</Text>
            <Image source={{uri: this.props.data.img_url}} style={{height: 200, width: 150}}/>
            <Text>Is this the correct drink?</Text>
          </View>
        }
        {this.props.couldNotFind &&
          <View style={styles.contentContainer}>
            <TouchableOpacity 
              style={styles.buttonStyle}
              onPress={() => {
                this.props.resetToCamera()
              }}>
              <Ionicons name="md-camera" size={25} color="white"/>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.buttonStyle}
              onPress={() => {
                this.props.navigate('Find');
              }}>
              <Ionicons name="md-search" size={25} color="red"/>
            </TouchableOpacity>
          </View>
        }
        {!this.props.couldNotFind &&
          <View style={styles.contentContainer}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                this.props.navigate('Detail', {
                  category: "Beer",
                  id: this.props.data.beer_id,
                });
              }}>
              <Ionicons name="md-checkmark-circle-outline" size={25} color="green"/>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.buttonStyle}
              onPress={() => {
                this.props.resetToCamera()
              }}>
              <Ionicons name="md-camera" size={25} color="white"/>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.buttonStyle}
              onPress={() => {
                this.props.navigate('Find');
              }}>
              <Ionicons name="md-close-circle-outline" size={25} color="red"/>
            </TouchableOpacity>
          </View>
        }
      </View>
    )
  }
   
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  headerFont: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
  },
  paragraphFont: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    flex: 1,
    paddingTop: 3,
    width: '90%',
    textAlign: 'center',
    justifyContent: 'center',
  },
  verticalContainer: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
    alignItems: 'center',
  },
  contentContainer: {
    flex: 0.5,
    paddingBottom: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center',
  },
  buttonStyle: {
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    flex: 0.2,
    width: '75%',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#61170E',
  }
});
