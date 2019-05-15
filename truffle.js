const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  contracts_directory: "./ethereum/contracts",
  migrations_directory: "./ethereum/migrations",
  contracts_build_directory: "./ethereum/build/contracts",
  networks: {
    development: {
      host: process.env.GANACHE_HOST,
      port: process.env.GANACHE_PORT,
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
