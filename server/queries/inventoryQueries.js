const knexConfig  = require("../../knexfile");
const knex        = require("knex")(knexConfig['development']);

module.exports = {
  getInventoryByBrewery: function(request, response) {
    knex
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
  },
  getInventoryByStore: function(request, response) {
    knex
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
}