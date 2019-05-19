'use strict'

const knex = require('../knex')

const listCategory = async () => {
  return knex.select().from('categories')
}

const createCategory = async (objectData) => {
  return knex('categories').insert(objectData)
}

const updateCategory = async (id, objectData) => {
  return knex.select().table('categories')
    .where('id', id)
    .update({ objectData })
}

const deleteCategory = async (id) => {
  return knex.select().table('categories')
    .where('id', id)
    .del()
}

module.exports = {
  listCategory,
  createCategory,
  updateCategory,
  deleteCategory
}
