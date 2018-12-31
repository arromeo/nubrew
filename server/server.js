const express = require('express');
const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig['development']);

const indexQueries = require('./queries/indexQueries.js')
const detailsQueries = require('./queries/detailsQueries.js')

const automlapi = require('./automlvision.js');
const cred = require('../dev_port.json');

const app = express();
const PORT = 5000;

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

// Returns an array of beers currently in favorites.
app.get('/api/recommended', (request, response) => {
  knex
  .select([
    'category',
    'beers.id AS beer_id',
    'beers.name AS beer_name',
    'breweries.name AS brewery_name',
    'ibu',
    'abv',
    'beers.img_url AS img_url'])
  .from('beers')
  .innerJoin('beers_breweries', 'beers.id', 'beers_breweries.beer_id')
  .innerJoin('breweries', 'beers_breweries.brewery_id', 'breweries.id')
  .innerJoin('categories', 'beers.category_id', 'categories.id')
  .orderBy('vote_count', 'desc')
  .limit('5')
  .then((result) => {
    response.json({
      result
    });
  })
  .catch((err) => {
    console.error("This is the error " + err);
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
      'beers_users_tried.beer_id AS beer_id',
      'category',
      'beers.name AS beer_name',
      'breweries.name AS brewery_name',
      'ibu',
      'abv',
      'beers.img_url AS img_url'])
    .from('beers_users_tried')
    .innerJoin('beers', 'beers_users_tried.beer_id', 'beers.id')
    .innerJoin('beers_breweries', 'beers.id', 'beers_breweries.beer_id')
    .innerJoin('breweries', 'beers_breweries.brewery_id', 'breweries.id')
    .innerJoin('categories', 'beers.category_id', 'categories.id')
    .where('beers_users_tried.user_id', request.params.user_id)
    .andWhere('beers_users_tried.favorite', true)
    .then((result) => {
      response.json({
        result
      });
    })
    .catch((err) => {
      console.error("This is the error " + err);
    });
});

// profile page, sends list of drinks user has tried + favorited
app.get('/api/user/:user_id/stats', (request, response) => {
  knex
    .select('*')
    .from('beers_users_tried')
    .where('user_id', request.params.user_id)
    .then((result) => {
      let favorites = [];
      result.forEach(beer => {
        if (beer.favorite === true) {
          favorites.push(beer);
        }
      })
      let data = {
        totalFavorites: favorites,
        totalTried: result
      }
      response.json({
        result: data,
      });
    })
    .catch((err) => {
      console.error("This is the error " + err);
    });
});

// Checks if a user has tried a beer and either creates the entry in the table
// or updates the favorite value on the record.
app.post('/api/user/:user_id/beer/:beer_id/favorite', (request, response) => {
  const data = request.body;
  knex('beers_users_tried')
    .select('*')
    .where('user_id', data.user_id)
    .andWhere('beer_id', data.beer_id)
    .then((existsResult) => {
      if (existsResult.length > 0) {
        knex('beers_users_tried')
          .select('*')
          .where('user_id', data.user_id)
          .andWhere('beer_id', data.beer_id)
          .update('favorite', !existsResult[0].favorite)
          .returning('*')
          .then((result) => {
            response.json({ favorited: result[0].favorite });
          });
      } else {
        knex('beers_users_tried')
          .select('*')
          .insert({
            user_id: data.user_id,
            beer_id: data.beer_id,
            favorite: true,
            vote: 0
          })
          .returning('*')
          .then((favoriteResult) => {
            response.json({ favorited: true });
          });
      }
    });
});

// Checks if a user has tried a beer and either creates the entry in the table
// or updates the vote value on the record.
app.post('/api/user/:user_id/beer/:beer_id/vote', (request, response) => {
  let data = request.body;
  let newVote;
  if (data.vote > 0) {
    newVote = 1;
  } else {
    newVote = -1;
  }
  knex('beers_users_tried')
    .select('*')
    .where('user_id', data.user_id)
    .andWhere('beer_id', data.beer_id)
    .then((existsResult) => {
      if (existsResult.length > 0) {
        knex('beers_users_tried')
          .select('*')
          .where('user_id', data.user_id)
          .andWhere('beer_id', data.beer_id)
          .update('vote', newVote)
          .then()
          .catch((err) => {
            console.error(err);
          });
      } else {
        knex('beers_users_tried')
          .select('*')
          .insert({
            user_id: data.user_id,
            beer_id: data.beer_id,
            favorite: false,
            vote: newVote
          })
          .then()
          .catch((err) => {
            console.error(err);
          });
      }
    })
})

