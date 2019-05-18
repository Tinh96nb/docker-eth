exports.up = async function (knex, Promise) {
  await knex.schema.dropTableIfExists('members')
  return knex.schema.createTable('members', function (table) {
    table.increments()
    table.string('address', 42).unique()
    table.string('role', 10)
    table.string('status').defaultTo(1)
  })
}
exports.down = function (knex, Promise) {
  return knex.schema.dropTable('members')
}
