
exports.up = function(knex, Promise) {
  return knex.schema.table('stores', function(table) {
    table.string('img_url');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('stores', function(table) {
    table.dropColumn('img_url');
  });
};
