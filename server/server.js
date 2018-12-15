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
  knex
    .select("*")
    .from("events")
    .then((EventsResults) => {
      knex('beers')
      .select(['*', 'beers.name AS beer_name', 'breweries.name AS brewery_name'])
      .innerJoin('beers_breweries', 'beers.id', 'beers_breweries.beer_id')
      .innerJoin('breweries', 'beers_breweries.brewery_id', 'breweries.id')
      .innerJoin('categories', 'beers.category_id', 'categories.id')
      .then((beerResults) => {
        console.log(beerResults);
        response.json({
          event1: EventsResults[0],
          event2: EventsResults[1],
          beerName: beerResults[0].beer_name,
          breweryName: beerResults[0].brewery_name,
          beerIbu: beerResults[0].ibu,
          category: beerResults[0].category
        })
      })
      .catch((err) => {
        console.error(err);
      });
    });
});

app.listen(PORT, () => {
  console.log('Listening on port 5000....');
});