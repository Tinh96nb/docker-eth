const express = require('express')
const router = express.Router()
// const ipfsClient = require('ipfs-http-client')
const contractApi = require('../smart-contract')
// const ipfs = ipfsClient(process.env.IPFS_HOST, '5001', { protocol: 'http' })
// const memberRepo = require('../models/member')

router.post('/', async (req, res, next) => {
  // const content = ipfs.Buffer.from('abcd')
  // const result = await ipfs.add(content)
  const params = {
    name: 'name',
    hash: 'hash',
    link: 'result',
    category: 'tham khao'
  }
  return contractApi.newDocument(params, res)
})

module.exports = router
