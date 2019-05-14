const dotenv = require("dotenv");
dotenv.config();

module.exports = {
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
