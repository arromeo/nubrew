import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { SearchBar } from 'react-native-elements'

export default class FindScreen extends React.Component {
  static navigationOptions = {
    title: 'Find',
  };

  render() {

    const someMethod = () => {
      return;
    }

    return (
      <ScrollView style={styles.container}>
        <View style={styles.searchContainer}>
        <SearchBar
          onChangeText={someMethod}
          onClearText={someMethod}
          placeholder='Type Here...' />

          <View style={styles.searchResultContainer}>
            <Text>Name</Text>
            <Text>Location (if applicable)</Text>
            <Text>Details Details Details Details Details Details Details Details </Text>
          </View>
          <View style={styles.searchResultContainer}>
            <Text>Name</Text>
            <Text>Location (if applicable)</Text>
            <Text>Details Details Details Details Details Details Details Details </Text>
          </View>
          <View style={styles.searchResultContainer}>
            <Text>Name</Text>
            <Text>Location (if applicable)</Text>
            <Text>Details Details Details Details Details Details Details Details </Text>
          </View>
          <View style={styles.searchResultContainer}>
            <Text>Name</Text>
            <Text>Location (if applicable)</Text>
            <Text>Details Details Details Details Details Details Details Details </Text>
          </View>
          <View style={styles.searchResultContainer}>
            <Text>Name</Text>
            <Text>Location (if applicable)</Text>
            <Text>Details Details Details Details Details Details Details Details </Text>
          </View>
          
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 15,
    paddingBottom: 15,
    borderWidth: 0.5,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "dotted",
    flexDirection: "row",
    justifyContent: 'center', 
    alignItems: 'center',
  },
  recommendationContainer: {
    borderWidth: 1,
    borderStyle: "dotted",
    flexDirection: "column",
    width: '45%',
    margin: 10,
  },
  bottomOptionsContainer: {
    borderWidth: 1,
    borderStyle: "dotted",
    flexDirection: "column",
    width: '28.33%',
    margin: 10,
  },
  searchResultContainer: {
    borderWidth: 1,
    borderStyle: "dotted",
    flexDirection: "column",
    width: '90%',
    margin: 10,
    justifyContent: 'center', 
    alignItems: 'center',
  }
});
