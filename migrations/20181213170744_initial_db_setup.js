
exports.up = function(knex, Promise) {
  function createCategoriesTable() {
    return knex.schema.createTable('categories', function (table) {
      table.increments();
      table.string('category');
    });
  }

  function createSeasonsTable() {
    return knex.schema.createTable('seasons', function (table) {
      table.increments();
      table.string('season');
    });
  }

  function createBeersTable() {
    return knex.schema.createTable('beers', function (table) {
      table.increments();
      table.integer('ibu');
      table.string('abv');
      table.string('name').notNullable();
      table.string('description');
      table.integer('vote_count');
      table.string('img_url');
    });
  }

  function createBreweriesTable() {
    return knex.schema.createTable('breweries', function (table) {
      table.increments();
      table.string('name').notNullable();
      table.string('description');
      table.string('location');
    });
  }

  function createBeersBreweriesTable() {
    return knex.schema.createTable('beers_breweries', function (table) {
      table.increments();
      table.integer('beer_id');
      table.integer('brewery_id');
      table.foreign('beer_id').references('beers.id');
      table.foreign('brewery_id').references('breweries.id');
    });
  }

  function createStoresTable() {
    return knex.schema.createTable('stores', function (table) {
      table.increments();
      table.string('name').notNullable();
      table.string('description');
      table.string('location');
      table.string('hours');
    });
  }

  function createBeersStoresTable() {
    return knex.schema.createTable('beers_stores', function (table) {
      table.increments();
      table.integer('beer_id');
      table.integer('store_id');
      table.foreign('beer_id').references('beers.id');
      table.foreign('store_id').references('stores.id');
    });
  }

  function createEventsTable() {
    return knex.schema.createTable('events', function (table) {
      table.increments();
      table.integer('store_id');
      table.foreign('store_id').references('stores.id');
      table.string('name');
      table.string('details');
      table.string('time');
    });
  }
  
  function createUsersTable() {
    return knex.schema.createTable('users', function (table) {
      table.increments();
      table.string('first_name');
      table.string('last_name');
      table.string('email').notNullable();
      table.string('password').notNullable();
    });
  }

  function createBeersUsersTriedTable() {
    return knex.schema.createTable('beers_users_tried', function (table) {
      table.increments();
      table.integer('user_id');
      table.integer('beer_id');
      table.foreign('beer_id').references('beers.id');
      table.foreign('user_id').references('users.id').onDelete('cascade');
      table.integer('vote').notNullable();
      table.boolean('favorite').notNullable();
    });
  }

  return createCategoriesTable()
    .then(createSeasonsTable)
    .then(createBreweriesTable)
    .then(createStoresTable)
    .then(createUsersTable)
    .then(createBeersTable)
    .then(createBeersBreweriesTable)
    .then(createBeersStoresTable)
    .then(createEventsTable)
    .then(createBeersUsersTriedTable);
};

exports.down = function(knex, Promise) {

  return knex.schema.dropTableIfExists('beers_users_tried')
    .then(() => knex.schema.dropTableIfExists('events')
    .then(() => knex.schema.dropTableIfExists('beers_stores')
    .then(() => knex.schema.dropTableIfExists('beers_breweries')
    .then(() => knex.schema.dropTableIfExists('beers')
    .then(() => knex.schema.dropTableIfExists('users')
    .then(() => knex.schema.dropTableIfExists('stores')
    .then(() => knex.schema.dropTableIfExists('breweries')
    .then(() => knex.schema.dropTableIfExists('seasons')
    .then(() => knex.schema.dropTableIfExists('categories'))))))))));

};
