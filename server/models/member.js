'use strict'
const knex = require('../knex')

const findMemberByAddress = async (memberAddress) => {
  return knex.select().from('members').where('address', memberAddress).first()
}

const createNewMember = async (objData) => {
  return knex('members').insert(objData)
}

const getListMember = async () => {
  return knex.select().table('members')
}

const changeStatus = async (id, status) => {
  return knex.select().table('members')
    .where(id)
    .update({ status })
}
module.exports = {
  findMemberByAddress,
  getListMember,
  changeStatus,
  createNewMember
}
