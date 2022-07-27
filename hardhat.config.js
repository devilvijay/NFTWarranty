require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
const fs = require('fs');
// const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 80001
    },
    polygon: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/k2I6sW_GliThju4tJrAh12694OrtLzKW",
      accounts: [ "895824c33f0df1b99e05fcada6adc9092c8c02a110a04404ec64314befae27bc" ]
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};