const express = require('express');
const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig['development']);

const app = express();
const PORT = 5000;

app.use(require("body-parser").json())

app.get('/api/test', (request, response) => {
  response.json({result: 'Connection to NuBeer API successful!'});
});

// Fetches two events and a featured beer that's relevent to the index page.
app.get('/api/index', (request, response) => {
  knex
    .select(
      'details',
      'events.id',
      'events.name AS event_name',
      'stores.name AS store_name',
      'time')
    .from("events")
    .innerJoin('stores', 'events.store_id', 'stores.id')
    .then((eventsResults) => {
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
          result: {
            events: eventsResults,
            featured_beer: beerResults
          }
        })
      })
      .catch((err) => {
        console.error(err);
      });
    });
});

// Returns information needed for user profile page
app.get('/api/user/:user_id', (request, response) => {
  knex
  .select(
    'first_name',
    'last_name',
    'email')
  .from('users')
  .where('users.id', request.params.user_id)
  .then((result) => {
    response.json({
      result
    })
  })
  .catch((err) => {
    console.error(err);
  })
})

// Returns an array of beers currently in favorites.
app.get('/api/user/:user_id/favorites', (request, response) => {
  knex
    .select([
      'beers_users_tried.beer_id AS id',
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
    .then((result) => {
      response.json({
        result
      });
    })
    .catch((err) => {
      console.error("This is the error " + err);
    });
});

// Returns list of recommended beers.
// TODO: This currently contains a list of all untried beers. A recommendation
// algorithm should be implemented here.
app.get('/api/user/:user_id/recommended', (request, response) => {

  knex
    .select('beer_id')
    .from('beers_users_tried')
    .where('user_id', request.params.user_id)
    .then((triedResult) => {
      triedResult = triedResult.map(item => item.beer_id);
      knex
        .select([
          'category',
          'beers.name AS beer_name',
          'breweries.name AS brewery_name',
          'ibu',
          'abv',
          'img_url'])
        .from('beers')
        .innerJoin('beers_breweries', 'beers.id', 'beers_breweries.beer_id')
        .innerJoin('breweries', 'beers_breweries.brewery_id', 'breweries.id')
        .innerJoin('categories', 'beers.category_id', 'categories.id')
        .whereNotIn('beers.id', triedResult)
        .then((result) => {
          response.json({result});
        })
        .catch((err) => {
          console.error(err);
        })
    })
    .catch((err) => {
      console.error(err);
    });

})

// Returns a list of all beers.
app.get('/api/beers', (request, response) => {
  knex
  .select([
    'category',
    'beers.name AS beer_name',
    'breweries.name AS brewery_name',
    'ibu',
    'abv',
    'img_url'])
  .from('beers')
  .innerJoin('beers_breweries', 'beers.id', 'beers_breweries.beer_id')
  .innerJoin('breweries', 'beers_breweries.brewery_id', 'breweries.id')
  .innerJoin('categories', 'beers.category_id', 'categories.id')
  .then((result) => {
    response.json({result});
  })
  .catch((err) => {
    console.error(err);
  });
})

// Returns beers sold by store.
app.get('/api/store/:store_id/inventory', (request, response) => {
  knex
    .select([
      'category',
      'beers.name AS beer_name',
      'breweries.name AS brewery_name',
      'ibu',
      'abv',
      'img_url'])
    .from('beers_stores')
    .innerJoin('beers', 'beers_stores.beer_id', 'beers.id')
    .innerJoin('stores', 'beers_stores.store_id', 'stores.id')
    .innerJoin('beers_breweries', 'beers.id', 'beers_breweries.beer_id')
    .innerJoin('breweries', 'beers_breweries.brewery_id', 'breweries.id')
    .innerJoin('categories', 'beers.category_id', 'categories.id')
    .where('beers_stores.store_id', request.params.store_id)
    .then((result) => {
      response.json({
        result
      });
    })
    .catch((err) => {
      console.error(err);
    });
});

// Returns list of beers made by brewery.
app.get('/api/brewery/:brewery_id/beers', (request, response) => {
  knex
    .select([
      'category',
      'beers.name AS beer_name',
      'breweries.name AS brewery_name',
      'ibu',
      'abv',
      'img_url'])
    .from('beers_breweries')
    .innerJoin('breweries', 'beers_breweries.brewery_id', 'breweries.id')
    .innerJoin('beers', 'beers_breweries.beer_id', 'beers.id')
    .innerJoin('categories', 'beers.category_id', 'categories.id')
    .where('beers_breweries.brewery_id', request.params.brewery_id)
    .then((result) => {
      response.json({
        result
      });
    })
    .catch((err) => {
      console.error(err);
    });
});

// Returns list of upcoming events.
app.get('/api/events', (request, response) => {
  knex
    .select([
      'events.details AS event_details',
      'stores.name AS store_name',
      'events.name AS event_name',
      'time'
      ])
    .from('events')
    .innerJoin('stores', 'events.store_id', 'stores.id')
    .then((result) => {
      response.json({
        result
      })
    })
    .catch((err) => {
      console.error(err);
    });
});

app.post('/api/find', (request, response) => {
  switch (request.body.category) {
    case "Beer":
      break;
    case "Beer":
    break;
    case "Beer":
    break;
    case "Beer":
    break;
  }
})

app.listen(PORT, () => {
  console.log('Listening on port 5000....');
});