// Returns list of recommended beers.
// TODO: This currently contains a list of all untried beers. A recommendation
// algorithm should be implemented here.
app.get('/api/user/:user_id/recommended', (request, response) => {
  // list of drinks that the user has not tried
  let fullResult = {};
  knex
    .select('beer_id')
    .from('beers_users_tried')
    .where('user_id', request.params.user_id)
    .then((triedResult) => {
      triedResult = triedResult.map(item => item.beer_id);
      return knex
        .select([
          'category',
          'beers.name AS beer_name',
          'breweries.name AS brewery_name',
          'ibu',
          'abv',
          'beers.img_url AS img_url'])
        .distinct('beers.id AS beer_id')
        .from('beers')
        .innerJoin('beers_users_tried', 'beers.id', 'beers_users_tried.beer_id')
        .innerJoin('beers_breweries', 'beers.id', 'beers_breweries.beer_id')
        .innerJoin('breweries', 'beers_breweries.brewery_id', 'breweries.id')
        .innerJoin('categories', 'beers.category_id', 'categories.id')
        .whereNotIn('beers.id', triedResult)
        .then((result) => {
          fullResult['notTried'] = result;

          // list of drinks by category previously liked
          return knex
            .select([
              'category',
              'beers.name AS beer_name',
              'breweries.name AS brewery_name',
              'ibu',
              'abv',
              'beers.img_url AS img_url'])
            .distinct('beers.id AS beer_id')
            .from('beers')
            .innerJoin('beers_users_tried', 'beers.id', 'beers_users_tried.beer_id')
            .innerJoin('beers_breweries', 'beers.id', 'beers_breweries.beer_id')
            .innerJoin('breweries', 'beers_breweries.brewery_id', 'breweries.id')
            .innerJoin('categories', 'beers.category_id', 'categories.id')
            .whereRaw(`category_id IN (
              SELECT DISTINCT category_id FROM beers
              JOIN beers_users_tried ON beers.id = beer_id
              WHERE beers.id IN (SELECT beer_id FROM beers_users_tried 
                                WHERE user_id = ${request.params.user_id}
                                AND vote = 1)
            )`)
            .then((result) => {
              fullResult['Categories'] = result;

              // list of drinks by IBU average +- 10
              return knex
              .select([
                'category',
                'beers.name AS beer_name',
                'breweries.name AS brewery_name',
                'ibu',
                'abv',
                'beers.img_url AS img_url'])
              .distinct('beers.id AS beer_id')
              .from('beers')
              .innerJoin('beers_users_tried', 'beers.id', 'beers_users_tried.beer_id')
              .innerJoin('beers_breweries', 'beers.id', 'beers_breweries.beer_id')
              .innerJoin('breweries', 'beers_breweries.brewery_id', 'breweries.id')
              .innerJoin('categories', 'beers.category_id', 'categories.id')
              .whereRaw(`ibu >
                ((SELECT AVG(ibu) FROM beers
                JOIN beers_users_tried ON beers.id = beer_id
                WHERE beers.id IN (SELECT DISTINCT beer_id FROM beers_users_tried 
                                  WHERE user_id = ${request.params.user_id}
                                  AND vote = 1)) - 10)
              `)
              .whereRaw(`ibu <
                ((SELECT AVG(ibu) FROM beers
                JOIN beers_users_tried ON beers.id = beer_id
                WHERE beers.id IN (SELECT DISTINCT beer_id FROM beers_users_tried 
                                  WHERE user_id = ${request.params.user_id}
                                  AND vote = 1)) + 10)
              `)
              .then((result) => {
                fullResult['ibuAverage'] = result;
                response.json({ fullResult });
              })
              .catch(err => {
                console.error(err);
              })
            })
          })
        })

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
    'beers.img_url AS img_url'])
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

