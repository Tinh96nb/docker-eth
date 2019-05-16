const express = require('express')
const router = express.Router()
const logic = require('../../ethereum/logic')
const ipfsClient = require('ipfs-http-client')

const ipfs = ipfsClient(process.env.IPFS_HOST, '5001', { protocol: 'http' })

router.get('/', async (req, res, next) => {
  logic.newDocument(res)
})

router.post('/ipfs1', async (req, res, next) => {
  const content = ipfs.Buffer.from('tes23t')
  const results = await ipfs.add(content)
  res.json(results)
})

router.get('/all', async (req, res, next) => {
  let message = await logic.getAllDocument()
  res.send(message)
})

module.exports = router
