async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const SecureTransfer = await ethers.getContractFactory("SecureTransfer");
    const secureTransfer = await SecureTransfer.deploy("cUSD_TOKEN_ADDRESS"); // Replace with actual cUSD token address on Celo

    console.log("SecureTransfer contract deployed to:", secureTransfer.address);
}

main()
   .then(() => process.exit(0))
   .catch((error) => {
       console.error(error);
       process.exit(1);
   });
