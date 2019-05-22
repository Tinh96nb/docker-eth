'use strict'

const knex = require('../knex')

const listDocument = async () => {
  return knex.select().from('documents').then(async (rows) => {
    return Promise.all(rows.map(async (row) => addColumnTrans(row)))
  })
}

const getDocById = async (id) => {
  return knex.select().table('documents').where('u_id', id).first().then(addColumnTrans)
}

const getDocsByOwner = async (owner) => {
  return knex.select().table('documents').where('owner', owner)
    .then(async (rows) => {
      return Promise.all(rows.map(async (row) => addColumnTrans(row)))
    })
}

const getDocsByCategoryId = async (categoryId) => {
  return knex.select().table('documents').where('category_id', categoryId)
    .then(async (rows) => {
      return Promise.all(rows.map(async (row) => addColumnTrans(row)))
    })
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
    .where('u_id', id)
    .update(objectData)
}

const deleteDocument = async (id) => {
  return knex.select().table('documents')
    .where('u_id', id)
    .del()
}

async function addColumnTrans (row) {
  if (!row) {
    return null
  }
  const transaction = await knex.select()
    .from('transactions')
    .where('document_id', row.u_id)
    .first()
  const categoryName = await knex.select('name')
    .from('categories')
    .where('id', row.category_id)
    .first()
  return {
    ...row,
    transaction,
    category_name: categoryName || ''
  }
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
