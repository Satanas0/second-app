const { ethers } = require("hardhat");

const CONTRACT_ADDRESS = "0x349A10AE1087871C319a0CEd0c13Fcc4bcCBcD13";

async function main() {
  const amount = process.env.AMOUNT;

  if (!amount) {
    console.error("Usage: AMOUNT=amount npx hardhat run scripts/burn.js --network sepolia");
    process.exitCode = 1;
    return;
  }

  const [caller] = await ethers.getSigners();

  const SuperToken = await ethers.getContractFactory("SuperToken");
  const token = SuperToken.attach(CONTRACT_ADDRESS);

  const totalBefore = await token.totalSupply();
  console.log(`Total supply before: ${ethers.formatEther(totalBefore)}`);
  console.log("─".repeat(50));

  console.log(`Burning ${amount} tokens from ${caller.address}...`);

  const balanceBefore = await token.balanceOf(caller.address);
  console.log(`  Balance before: ${ethers.formatEther(balanceBefore)}`);

  const tx = await token.burn(ethers.parseEther(amount));
  await tx.wait();
  console.log(`  Burn сompleted! TX: ${tx.hash}`);

  const balanceAfter = await token.balanceOf(caller.address);
  console.log(`  Balance after: ${ethers.formatEther(balanceAfter)}`);

  console.log("─".repeat(50));
  const totalAfter = await token.totalSupply();
  console.log(`Total supply after: ${ethers.formatEther(totalAfter)}`);

}

main().catch(console.error);
