exports.up = async function (knex, Promise) {
  await knex.schema.dropTableIfExists('documents')
  return knex.schema.createTable('documents', function (table) {
    table.integer('u_id').unsigned().unique().primary()
    table.string('owner', 42)
    table.string('content_hash')
    table.string('link_ipfs_crypt')
    table.integer('category_id').unsigned()
    table.string('status')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}
exports.down = function (knex, Promise) {
  return knex.schema.dropTable('documents')
}