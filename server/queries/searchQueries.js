const knexConfig  = require("../../knexfile");
const knex        = require("knex")(knexConfig['development']);

const distanceTo = (meridians) => {
  let r = 6371e3;
  let user_lat = 49.281347;
  let user_long = -123.114854;
  let rad1 = (user_lat * (Math.PI / 180));
  let rad2 = (meridians.latitude * (Math.PI / 180));
  let deltaLat = (meridians.latitude - user_lat) * (Math.PI / 180);
  let deltaLong = (meridians.longitude - user_long) * (Math.PI / 180);
  let a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
      Math.cos(rad1) * Math.cos(rad2) *
      Math.sin(deltaLong/2) * Math.sin(deltaLong/2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return ((r * c) / 1000).toFixed(1);
}

const filterSearch = (criteria, category, queryResult, requiredData, response) => {
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

module.exports = {
  getListOfEvents: function(request, response) {
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
  },
  searchListOfBeers: function(request, response, regex) {
    knex
      .select(["beers.img_url AS img_url", 'category', 'beers.id AS beer_id', 'beers.name AS beer_name', 'breweries.name AS brewery_name', 'beers.description AS beer_description'])
      .from("beers")
      .innerJoin('beers_breweries', 'beers_breweries.beer_id', 'beers.id')
      .innerJoin('categories', 'beers.category_id', 'categories.id')
      .innerJoin('breweries', 'breweries.id', 'beers_breweries.brewery_id')
      .then((result) => {
        filterSearch(regex, "Beer", result, ['beer_name', 'beer_description', 'brewery_name', 'category'], response);
      })
  },
  searchListOfBreweries: function(request, response, regex) {
    knex
      .select("*")
      .from("breweries")
      .then((result) => {
        filterSearch(regex, "Brewery", result, ['name', 'description', 'address', 'city', 'province', 'img_url'], response);
      })
  },
  searchListOfEvents: function(request, response, regex) {
    knex
      .select(["*", 'stores.name AS store_name', 'stores.img_url AS img_url'])
      .from("events")
      .innerJoin('stores', 'events.store_id', 'stores.id')
      .then((result) => {
        filterSearch(regex, "Event", result, ['name', 'details', 'time'], response);
      })
  },
  searchListOfStores: function(request, response, regex) {
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

            // Calculates and adds distance to store from user location
            const supplementedResult = result.map(item => {
              item.distanceTo = distanceTo(item.meridians);
              return item;
            });

            // Sorts the results based off off of distanceTo value
            const sortedResult = supplementedResult.sort((a, b) => {
              return a.distanceTo - b.distanceTo;
            });

            response.json({searchResult: sortedResult, searchResultCategory: "Store"});
          } else {
            response.json({searchResultCategory: "None"});
          }
        });
    }

    return knex
      .select("*")
      .from("stores")
      .then((result) => {

        // Calculates and adds distance to store from user location
        const supplementedResult = result.map(item => {
          item.distanceTo = distanceTo(item.meridians);
          return item;
        });

        // Sorts the results based off off of distanceTo value
        const sortedResult = supplementedResult.sort((a, b) => {
          return a.distanceTo - b.distanceTo;
        });

        filterSearch(regex, "Store", sortedResult, ['name', 'description', 'street_address', 'city', 'postal_code'], response);
      })
  }
}