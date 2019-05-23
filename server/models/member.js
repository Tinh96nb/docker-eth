'use strict'

const knex = require('../knex')
const contractApi = require('../smart-contract')

const findMemberByAddress = async (memberAddress) => {
  return knex.select().from('members').where('address', memberAddress).first().then(getBalance)
}

const createNewMember = async (objData) => {
  return knex('members').insert(objData)
}

const getListMember = async () => {
  return knex.select().table('members').then(async (rows) => {
    return Promise.all(rows.map(async (row) => getBalance(row)))
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
module.exports = {
  findMemberByAddress,
  getListMember,
  changeStatus,
  createNewMember
}