// Returns beers sold by location.
app.post('/api/:location_id/inventory', (request, response) => {
  switch(request.body.category) {
    case "Brewery":
      return knex
        .select([
          'beers.id AS beer_id',
          'category',
          'beers.name AS beer_name',
          'breweries.name AS brewery_name',
          'ibu',
          'abv',
          'beers.img_url as img_url'])
        .from('beers_breweries')
        .innerJoin('beers', 'beers_breweries.beer_id', 'beers.id')
        .innerJoin('breweries', 'beers_breweries.brewery_id', 'breweries.id')
        .innerJoin('categories', 'beers.category_id', 'categories.id')
        .where('beers_breweries.brewery_id', request.body.id)
        .then((result) => {
          response.json({
            result
          });
        })
        .catch((err) => {
          console.error(err);
        });
    case "Store": 
      return knex
        .select([
          'beers.id AS beer_id',
          'category',
          'beers.name AS beer_name',
          'breweries.name AS brewery_name',
          'ibu',
          'abv',
          'beers.img_url as img_url'])
        .from('beers_stores')
        .innerJoin('beers', 'beers_stores.beer_id', 'beers.id')
        .innerJoin('stores', 'beers_stores.store_id', 'stores.id')
        .innerJoin('beers_breweries', 'beers.id', 'beers_breweries.beer_id')
        .innerJoin('breweries', 'beers_breweries.brewery_id', 'breweries.id')
        .innerJoin('categories', 'beers.category_id', 'categories.id')
        .where('beers_stores.store_id', request.body.id)
        .then((result) => {
          response.json({
            result
          });
        })
        .catch((err) => {
          console.error(err);
        });
  }
});

// Gets list of locations that sells a specific beer
// app.get('/api/:beer_id/locations', (request, response) => {
//   knex
//     .select([

//     ])
// })

// Returns list of beers made by brewery.
app.get('/api/brewery/:brewery_id/beers', (request, response) => {
  knex
    .select([
      'category',
      'beers.name AS beer_name',
      'breweries.name AS brewery_name',
      'ibu',
      'abv',
      'beers.img_url AS img_url'])
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
      'events.id AS id',
      'events.details AS event_details',
      'stores.name AS store_name',
      'events.name AS event_name',
      'stores.city',
      'stores.province',
      'stores.img_url AS store_img_url',
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
  // splits the keywords into regex format
  let keywords = request.body.keywords.split(" ").join("|");
  let regex = new RegExp(keywords, 'ig');


  const filterSearch = (criteria, category, queryResult, requiredData) => {
    let searchResult = [];
    queryResult.forEach((list) => {
      let words = ""
      requiredData.forEach((data) => {
        words += `${list[data]} `;
      })
      if (criteria.test(words)) {
        searchResult.push(list);
      }
    })
    if (!searchResult.length) {
      response.json({searchResultCategory: "None"})
    } else {
      response.json({searchResult: searchResult, searchResultCategory: category});
    }
  }

  if (request.body.keywords === "") {
    return;
  } else {
    switch (request.body.category) {
      case "Beer":
        return knex
          .select(["beers.img_url AS img_url", 'category', 'beers.id AS beer_id', 'beers.name AS beer_name', 'breweries.name AS brewery_name', 'beers.description AS beer_description'])
          .from("beers")
          .innerJoin('beers_breweries', 'beers_breweries.beer_id', 'beers.id')
          .innerJoin('categories', 'beers.category_id', 'categories.id')
          .innerJoin('breweries', 'breweries.id', 'beers_breweries.brewery_id')
          .then((result) => {
            filterSearch(regex, "Beer", result, ['beer_name', 'beer_description', 'brewery_name', 'category']);
          })
      case "Brewery":
        return knex
          .select("*")
          .from("breweries")
          .then((result) => {
            filterSearch(regex, "Brewery", result, ['name', 'description', 'address', 'city', 'province', 'img_url']);
          })
      case "Event":
        return knex
          .select(["*", 'stores.name AS store_name', 'stores.img_url AS img_url'])
          .from("events")
          .innerJoin('stores', 'events.store_id', 'stores.id')
          .then((result) => {
            filterSearch(regex, "Event", result, ['name', 'details', 'time']);
          })
      case "Store":
        let beerSearch = new RegExp(/^:beer=[0-9]+$/);
        if (beerSearch.test(request.body.keywords)) {
          let beer_id = request.body.keywords.slice(6);
          return knex
            .select("stores.*")
            .from("stores")
            .innerJoin("beers_stores", "stores.id", "beers_stores.store_id")
            .where('beers_stores.beer_id', beer_id)
            .then((result) => {
              if (result.length > 0) {
                response.json({searchResult: result, searchResultCategory: "Store"});
              } else {
                response.json({searchResultCategory: "None"});
              }
            });
        }

        return knex
          .select("*")
          .from("stores")
          .then((result) => {
            filterSearch(regex, "Store", result, ['name', 'description', 'street_address', 'city', 'postal_code']);
          })
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