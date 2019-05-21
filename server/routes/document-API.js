const express = require('express')
const router = express.Router()
const { saveToIpfs, getFromIpfs } = require('../helps/ipfs')
const { sha1 } = require('../helps/crypto')
const { statusDocument } = require('../helps/const')
const contractApi = require('../smart-contract')
const documentRepo = require('../models/document')

router.post('/', async (req, res, next) => {
  const { name = '', file_content = '', category = '1' } = req.body
  const base64File = file_content.split(',')[1]
  const hash = sha1(base64File)
  const ipfs = await saveToIpfs(base64File)
  const params = {
    address: res.locals.member.address,
    name: name,
    hash: hash,
    link: ipfs.link,
    linkCrypt: ipfs.linkCrypt,
    category: category
  }
  return contractApi.newDocument(params, res)
})

router.get('/', async (req, res, next) => {
  const documents = await documentRepo.listDocument()
  res.json(documents)
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  const document = await documentRepo.getDocById(id)
  if (!document) {
    res.status(400).json({ message: 'Document not found!' })
  }
  res.json(document)
})

router.get('/file/:docId', async (req, res, next) => {
  const { docId } = req.params
  const docInfo = await documentRepo.getDocById(docId)
  if (!docInfo) {
    res.status(400).json({ message: 'Document not found!' })
  }
  // neu status open hoac owner thi moi dc xem
  if (docInfo.status === statusDocument.ACEPTED ||
    docInfo.owner === res.locals.member.address
  ) {
    const base64File = await getFromIpfs(docInfo.link_ipfs_crypt)
    if (!base64File) {
    }
    res.setHeader('Content-Disposition', 'attachment; filename=' + docInfo.name)
    const download = Buffer.from(base64File.toString('utf-8'), 'base64')
    res.end(download)
  }
  res.status(403).json({ message: `You don't have permission to access` })
})

module.exports = router
