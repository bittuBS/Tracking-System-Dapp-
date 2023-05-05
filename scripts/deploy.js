
const hre = require("hardhat");

async function main() {
  
  

  const tracking = await hre.ethers.getContractFactory("tracking");
  const Tracking = await tracking.deploy();

  await Tracking.deployed();

  console.log(
    ` tracking deployed to ${Tracking.address}`
  );
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
