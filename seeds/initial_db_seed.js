
exports.seed = function(knex, Promise) {

  function clearAllTables() {
    return clearDependentTables()
      .then(()=> knex('categories').del())
      .then(()=> knex('breweries').del())
      .then(()=> knex('users').del())
      .then(()=> knex('beers').del())
      .then(()=> knex('stores').del())
      .then(()=> knex('seasons').del())
  }

  function clearDependentTables() {
    return Promise.All([
      knex('beers_users').del(),
      knex('events').del(),
      knex('beers_stores').del(),
      knex('beers_breweries').del(),
      knex('store_hours').del()
    ]);
  }

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
    return knex('breweries').insert([
      {
        name: '',
        location: '',
        description: ''
      },
      {
        name: '',
        location: '',
        description: ''
      },
      {
        name: '',
        location: '',
        description: ''
      },
      {
        name: '',
        location: '',
        description: ''
      },
      {
        name: '',
        location: '',
        description: ''
      },
      {
        name: '',
        location: '',
        description: ''
      }
    ]);
  }

  function seedStoresTable() {

  }

  function seedSeasonsTable() {

  }

  function seedUsersTable() {

  }

  function seedBeersTable() {

  }

  function seedBeersBreweriesTable() {

  }

  function seedBeersStoresTable() {

  }

  function seedEventsTable() {

  }

  function seedBeersUsersTriedTable() {

  }

  return clearAllTables()
    .then(seedCategoriesTable)
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
