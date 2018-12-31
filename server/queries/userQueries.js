const knexConfig  = require("../../knexfile");
const knex        = require("knex")(knexConfig['development']);

module.exports = {
  // Checks if a user has tried a beer and either creates the entry in the table
  // or updates the vote value on the record.
  userVoteOnDrink: function(request, response) {
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
  },
  userFavoriteDrink: function(request, response) {
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
  },
  getUserStats: function(request, response) {
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
  },
  getUserFavoriteDrinkList: function(request, response) {
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
  },
  getUserDetails: function(request, response) {
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
  }
}