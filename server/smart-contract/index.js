const { web3, getContract } = require('../../ethereum/provider')
const documentRepo = require('../models/document')
const transRepo = require('../models/transaction')
const memberRepo = require('../models/member')

module.exports = {
  getAccounts,
  newDocument,
  adminChangeStatus,
  createNewAcc
}

async function getAccounts () {
  return memberRepo.getListMember()
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
        category_id: docInfoFromBC.category,
        status: docInfoFromBC.status

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
      transRepo.createTrans(objTrans)
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
