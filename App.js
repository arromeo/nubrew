import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
const port = require('./dev_port.json');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      favorites: null,
      user_id: 1
    };

    this.updateFavorites = this.updateFavorites.bind(this);
  }

  componentDidMount() {
    let url = `${port.DEV_PORT}/api/user/${this.state.user_id}/favorites`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState ({ favorites: data.result, })
      })
      .catch(error => {
        console.error(error);
      });
  }

  updateFavorites() {
    let url = `${port.DEV_PORT}/api/user/${this.state.user_id}/favorites`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState ({ favorites: data.result, })
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator screenProps={{user_id: this.state.user_id, favorites: this.state.favorites, updateFavorites: this.updateFavorites }}/>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
