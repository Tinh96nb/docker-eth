module.exports = {
  networks: {
    development: {
      host: "172.22.0.3",
      port: 8545,
      network_id: "*",
      // gas: 4698712,
      // gasPrice: 25000000000
    }
  },
  compilers: {
    solc: {
      version: "0.4.24"
    }
  }
};
