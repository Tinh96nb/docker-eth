const { web3 } = require('./web3')
const contractJSON = require('./build/contracts/DocumentManager.json')

module.exports = {
  getAccounts,
  newDocument,
  getAllDocument,
  web3
}

async function getContract () {
  const networkId = await web3.eth.net.getId()
  const deployedAddress = contractJSON.networks[networkId].address
  return new web3.eth.Contract(contractJSON.abi, deployedAddress)
}

async function getAccounts () {
  return web3.eth.personal.getAccounts()
}

async function newDocument (res) {
  const accounts = await web3.eth.getAccounts()
  const nameDoc = 'name doc'
  const hashContent = 'this is hash file'
  const cryptLink = 'link ipfs'
  const category = 'category'
  const contract = await getContract()
  contract.methods
    .newDocument(nameDoc, hashContent, cryptLink, category)
    .send({ from: accounts[0], gas: 3000000 }, async (err, tranHash) => {
      if (err) {
        console.log(err)
      }
      const docMined = await web3.eth.getTransactionReceipt(tranHash)
      res.json(docMined)
    })
}

async function getAllDocument () {
  const contractObject = await getContract()
  return contractObject.getPastEvents('LogCreatedDoc', {
    fromBlock: 0,
    toBlock: 'latest'
  })
    .then(event => event)
}
