
exports.seed = function(knex, Promise) {
  function seedCategoriesTable() {
    knex('categories').del();
    return knex('categories').insert([
      {name: 'Amber'},
      {name: 'Brown'},
      {name: 'Cream'},
      {name: 'IPA'},
      {name: 'Kolsch'},
      {name: 'Pale'},
      {name: 'Scotch'},
      {name: 'Dunkleweizen'},
      {name: 'Hefeweizen'},
      {name: 'Wheat'},
      {name: 'Lager'},
      {name: 'Pilsner'},
      {name: 'Radler'},
      {name: 'Shandy'},
      {name: 'Pale Lager'},
      {name: 'Sour'},
      {name: 'Lambic'},
      {name: 'Stout'},
      {name: 'Porter'},
      {name: 'Belgian'},
      {name: 'Saison'},
      {name: 'Fruit'}
    ]);
  }

  function seedBreweriesTable() {
    knex('breweries').del();

  }

  function seedStoresTable() {
    knex('stores').del();

  }

  function seedSeasonsTable() {
    knex('seasons').del();

  }

  function seedUsersTable() {
    knex('users').del();

  }

  function seedBeersTable() {
    knex('beers').del();

  }

  function seedBeersBreweriesTable() {
    knex('beers_breweries').del();

  }

  function seedBeersStoresTable() {
    knex('beers_stores').del();

  }

  function seedEventsTable() {
    knex('events').del();

  }

  function seedBeersUsersTriedTable() {
    knex('beers_users').del();

  }

  return seedCategoriesTable()
    .then(seedSeasonsTable)
    .then(seedBreweriesTable)
    .then(seedStoresTable)
    .then(seedUsersTable)
    .then(seedBeersTable)
    .then(seedBeersBreweriesTable)
    .then(seedBeersStoresTable)
    .then(seedEventsTable)
    .then(seedBeersUsersTriedTable);

};
