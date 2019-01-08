// make sure this gets deleted at the end and figure out how to set-up proxy
const port = require('../../dev_port.json');

import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import VoteComponent from '../vote/VoteComponent';
import BeerInformation from '../components/BeerInformation';


export default class BeerDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      voteCast: 'None',
      favorited: false,
    }
  }

  componentDidMount() {
    let url = `${port.DEV_PORT}/api/user/${this.props.user_id}/favorites`
    fetch(url)
      .then(res => res.json())
      .then(data => {
        let found = false;
        data['result'].forEach(beer => {
          if (beer['beer_id'] === this.props.data[0].beer_id) {
            found = true;
          }
        })
        this.setState({
          previousVote: data.vote,
          favorited: found,
        })
      })
      .catch(err => {
        console.log(err)
      });
  }

  render() {
    const updateVote = (vote, beer_id, user_id) => {
      if (vote === 1) {
        this.setState({
          voteCast: 'Liked'
        })
      }
      if (vote === -1) {
        this.setState({
          voteCast: 'Disliked'
        })
      }
      return fetch(`${port.DEV_PORT}/api/user/:user_id/beer/:beer_id/vote`, 
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id, beer_id, vote
        }),
      })
      .catch((error) => {
        console.error(error);
      })
    }

    const addToFavoriteList = (user_id, beer_id) => {
      return fetch(`${port.DEV_PORT}/api/user/:user_id/beer/:beer_id/favorite`, 
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id, beer_id
        }),
      })
      .then(res => res.json())
      .then(data => {
        this.props.updateFavorites();
        this.setState({
          favorited: data.favorited
        })
      })
      .catch((error) => {
        console.error(error);
      })
    }
    
    const beer = this.props.data[0];
    
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Image source={{uri: beer.img_url}} style={{height: 200, width: 150}}/>
          <View style={styles.verticalContainer}>
            <TouchableOpacity 
              style={styles.buttonStyle}
              onPress={() => {
                this.props.changeSearchCategory('Store');
                this.props.changeSearch(':beer=' + beer.beer_id);
                this.props.initiateSearch();
                this.props.navigate('Find', {
                  id: beer.beer_id,
                  category: 'Beer',
                });
              }}>
              <Ionicons style={styles.buttonIcon} name="md-search" size={25} color="#FFBC02"/>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                this.props.profileUpdate();
                addToFavoriteList(this.props.user_id, beer.beer_id);
              }}>
              {this.state.favorited && 
                <View>
                  <Ionicons style={styles.buttonIcon} name="md-star" size={25} color="#FFBC02"/>
                </View>
              }
              {!this.state.favorited && 
                <View>
                  <Ionicons style={styles.buttonIcon} name="md-star" size={25} color="grey"/>
                </View>
              }
            </TouchableOpacity>
          </View>
        </View>
        <BeerInformation data={beer}/>
        <VoteComponent updateVote={updateVote} navigationParams={this.props.navigationParams} value={this.state.value} voteCast={this.state.voteCast} user_id={this.props.user_id} profileUpdate={this.props.profileUpdate} previousVote={this.props.previousVote}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  verticalContainer: {
    flex: 0.5,
    margin: 10,
    justifyContent: "center",
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
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
  },
});
