
exports.up = function(knex, Promise) {
  function breweriesLocation() {
    return knex.schema.table('breweries', function(table) {
      table.json('meridians');
    });
  }
  function storeLocation() {
    return knex.schema.table('stores', function(table) {
      table.json('meridians');
    });
  }
  return breweriesLocation()
    .then(storeLocation);
};

exports.down = function(knex, Promise) {
  function dropBreweriesLocation() {
    return knex.schema.table('breweries', function(table) {
      table.dropColumn('meridians');
    });
  }
  function dropStoreLocation() {
    return knex.schema.table('stores', function(table) {
      table.dropColumn('meridians');
    });
  }
  return dropBreweriesLocation()
    .then(dropStoreLocation);
};
