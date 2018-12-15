import React from 'react';
import { SearchBar } from 'react-native-elements'
import { ScrollView, View, StyleSheet } from 'react-native';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Rate Your Drink!',
  };

  render() {
    const someMethod = () => {
      return;
    }

    return (
      <ScrollView style={styles.container}>
        <View>
          <SearchBar
            onChangeText={someMethod}
            onClearText={someMethod}
            placeholder='Type Here...' />
        </View>
      </ScrollView>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
})