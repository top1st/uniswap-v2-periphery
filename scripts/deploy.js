// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const {ethers, network} = hre
require('dotenv').config()

const deployer = new ethers.Wallet(process.env.PRIVATE_KEY, ethers.provider)

const factoryAddress = "0xA3BceDADB23CfAA592aC42f5A18C98F98a37dA77"

const WETHAddress = {
    'hardhat': '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    'mainnet': '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    'rinkeby': '0xc778417E063141139Fce010982780140Aa0cD5Ab'
}[network.name]

async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

    const factory = await hre.ethers.getContractAt("IMintyswapV2Factory", factoryAddress, deployer)
    // We get the contract to deploy
    const Router = await hre.ethers.getContractFactory("MintyswapV2Router02", deployer);
    const router = await Router.deploy(factory.address, WETHAddress);

    await router.deployed();

    console.log("router deployed to:", router.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
