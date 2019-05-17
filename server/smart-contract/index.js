const { web3, getContract } = require('../../ethereum/provider')

module.exports = {
  getAccounts,
  newDocument
}

async function getAccounts () {
  return web3.eth.personal.getAccounts()
}

async function newDocument (params, res) {
  const accounts = await web3.eth.getAccounts()
  const contract = await getContract()
  contract.methods
    .newDocument(params.name, params.hash, params.link, params.category)
    .send({ from: accounts[0], gas: 3000000 }, async (err, tranHash) => {
      if (err) {
        console.log(err)
      }
      const docMined = await web3.eth.getTransactionReceipt(tranHash)
      res.json(docMined)
    })
}
