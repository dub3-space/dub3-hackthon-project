async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT");
  const mynft = await MyNFT.deploy();
  console.log("Contract Deployed to Address:", mynft.address);
}
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
