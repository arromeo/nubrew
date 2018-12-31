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
  // user specific recommendations
  // list of drinks user has not tried
  getListOfDrinksNotTried: function(request, response) {
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
      .where('vote', '0')
      .then((result) => {
        return result;
      })
      .catch(err => {
        console.error(err);
      })
  },

  // list of drinks by category previously liked
  getListBasedOnPreviousLikes: function(request, response) {
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
        return result;
      })
      .catch(err => {
        console.error(err);
      })
  },
  
  // list of drinks by average IBU +- 10
  getListBasedOnAverageIBU: function(request, response) {
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
        return result;
      })
      .catch(err => {
        console.error(err);
      })
  }
}