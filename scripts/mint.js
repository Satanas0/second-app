const { ethers } = require("hardhat");

const CONTRACT_ADDRESS = "0xD436dcc96f201a0F7d3A80f6b79602A845418222";

async function mintTo(token, address, amount) {
  console.log(`Minting ${amount} tokens to ${address}...`);

  const balanceBefore = await token.balanceOf(address);
  console.log(`  Balance before: ${ethers.formatEther(balanceBefore)}`);

  const tx = await token.mint(address, amount);
  await tx.wait();
  console.log(`  Minted to ${address}. TX: ${tx.hash}`);

  const balanceAfter = await token.balanceOf(address);
  console.log(`  Balance after: ${ethers.formatEther(balanceAfter)}`);
}

async function main() {
  const to = process.env.TO;
  const amount = process.env.AMOUNT;

  if (!to || !amount) {
    console.error("Usage: TO=adress AMOUNT=amount npx hardhat run scripts/mint.js --network sepolia");
    process.exitCode = 1;
    return;
  }

  const [owner] = await hre.ethers.getSigners();
  console.log(`Owner: ${owner.address}`);

  const SuperToken = await ethers.getContractFactory("SuperToken");
  const token = SuperToken.attach(CONTRACT_ADDRESS);

  const totalBefore = await token.totalSupply();
  console.log(`Total supply before: ${ethers.formatEther(totalBefore)}`);
  console.log("─".repeat(50));

  await mintTo(token, to, ethers.parseEther(amount));

  console.log("─".repeat(50));
  const totalAfter = await token.totalSupply();
  console.log(`Total supply after: ${ethers.formatEther(totalAfter)}`);

  console.log("Minting completed");
}

main().catch(console.error);
