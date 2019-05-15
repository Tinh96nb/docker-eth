export function getDocMinedByIndex(numdoc, contract) {
  return new Promise((resolve, reject) => {
    contract.methods.getDocumentByIndex(numdoc).call((error, docBlock) => {
      if (error) reject(error)
      if(docBlock._owner === "0x0000000000000000000000000000000000000000") {
        reject("Not found document");
      }
      resolve(docBlock)
    })
  });
}

export async function getAllBlock(contract) {
  try {
    return contract.getPastEvents('LogCreatedDoc', {
        fromBlock: 0,
        toBlock: 'latest'
      })
      .then(event => event);
  } catch (e) {
    console.log
  }

}

export function createNewBlock(docInfo, contract, owner) {
  return new Promise((resolve, reject) => {
    contract.methods.newDocument(docInfo.name , docInfo.hashContent, docInfo.ipfsCrypt).send({from: owner})
      .on('receipt', (receipt) => {
        resolve(receipt);
      }).on('error', (err) => reject(err));
  });
}