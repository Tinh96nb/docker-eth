'use strict'
const knex = require('../knex')

const findMemberByAddress = async (memberAddress) => {
  return knex.select().from('members').where('address', memberAddress).first()
}

const getListMember = async () => {
  return knex.select().table('members')
}
module.exports = {
  findMemberByAddress,
  getListMember
}
