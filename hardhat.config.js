require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const networks = {};
if (process.env.SEPOLIA_RPC_URL && process.env.SEPOLIA_PRIVATE_KEY) {
  networks.sepolia = {
    url: process.env.SEPOLIA_RPC_URL,
    accounts: [process.env.SEPOLIA_PRIVATE_KEY],
  };
}
if (process.env.TARGET_RPC_URL && process.env.TARGET_PRIVATE_KEY) {
  networks.target = {
    url: process.env.TARGET_RPC_URL,
    accounts: [process.env.TARGET_PRIVATE_KEY],
  };
}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.28",
    settings: {
      evmVersion: "cancun",
    },
  },
  networks,
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};