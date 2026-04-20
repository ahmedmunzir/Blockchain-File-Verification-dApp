const fs = require('fs');

async function main() {
    const [deployer] = await ethers.getSigners();
    
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

    const FileVerification = await ethers.getContractFactory("FileVerification");
    
    console.log("Deploying FileVerification...");
    const fileVerification = await FileVerification.deploy();
    
    console.log("Waiting for deployment to complete...");
    await fileVerification.waitForDeployment();
    
    console.log("FileVerification deployed to:", fileVerification.target);

    
    const envPath = '.env';
    let envContent = '';

    if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf8');
    }

    const lines = envContent.split('\n').filter(line => line.trim() !== '');
    
    
    let addressFound = false;
    let keyFound = false;
    
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('CONTRACT_ADDRESS=')) {
            lines[i] = `CONTRACT_ADDRESS=${fileVerification.target}`;
            addressFound = true;
        } else if (lines[i].startsWith('PRIVATE_KEY=')) {
            keyFound = true;
        }
    }

    if (!addressFound) {
        lines.push(`CONTRACT_ADDRESS=${fileVerification.target}`);
    }
    
    if (!keyFound) {
        
        
        lines.push(`PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`);
        console.log('⚠️  Using default private key for local development');
        console.log('⚠️  For production, please set your own PRIVATE_KEY in .env file');
    }

    fs.writeFileSync(envPath, lines.join('\n') + '\n');
    console.log('✅ Contract address and configuration saved to .env');
    console.log('📄 Contract deployed successfully!');
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });