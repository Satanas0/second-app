const { ethers } = require("hardhat");

const CONTRACT_ADDRESS = "0x349A10AE1087871C319a0CEd0c13Fcc4bcCBcD13";

async function main() {
    const address = process.env.ADDRESS;

    if (!address) {
        console.error("Usage: ADDRESS=0x... npx hardhat run scripts/check-balance.js --network sepolia");
        process.exitCode = 1;
        return;
    }

    const SuperToken = await ethers.getContractFactory("SuperToken");
    const token = SuperToken.attach(CONTRACT_ADDRESS);

    const balance = await token.balanceOf(address);
    const total = await token.totalSupply();

    console.log(`\n=== Token Balance ===`);
    console.log(`Address:      ${address}`);
    console.log(`Balance:      ${ethers.formatEther(balance)} MTK`);
    console.log(`Total Supply: ${ethers.formatEther(total)} MTK`);
}

main().catch(console.error);