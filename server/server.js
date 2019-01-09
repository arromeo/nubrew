const express = require('express');
const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig['development']);

const indexQueries = require('./queries/indexQueries.js');
const detailsQueries = require('./queries/detailsQueries.js');
const recommendationQueries = require('./queries/recommendationQueries.js');
const inventoryQueries = require('./queries/inventoryQueries.js');
const searchQueries = require('./queries/searchQueries.js');
const userQueries = require('./queries/userQueries.js');

const automlapi = require('./automlvision.js');
const cred = require('../dev_port.json');

const app = express();
const PORT = 5000;

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(require("body-parser").json())

app.get('/api/index', (request, response) => {
  indexQueries.getHomepageDetails(request, response);
});

// specific page details
app.post('/api/details', (request, response) => {
  switch (request.body.category) {
    case "Beer":
      return detailsQueries.getDetailsByBeer(request, response);
    case "Brewery":
      return detailsQueries.getDetailsByBrewery(request, response);
    case "Event":
      return detailsQueries.getDetailsByEvent(request, response);
    case "Store":
      return detailsQueries.getDetailsByStore(request, response);
  }
})

// Returns top 5 voted drinks
app.get('/api/crowdrecommendations', (request, response) => {
  recommendationQueries.getCrowdRecommendations(request, response);
});

// Returns information needed for user profile page
app.get('/api/user/:user_id', (request, response) => {
  userQueries.getUserDetails(request, response);
})

// Returns an array of beers currently in favorites.
app.get('/api/user/:user_id/favorites', (request, response) => {
  userQueries.getUserFavoriteDrinkList(request, response);
});

// profile page, sends list of drinks user has tried + favorited
app.get('/api/user/:user_id/stats', (request, response) => {
  userQueries.getUserStats(request, response);
});

// Checks if a user has tried a beer and either creates the entry in the table
// or updates the favorite value on the record.
app.post('/api/user/:user_id/beer/:beer_id/favorite', (request, response) => {
  userQueries.userFavoriteDrink(request, response);
});

// user votes like or dislike on drink (or no indication)
app.post('/api/user/:user_id/beer/:beer_id/vote', (request, response) => {
  userQueries.userVoteOnDrink(request, response);
})

// Returns list of recommended beers.
// algorithm should be implemented here.
app.get('/api/user/:user_id/recommended', (request, response) => {
  // list of drinks that the user has not tried
  Promise.all([
    recommendationQueries.getListOfDrinksNotTried(request, response),
    recommendationQueries.getListBasedOnPreviousLikes(request,response),
    recommendationQueries.getListBasedOnAverageIBU(request, response),
  ])
  .then((data) => {
    let fullResult = {};
    fullResult['notTried'] = data[0];
    fullResult['Categories'] = data[1];
    fullResult['ibuAverage'] = data[2];
    response.json({ fullResult });
  })
  .catch(err => {
    console.error(err);
  });
})

// Returns beers sold by location.
app.post('/api/:location_id/inventory', (request, response) => {
  switch(request.body.category) {
    case "Brewery":
      return inventoryQueries.getInventoryByBrewery(request, response);
    case "Store": 
      return inventoryQueries.getInventoryByStore(request, response);
  }
});

// Returns list of beers made by brewery.
app.get('/api/brewery/:brewery_id/beers', (request, response) => {
  inventoryQueries.getBeersCreatedByBrewery(request, response);
});

// Returns list of upcoming events.
app.get('/api/events', (request, response) => {
  searchQueries.getListOfEvents(request, response);
});

app.post('/api/find', (request, response) => {
  // splits the keywords into regex format
  let keywords = request.body.keywords.split(" ").join("|");
  let regex = new RegExp(keywords, 'ig');

  if (request.body.keywords === "") {
    return;
  } else {
    switch (request.body.category) {
      case "Beer":
        return searchQueries.searchListOfBeers(request, response, regex);
      case "Brewery":
        return searchQueries.searchListOfBreweries(request, response, regex);
      case "Event":
        return searchQueries.searchListOfEvents(request, response, regex);
      case "Store":
        return searchQueries.searchListOfStores(request, response, regex);
    }
  }
})

app.post('/api/visionML', (request, response) => {
  automlapi(request.body, cred, (APIresult) => {
    if (APIresult.displayName === "none_of_the_above") {
      response.json({ couldNotFind: true })
    } else {
      return knex
        .select(['beers.img_url AS img_url', 'abv', 'ibu', 'category', 'beers.id AS beer_id', 'beers.name AS beer_name', 'breweries.name AS brewery_name', 'beers.description AS beer_description'])
        .from("beers")
        .innerJoin('beers_breweries', 'beers_breweries.beer_id', 'beers.id')
        .innerJoin('categories', 'beers.category_id', 'categories.id')
        .innerJoin('breweries', 'breweries.id', 'beers_breweries.brewery_id')
        .where('beer_id', APIresult.displayName)
        .then((result) => {
          response.json({ data: result, confirmDrink: true})
        })
    }
  });
})

app.listen(PORT, () => {
  console.log('Listening on port 5000....');
});