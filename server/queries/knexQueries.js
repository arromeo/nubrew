const knexConfig  = require("../../knexfile");
const knex        = require("knex")(knexConfig['development']);

module.exports = {
  // Fetches two events and a featured beer that's relevent to the index page.
  getHomepageDetails: function (request, response) {
    return knex
    .select(
      'details',
      'events.id',
      'events.name AS event_name',
      'stores.name AS store_name',
      'stores.city',
      'stores.province',
      'stores.img_url AS store_img_url',
      'time')
    .from("events")
    .innerJoin('stores', 'events.store_id', 'stores.id')
    .then((eventsResults) => {
      knex('beers')
      .select([
        'beers.id AS beer_id',
        'beers.name AS beer_name',
        'breweries.name AS brewery_name',
        'beers.img_url AS img_url',
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
  },

  getDetailsByBeer: function (request, response) {
    return knex
      .select([
        "beers.img_url AS img_url",
        'ibu',
        'abv',
        'category',
        'beers.id AS beer_id',
        'beers.name AS beer_name',
        'breweries.name AS brewery_name',
        'beers.description AS beer_description'])
      .from("beers")
      .innerJoin('beers_breweries', 'beers_breweries.beer_id', 'beers.id')
      .innerJoin('categories', 'beers.category_id', 'categories.id')
      .innerJoin('breweries', 'breweries.id', 'beers_breweries.brewery_id')
      .where('beer_id', request.body.id)
      .then((result) => {
        response.json({searchResult: result, searchResultCategory: "Beer"});
      })
      .catch(err => {
        console.log(err);
      })
  }
}