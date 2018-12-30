import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import BeerSearch from './search/BeerSearch';

export default class RecommendationListScreen extends React.Component {
  render() {
    const navigationParams = this.props.navigation.state.params;
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.titleFont}>{navigationParams.title}</Text>
        </View>
        {navigationParams.category === 'notTried' &&
          <BeerSearch data={navigationParams.data} navigate={navigate}/>
        }
        {navigationParams.category === 'Category' &&
          <BeerSearch data={navigationParams.data} navigate={navigate}/>
        }
        {navigationParams.category === 'IBU' &&
          <BeerSearch data={navigationParams.data} navigate={navigate}/>
        }
        <View style={{height: 50}}></View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  textContainer: {
    backgroundColor: '#61170E'
  },
  titleFont: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    paddingTop: 10,
    paddingBottom: 10,
  }
})