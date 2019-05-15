'use strict'
const knex = require('../knex');

const findMemberByAddress = async (memberAddress) => {
  return knex.select('*').from('members').first()
}
module.exports = {
  findMemberByAddress
}
