'use strict'

const knex = require('../knex')
const contractApi = require('../smart-contract')

const findMemberByAddress = async (memberAddress) => {
  return knex.select().from('members')
    .where('address', memberAddress)
    .first().then(getBalance)
    .then(getNumdoc)
}

const createNewMember = async (objData) => {
  return knex('members').insert(objData)
}

const getListMember = async () => {
  return knex.select().table('members')
    .then(async (rows) => {
      return Promise.all(rows.map(async (row) => getBalance(row)))
    })
    .then(async (rows) => {
      return Promise.all(rows.map(async (row) => getNumdoc(row)))
    })
}

const changeStatus = async (id, status) => {
  return knex.select().table('members')
    .where(id)
    .update({ status })
}

async function getBalance (member) {
  if (!member) return null
  const balance = await contractApi.getBalance(member.address)
  return {
    ...member,
    balance
  }
}

async function getNumdoc (member) {
  if (!member) return null
  const result = await knex('documents')
    .count('u_id as numDoc')
    .where('owner', member.address).first()

  return {
    ...member,
    num_doc: result.numDoc
  }
}
module.exports = {
  findMemberByAddress,
  getListMember,
  changeStatus,
  createNewMember
}
