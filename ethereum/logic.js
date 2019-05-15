const { web3 } = require("./web3");
const contractJSON = require("./build/contracts/DocumentManager.json");

const getContract = async  () => {
    const networkId = await web3.eth.net.getId();
    const acc =  web3.eth.personal.getAccounts();
    const deployedAddress = contractJSON.networks[networkId].address
    const contract = new web3.eth.Contract(contractJSON.abi, deployedAddress)
    return contract;
};

const getAccounts = async () => {
    return await web3.eth.personal.getAccounts();
};

const newdoc = async (res) => {
    const accounts = await web3.eth.getAccounts();
    const nameDoc = "name doc";
    const hashContent = "this is hash file";
    const cryptLink = "link ipfs";
    const category = "category";
    const contract = await getContract();
    contract.methods
      .newDocument(nameDoc, hashContent, cryptLink, category)
      .send({from: accounts[0], gas:3000000}, async (err,tranHash) => {
        console.log(tranHash);
        const res1 = await web3.eth.getTransactionReceipt(tranHash);
        res.send(res1)
      })
};


async function getAllBlock() {
  try {
    const contractObject = await getContract();
    return contractObject.getPastEvents('LogCreatedDoc', {
        fromBlock: 0,
        toBlock: 'latest'
      })
      .then(event => event);
  } catch (e) {
    console.log
  }

}

module.exports = {
    getAccounts,
    getContract,
    newdoc,
    getAllBlock,
    web3
};