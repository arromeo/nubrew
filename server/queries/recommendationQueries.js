const knexConfig  = require("../../knexfile");
const knex        = require("knex")(knexConfig['development']);

module.exports = {
  getCrowdRecommendations: function(request, response) {
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
  },
  
}