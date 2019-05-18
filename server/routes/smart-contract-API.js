const express = require('express')
const router = express.Router()
const { saveToIpfs, getFromIpfs } = require('../helps/ipfs')
const contractApi = require('../smart-contract')
const memberRepo = require('../models/member')

router.post('/', async (req, res, next) => {
  const { name = 'jh', file_content = '', category = '1' } = req.body
  // await saveToIpfs(file_content)
  const params = {
    name: name,
    hash: 'hash',
    link: 'result.ipfsCrypt',
    category: category
  }
  return contractApi.newDocument(params, res)
})

router.get('/', async (req, res, next) => {
  const linkIpfsCrypt = req.query.id
  const result = await getFromIpfs(linkIpfsCrypt)
  return res.json(result)
})

router.get('/file', async (req, res, next) => {
  const linkIpfsCrypt = req.query.id
  const result = await getFromIpfs(linkIpfsCrypt)
  return res.json(result)
})

module.exports = router
