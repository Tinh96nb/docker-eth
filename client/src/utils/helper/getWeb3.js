import Web3 from 'web3';

export function getWeb3(){
  return new Promise(async (resolve, reject) => {
    // Modern dapp browsers...
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        console.log(web3.givenProvider.selectedAddress);
        
        resolve(web3);
      } catch (error) {
        reject(error);
      }
    }
    else {
      reject(0);
    }
  });
}