// make sure this gets deleted at the end and figure out how to set-up proxy
const port = require('../../dev_port.json');

import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import VoteComponent from '../vote/VoteComponent.js';


export default class BeerDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      thumbImage: 'https://image.flaticon.com/icons/svg/168/168557.svg',
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
          favorited: found,
        })
      })
      .catch(err => {
        console.log(err)
      });
  }

  render() {
    const updateVote = (vote, beer_id, user_id) => {
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
        this.setState({
          favorited: data.favorited
        })
      })
      .catch((error) => {
        console.error(error);
      })
    }

    const voteIndicator = (event, user_id, beer_id) => {
      let vote = 0;
      if (event > 0.8) {
        vote = 1;
        this.setState({
          voteCast: 'Liked',
        })
        updateVote(vote, beer_id, user_id);
      } else if (event < -0.8) {
        vote = -1;
        this.setState({
          voteCast: 'Disliked',
        })
        updateVote(vote, beer_id, user_id);
      }
    }

    const sliderController = (event) => {
      if (event < 0.8 || event > -0.8) {
        this.setState({
          value: 0,
        })
      }
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
                this.props.navigate({
                  routeName: 'Find',
                });
              }}>
              <Ionicons style={styles.buttonIcon} name="md-search" size={25} color="#FFBC02"/>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
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
        <View style={styles.verticalContainer}>
          <Text style={styles.headerFont}>{beer.brewery_name}'s {beer.beer_name}</Text>
          <Text>Style: {beer.category}</Text>
          <View style={styles.verticalContainer}>
            <Text>ABV: {beer.abv}</Text>
            <Text>IBU: {beer.ibu}</Text>
          </View>
          <Text>{beer.beer_description}</Text>
        </View>
        <VoteComponent onValueChange={sliderController} onSlidingComplete={voteIndicator} navigationParams={this.props.navigationParams} value={this.state.value} voteCast={this.state.voteCast}/>
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
  headerFont: {
    color: 'black',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
  },
  verticalContainer: {
    flex: 0.5,
    margin: 10,
    justifyContent: "center",
    alignItems: 'center',
  },
  horizontalContainer: {
    flex: 0.5,
    paddingBottom: 5,
    flexDirection: "row",
    justifyContent: "space-around",
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
