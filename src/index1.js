// Example: Transfer tokens from account to account.

// Load SDK
let { CasperClient, Keys, DeployUtil } = require('casper-client-sdk');

// Set RPC endpoint path. 
let nodeUrl = 'http://localhost:40101/rpc';

// Create a client connected to the Casper Node.
let client = new CasperClient(nodeUrl, null);

// Load Faucet account.
// Eg. available via `nctl-view-faucet-secret-key-path` command.
let baseKeyPath = "/home/ziel/workspace/casperlabs/casper-node/utils/nctl/assets/net-1/faucet/";
let privateKeyPath = baseKeyPath + "secret_key.pem";
let publicKeyPath = baseKeyPath + "public_key.pem";
let faucetKeys = Keys.Ed25519.parseKeyFiles(publicKeyPath, privateKeyPath);

// Prepare recipient account.
let targetKeys = client.newEdKeyPair();

(async function () {
    // Check Faucet balance.
    let faucetBalance = await client.balanceOfByPublicKey(faucetKeys.publicKey);
    console.log("Faucet CSPR balance: " + faucetBalance);
    
    // Preapre the Deploy.
    let deployParams = new DeployUtil.DeployParams(
        faucetKeys.publicKey,
        'casper-net-1'
    );
    let transferParams = new DeployUtil.Transfer(
        25,
        targetKeys.publicKey,
        null,
        123
    );
    let payment = DeployUtil.standardPayment(100000000000);
    let transferDeploy = client.makeTransferDeploy(deployParams, transferParams, payment);

    // Sign the Deploy.
    let signedTransferDeploy = client.signDeploy(transferDeploy, faucetKeys); 
    
    // Deploy can be serialized as a JSON.
    console.log("Deploy as a JSON:")
    console.log(client.deployToJson(signedTransferDeploy));

    // Send the Deploy to the network.
    let deployHash = await client.putDeploy(signedTransferDeploy);
    console.log("Transfer hash: " + deployHash);
    
    console.log("Waiting 10s for the deploy to execute...");
    await sleep(10000);
    let targetBalance = await client.balanceOfByPublicKey(targetKeys.publicKey);
    console.log("Recipient balance: " + targetBalance);
})();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}