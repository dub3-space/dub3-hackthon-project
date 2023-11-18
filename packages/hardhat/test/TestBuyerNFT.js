// test/BuyerNFT.test.js

const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("BuyerNFT", function () {
  let BuyerNFT;
  let buyerNFT;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy the BuyerNFT contract
    BuyerNFT = await ethers.getContractFactory("BuyerNFT");
    buyerNFT = await BuyerNFT.deploy();
    await buyerNFT.deployed();
  });

  it("should mint a new NFT and retrieve its metadata", async function () {
    const tokenId = 1;
    const cid = "ipfs://your-ipfs-hash";
    const speakerAddress = addr1.address;
    const buyerAddress = addr2.address;
    const script = "Sample script";

    // Mint a new NFT
    await buyerNFT.connect(owner).mint(addr1.address, tokenId, cid, speakerAddress, buyerAddress, script);

    // Retrieve NFT metadata
    const [returnedCid, returnedSpeaker, returnedBuyer, returnedScript] = await buyerNFT.getNFTMetadata(tokenId);

    // Check if the retrieved metadata matches the expected values
    expect(returnedCid).to.equal(cid);
    expect(returnedSpeaker).to.equal(speakerAddress);
    expect(returnedBuyer).to.equal(buyerAddress);
    expect(returnedScript).to.equal(script);
  });
});
