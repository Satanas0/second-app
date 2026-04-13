const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying DAO with account:", deployer.address);

    // Адрес уже развёрнутого SuperToken
    const tokenAddress = "0x349A10AE1087871C319a0CEd0c13Fcc4bcCBcD13";

    const DAO = await ethers.getContractFactory("DAO");
    const dao = await DAO.deploy(tokenAddress);
    await dao.waitForDeployment();

    const daoAddress = await dao.getAddress();
    console.log("DAO deployed to:", daoAddress);
    console.log("Linked to SuperToken at:", tokenAddress);

    console.log("\nTo verify:");
    console.log(`npx hardhat verify --network sepolia ${daoAddress} "${tokenAddress}"`);
}

main().catch(console.error);