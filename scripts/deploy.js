const hre = require("hardhat");




async function main() {

    const Drive = await hre.ethers.getContractFactory("Drive");
    const DriveContract = await Drive.deploy();

    await DriveContract.deployed();

    console.log("Drive deployed to:", DriveContract.address);

}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})