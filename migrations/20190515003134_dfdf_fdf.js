
exports.up = function (knex, Promise) {
    return knex.schema.createTableIfNotExists('news', function (table) {
      table.increments()
      table.string('title')
      table.string('slug').unique()
      table.text('image')
      table.string('description')
      table.text('content')
      table.date('post_at')
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
  }
  
  exports.down = function (knex, Promise) {
    return knex.schema.dropTable('news')
  }