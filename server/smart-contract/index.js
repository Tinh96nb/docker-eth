const { web3, getContract } = require('../../ethereum/provider')
const documentRepo = require('../models/document')
const transRepo = require('../models/transaction')
const memberRepo = require('../models/member')

module.exports = {
  getAccounts,
  getBalance,
  newDocument,
  adminChangeStatus,
  createNewAcc,
  deleteDocument,
  updateDocument
}

async function getAccounts () {
  return web3.eth.getAccounts()
}

async function getBalance (address) {
  return web3.eth.getBalance(address)
}

async function newDocument (params, res) {
  const contract = await getContract()
  contract.methods
    .newDocument(params.name, params.hash, params.linkCrypt, params.category)
    .send({ from: params.address, gas: 3000000 }, async (err, tranHash) => {
      if (err) {
        console.log(err)
        res.status(400).json({ message: 'Can not mined to blockchain' })
      }
      const docInfoFromBC = await contract.methods.getLatestDocument().call({ from: params.address })
      const objDoc = {
        u_id: docInfoFromBC.documentId.toString(),
        owner: docInfoFromBC.owner,
        name: docInfoFromBC.name,
        content_hash: docInfoFromBC.contentHash,
        link_ipfs_crypt: docInfoFromBC.linkIpfsCrypt,
        category_id: docInfoFromBC.category.toString(),
        status: docInfoFromBC.status,
        size: params.size,
        description: params.description

      }
      await documentRepo.createDocument(objDoc)
      const transaction = await web3.eth.getTransactionReceipt(tranHash)
      const objTrans = {
        document_id: objDoc.u_id,
        trans_hash: transaction.transactionHash,
        block_number: transaction.blockNumber,
        block_hash: transaction.blockHash,
        from: transaction.from,
        gas_used: transaction.gasUsed,
        status: transaction.status
      }
      await transRepo.createTrans(objTrans)
      const result = await documentRepo.getDocById(objDoc.u_id)
      res.json({ ...result, linkIpfs: params.link })
    })
}

async function adminChangeStatus (params, res) {
  const contract = await getContract()
  contract.methods
    .grantDocument(params.numDoc, params.status)
    .send({ from: params.address, gas: 3000000 }, async (err, tranHash) => {
      if (err) {
        console.log(err)
      }
      const docMined = await web3.eth.getTransactionReceipt(tranHash)
      res.json(docMined)
    })
}

async function deleteDocument (params, res) {
  const contract = await getContract()
  contract.methods
    .deleteDocument(params.docId)
    .send({ from: params.address, gas: 3000000 }, async (err, tranHash) => {
      if (err) {
        console.log(err)
      }
      await documentRepo.deleteDocument(params.docId)
      await transRepo.deleteTrans(params.docId)
      res.json(params.docId)
    })
}

async function updateDocument (params, res) {
  const contract = await getContract()
  contract.methods
    .updateDocument(params.docId, params.name, params.hash, params.linkCrypt, params.category)
    .send({ from: params.address, gas: 3000000 }, async (err, tranHash) => {
      if (err) {
        console.log(err)
        res.status(400).json({ message: 'Can not mined to blockchain' })
      }
      const docInfoFromBC = await contract.methods.getDocumentByIndex(params.docId).call({ from: params.address })
      const objDoc = {
        owner: docInfoFromBC.owner,
        name: docInfoFromBC.name,
        content_hash: docInfoFromBC.contentHash,
        link_ipfs_crypt: docInfoFromBC.linkIpfsCrypt,
        category_id: docInfoFromBC.category.toString(),
        status: docInfoFromBC.status,
        size: params.size,
        description: params.description
      }
      await documentRepo.updateDocument(params.docId, objDoc)
      const transaction = await web3.eth.getTransactionReceipt(tranHash)
      const objTrans = {
        trans_hash: transaction.transactionHash,
        block_number: transaction.blockNumber,
        block_hash: transaction.blockHash,
        from: transaction.from,
        gas_used: transaction.gasUsed,
        status: transaction.status
      }
      await transRepo.updateTrans(params.docId, objTrans)
      const result = await documentRepo.getDocById(params.docId)
      res.json({ ...result, linkIpfs: params.link })
    })
}

async function createNewAcc (params, res) {
  const accInfo = await web3.eth.accounts.create()
  web3.eth.sendTransaction({
    from: params.addressAdmin,
    to: accInfo.address,
    value: web3.utils.toWei(params.amount, 'ether')
  }, function (error, hash) {
    if (error) res.status(400).json({ message: 'Can not create account!' })
    const result = {
      address: accInfo.address,
      privateKey: accInfo.privateKey,
      balance: `${params.amount} ether`
    }
    memberRepo.createNewMember({ address: result.address })
    res.json(result)
  })
}
