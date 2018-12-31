const knexConfig  = require("../../knexfile");
const knex        = require("knex")(knexConfig['development']);

module.exports = {
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
  }
}