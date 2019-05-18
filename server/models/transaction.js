'use strict'

const knex = require('../knex')

const getTransByDocId = async (docId) => {
  return knex.select().from('transactions').where('document_id', docId)
}

const createTrans = async (objectData) => {
  return knex('transactions').insert(objectData)
}

const updateTrans = async (docId, objectData) => {
  return knex.select().table('transactions')
    .where('document_id', docId)
    .update({ objectData })
}

module.exports = {
  getTransByDocId,
  createTrans,
  updateTrans
}
