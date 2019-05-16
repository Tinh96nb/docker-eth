const Web3 = require('web3')

const web3 = new Web3(new Web3.providers.HttpProvider(`http://ganache:${process.env.GANACHE_PORT}`))

module.exports = {
  web3
}
