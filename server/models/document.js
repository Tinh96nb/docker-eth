'use strict'

const knex = require('../knex')

const listDocument = async () => {
  return knex.select().from('documents')
}

const getDocById = async (id) => {
  return knex.select().table('documents').where('id', id)
}

const getDocsByOwner = async (owner) => {
  return knex.select().table('documents').where('owner', owner)
}

const getDocsByCategoryId = async (categoryId) => {
  return knex.select().table('documents').where('category_id', categoryId)
}

const createDocument = async (objectData) => {
  return knex('documents').insert(objectData)
}

const changeStatus = async (id, status) => {
  return knex.select().table('documents')
    .where('uid', id)
    .update({ status })
}

const updateDocument = async (id, objectData) => {
  return knex.select().table('documents')
    .where('uid', id)
    .update({ objectData })
}

const deleteDocument = async (id) => {
  return knex.select().table('documents')
    .where('id', id)
    .del()
}

module.exports = {
  listDocument,
  getDocById,
  getDocsByOwner,
  getDocsByCategoryId,
  createDocument,
  changeStatus,
  updateDocument,
  deleteDocument
}
