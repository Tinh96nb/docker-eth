const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient(process.env.IPFS_HOST, '5001', { protocol: 'http' })
const {
  encryptAes,
  decryptAes
} = require('../helps/crypto')

const saveToIpfs = async (base64File) => {
  const contentCrypt = encryptAes(base64File)
  const bufferContent = ipfs.Buffer.from('contentCrypt')
  return ipfs.add(bufferContent)
    .then((response) => {
      return {
        ipfs: response[0].path,
        ipfsCrypt: encryptAes(response[0].path)
      }
    })
    .catch((err) => {
      console.error(err)
    })
}

const getFromIpfs = async (ipfsCrypt) => {
  const ipfsId = await decryptAes(ipfsCrypt)
  console.log(ipfsId)
  return ipfsId
  // const file = await ipfs.get(ipfsId)
  // if (file.length && file[0].content) {
  //   const contentHex = file[0].content.toString('hex')
  //   const contentBase64 = decryptAes(contentHex)
  //   return contentBase64
  // }
}

module.exports = {
  saveToIpfs,
  getFromIpfs
}
