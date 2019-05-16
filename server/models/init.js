'use strict'
const knex = require('../knex')
const logic = require('../../ethereum/logic')

const initDb = async () => {
  await knex('members').truncate()
}

const insertMembers = async () => {
  const members = await logic.getAccounts()
  const convertField = members.map((mem, index) => {
    if (index === 0) {
      return { address: mem, role: 'admin' }
    }
    return { address: mem, role: 'member' }
  })
  try {
    await knex('members').insert(convertField)
    console.log('Insert members susscess!')
  } catch (error) {
    console.log('Import members error!')
  }
  return process.exit()
}

const init = async () => {
  await initDb()
  await insertMembers()
}
init()
