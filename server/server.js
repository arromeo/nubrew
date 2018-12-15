const express = require('express');
const dataHelper = require('./helpers/dataHelper.js');
const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig['development']);

const app = express();
const PORT = 5000;

app.get('/api/test', (request, response) => {
  response.json({result: 'This should be the new fetched data!'});
});

app.get('/api/index', (request, response) => {
  // Fetches two events and a featured beer that's relevent to the index page.
  knex
    .select("*")
    .from("events")
    .then((EventsResults) => {
      knex('beers')
      .select([
        'beers.name AS beer_name',
        'breweries.name AS brewery_name',
        'img_url',
        'category',
        'ibu',
        'abv'  
      ])
      .innerJoin('beers_breweries', 'beers.id', 'beers_breweries.beer_id')
      .innerJoin('breweries', 'beers_breweries.brewery_id', 'breweries.id')
      .innerJoin('categories', 'beers.category_id', 'categories.id')
      .then((beerResults) => {
        response.json({
          events: EventsResults,
          featured_beer: beerResults
        })
      })
      .catch((err) => {
        console.error(err);
      });
    });
});

app.get('/api/user/:user_id/favorites', (request, response) => {
  knex
    .select([
      'category',
      'beers.name AS beer_name',
      'breweries.name AS brewery_name',
      'ibu',
      'abv',
      'img_url'])
    .from('beers_users_tried')
    .innerJoin('beers', 'beers_users_tried.beer_id', 'beers.id')
    .innerJoin('beers_breweries', 'beers.id', 'beers_breweries.beer_id')
    .innerJoin('breweries', 'beers_breweries.brewery_id', 'breweries.id')
    .innerJoin('categories', 'beers.category_id', 'categories.id')
    .where('beers_users_tried.user_id', request.params.user_id)
    .then((favoritesResult) => {
      console.log(favoritesResult);
      response.json({
        favoritesResult
      })
    })
    .catch((err) => {
      console.error(err);
    });
});

app.listen(PORT, () => {
  console.log('Listening on port 5000....');
});