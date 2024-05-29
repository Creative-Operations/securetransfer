/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

module.exports = {
  defaultNetwork: "celo",
  networks: {
    celo: {
      url: "https://alfajores-forno.celo-testnet.org", // Alfajores testnet
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
  solidity: "0.8.24",
};