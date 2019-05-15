exports.up = function (knex, Promise) {
  return knex.schema.hasTable('members')
    .then(async () => {
      await knex.schema.createTable('members', function (table) {
      table.increments()
      table.string('address').unique()
      table.string('hash_private_key')
    });
  })
}
exports.down = function (knex, Promise) {
  return knex.schema.dropTable('members')
}
