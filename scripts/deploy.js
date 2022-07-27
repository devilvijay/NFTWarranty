const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  const balance = await deployer.getBalance();
  const NFTWarrenty = await hre.ethers.getContractFactory("NFTWarrenty");
  const warranty = await NFTWarrenty.deploy();

  await warranty.deployed();

  const data = {
    address: warranty.address,
    abi: JSON.parse(warranty.interface.format('json'))
  }

  //This writes the ABI and address to the mktplace.json
  fs.writeFileSync('./src/Marketplace.json', JSON.stringify(data))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });