const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SpeakerNFT", function () {
  let speakerNFT;
  let addr1;
  let addr2;
  // let addrs;

  const BASE_URI = "https://api.example.com/metadata/";

  before(async function () {
    [addr1, addr2, ...addrs] = await ethers.getSigners();

    const SpeakerNFT = await ethers.getContractFactory("SpeakerNFT");
    speakerNFT = await SpeakerNFT.deploy("SpeakerNFT", "SNFT", BASE_URI);
    await speakerNFT.deployed();
  });

  it("Should allow anyone to mint a new NFT for themselves", async function () {
    const CID = "Qm123456789";
    const speakerName = "John Doe";
    const scriptByte = "0x123456789abcdef";

    await speakerNFT.connect(addr1).mint(CID, speakerName, scriptByte);

    const tokenId = 0;

    // Check token owner
    expect(await speakerNFT.ownerOf(tokenId)).to.equal(addr1.address);

    // Check token CID
    expect(await speakerNFT.tokenCID(tokenId)).to.equal(CID);

    // Check speaker name
    expect(await speakerNFT.speakerName(tokenId)).to.equal(speakerName);

    // Check script byte
    expect(await speakerNFT.scriptByte(tokenId)).to.equal(scriptByte);

  });

  it("Should allow another address to mint a new NFT for themselves", async function () {
    const CID = "Qm987654321";
    const speakerName = "Alice";
    const scriptByte = "0x987654321abcdef";

    await speakerNFT.connect(addr2).mint(CID, speakerName, scriptByte);

    const tokenId = 1;

    // Check token owner
    expect(await speakerNFT.ownerOf(tokenId)).to.equal(addr2.address);

    // Check token CID
    expect(await speakerNFT.tokenCID(tokenId)).to.equal(CID);

    // Check speaker name
    expect(await speakerNFT.speakerName(tokenId)).to.equal(speakerName);

    // Check script byte
    expect(await speakerNFT.scriptByte(tokenId)).to.equal(scriptByte);
  });
});
