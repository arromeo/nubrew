const knexConfig  = require("../../knexfile");
const knex        = require("knex")(knexConfig['development']);

module.exports = {
  // details route - Beer
  getDetailsByBeer: function (request, response) {
    knex
      .select([
        "beers.img_url AS img_url",
        'ibu',
        'abv',
        'category',
        'beers.id AS beer_id',
        'beers.name AS beer_name',
        'breweries.name AS brewery_name',
        'beers.description AS beer_description',
        'vote'
      ])
      .from("beers")
      .innerJoin('beers_breweries', 'beers_breweries.beer_id', 'beers.id')
      .fullOuterJoin('beers_users_tried', 'beers.id', 'beers_users_tried.beer_id')
      .innerJoin('categories', 'beers.category_id', 'categories.id')
      .innerJoin('breweries', 'breweries.id', 'beers_breweries.brewery_id')
      .where('beers.id', request.body.id)
      .then((result) => {
        response.json({searchResult: result, searchResultCategory: "Beer"});
      })
      .catch(err => {
        console.log(err);
      })
  },

  // details route - brewery
  getDetailsByBrewery: function(request, response) {
    knex
      .select("*")
      .from("breweries")
      .where('id', request.body.id)
      .then((result) => {
        response.json({searchResult: result, searchResultCategory: "Brewery"});
      })
      .catch(err => {
        console.log(err);
      })
  },

  // details route - Event
  getDetailsByEvent: function(request, response) {
    knex
      .select(["*", 'stores.name AS store_name', 'stores.img_url AS img_url'])
      .from("events")
      .innerJoin('stores', 'events.store_id', 'stores.id')
      .where('events.id', request.body.id)
      .then((result) => {
        response.json({searchResult: result, searchResultCategory: "Event"})
      })
      .catch(err => {
        console.log(err);
      })
  },
  
  // details route - store
  getDetailsByStore: function(request, response) {
    knex
      .select("*")
      .from("stores")
      .where('id', request.body.id)
      .then((result) => {
        response.json({searchResult: result, searchResultCategory: "Store"})
      })
      .catch(err => {
        console.log(err);
      })
  }
}