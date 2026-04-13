const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const balance = await deployer.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");

  // Deploy SuperToken
  console.log("\nDeploying SuperToken...");
  const SuperToken = await ethers.getContractFactory("SuperToken");
  const token = await SuperToken.deploy();
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log("SuperToken deployed to:", tokenAddress);

  // Deploy DAO
  console.log("\nDeploying DAO...");
  const DAO = await ethers.getContractFactory("DAO");
  const dao = await DAO.deploy(tokenAddress);
  await dao.waitForDeployment();
  const daoAddress = await dao.getAddress();
  console.log("DAO deployed to:", daoAddress);

  console.log("\n=== Deployment Summary ===");
  console.log("SuperToken:", tokenAddress);
  console.log("DAO:       ", daoAddress);
  console.log("\nTo verify:");
  console.log(`npx hardhat verify --network sepolia ${tokenAddress}`);
  console.log(`npx hardhat verify --network sepolia ${daoAddress} "${tokenAddress}"`);
}

main().catch(console.error);
