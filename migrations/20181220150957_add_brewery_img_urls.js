exports.up = function(knex, Promise) {
  return knex.schema.table('breweries', function(table) {
    table.string('img_url');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('breweries', function(table) {
    table.dropColumn('img_url');
  });
};