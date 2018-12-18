import React from 'react';
import { View, Picker, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';

export default class SearchComponent extends React.Component {
  render() {
    return (
      <View>
        <SearchBar
          showLoading
          lightTheme
          ref={search => this.search = search}
          onChangeText={(event) => this.props.changeInput(event)}
          value={this.props.input}
          placeholder='Type Here...' />
        <View style={styles.pickerValueContainer}>
          <Picker
            selectedValue={this.props.pickerValue}
            style={styles.pickerValueContainer}
            onValueChange={(event) => this.props.pickCategory(event)}>
            <Picker.Item label="Beers" value="Beer" />
            <Picker.Item label="Breweries" value="Brewery" />
            <Picker.Item label="Stores" value="Store" />
            <Picker.Item label="Events" value="Event" />
          </Picker>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  pickerValueContainer: {
    flex: 0.5,
    width: '100%',
    justifyContent: 'center', 
    alignItems: 'center',
  },
});

