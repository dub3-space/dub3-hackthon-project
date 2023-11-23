import { ethers } from "hardhat";

async function main() {
  const SpeakerNFT = await ethers.getContractFactory("SpeakerNFT");
  const speakerNFT = await SpeakerNFT.deploy();

  await speakerNFT.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
