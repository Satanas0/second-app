const { ethers } = require("hardhat");

const CONTRACT_ADDRESS = "0x349A10AE1087871C319a0CEd0c13Fcc4bcCBcD13";

async function transferTo(token, from, to, amount) {
  console.log(`Transferring ${ethers.formatEther(amount)} to ${to}...`);

  const fromBefore = await token.balanceOf(from);
  const toBefore = await token.balanceOf(to);
  console.log(` Sender balance before:   ${ethers.formatEther(fromBefore)}`);
  console.log(` Receiver balance before: ${ethers.formatEther(toBefore)}`);

  const tx = await token.transfer(to, amount);
  await tx.wait();
  console.log(` Transfered! TX: ${tx.hash}`);

  const fromAfter = await token.balanceOf(from);
  const toAfter = await token.balanceOf(to);
  console.log(` Sender balance after:   ${ethers.formatEther(fromAfter)}`);
  console.log(` Receiver balance after: ${ethers.formatEther(toAfter)}`);
}

async function main() {
  const to = process.env.TO;
  const amount = process.env.AMOUNT;

  if (!to || !amount) {
    console.error("Usage: TO=adress AMOUNT=amount npx hardhat run scripts/transfer.js --network sepolia");
    process.exitCode = 1;
    return;
  }

  const [sender] = await ethers.getSigners();
  console.log(`Sender: ${sender.address}`);

  const SuperToken = await ethers.getContractFactory("SuperToken");
  const token = SuperToken.attach(CONTRACT_ADDRESS);

  const totalBefore = await token.totalSupply();
  console.log(`Total supply before: ${ethers.formatEther(totalBefore)}`);
  console.log("─".repeat(50));

  await transferTo(token, sender.address, to, ethers.parseEther(amount));

  console.log("─".repeat(50));
  const totalAfter = await token.totalSupply();
  console.log(`Total supply after: ${ethers.formatEther(totalAfter)}`);
}

main().catch(console.error);

