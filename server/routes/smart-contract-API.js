const express = require('express')
const router = express.Router()
const logic = require('../../ethereum/logic')
const ipfsClient = require('ipfs-http-client')

const ipfs = ipfsClient(process.env.IPFS_HOST, '5001', { protocol: 'http' })

router.get('/', async (req, res, next) => {
  logic.newDocument(res)
})

router.get('/ipfs', async (req, res, next) => {
  const content = ipfs.Buffer.from('test')
  const results = await ipfs.add(content)
  console.log(results)

  res.send('message')
})

router.get('/all', async (req, res, next) => {
  let message = await logic.getAllDocument()
  res.send(message)
})

module.exports = router
