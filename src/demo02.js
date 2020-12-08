/**
 * @fileOverview Demonstration of CSPR JS SDK - 02.
 */

import { 
    CasperClient,
    Keys,
    DeployUtil
} from 'casper-client-sdk';
import * as sleep from 'sleep';
import * as nctl from './nctl/index';

// Node JSON-RPC API RPC endpoint. 
const NODE_URL_RPC = 'http://localhost:40101/rpc';

// Default NCTL net identifier.
const NCTL_NET_ID = 1;

// Default NCTL node identifier.
const NCTL_NODE_ID = 1;

// Default NCTL user identifier.
const NCTL_USER_ID = 1;

// Default amount transferred between counter-parties .
const TRANSFER_AMOUNT = 1e9;

// Default amount transferred between counter-parties .
const GAS_PAYMENT = 1e11;

// Helper function to log balances.
const logBalances = (balanceType, faucetBalance, userBalance) => {
    console.log("------------------------------------------------------");
    console.log(`Account CSPR Balances (${balanceType}):`);
    console.log(`... faucet: ${faucetBalance}`);
    console.log(`... user:   ${userBalance}`);
    console.log("------------------------------------------------------");
}

// Helper function to log deploy.
const logDeploy = (deployHash, deployAsJSON) => {
    console.log("------------------------------------------------------");
    console.log("Deploy Info:");
    console.log(deployAsJSON);
    console.log("... awaiting finalisation ... please wait ...");
    console.log("------------------------------------------------------");
}

// Helper function to log balances.
const logKeys = (faucetKeyPair, userKeyPair) => {
    console.log("------------------------------------------------------");
    console.log("Account Keys:");
    console.log(`... faucet: ${faucetKeyPair.accountHex()}`);
    console.log(`... user:   ${userKeyPair.accountHex()}`);
    console.log("------------------------------------------------------");
}

(async function () {
    // Step 0: create a client connected to a Casper Node.
    const client = new CasperClient(NODE_URL_RPC, null);

    // Step 1: set account keys.
    const faucetKeyPair = nctl.crypto.getKeyPairOfFaucet(NCTL_NET_ID, NCTL_NODE_ID);
    const userKeyPair = Keys.Ed25519.new();
    logKeys(faucetKeyPair, userKeyPair);

    // Step 2: display initial balances.
    logBalances(
        "initial",
        await client.balanceOfByPublicKey(faucetKeyPair.publicKey),
        await client.balanceOfByPublicKey(userKeyPair.publicKey)
        );

    // Step 3: set deploy parameters.
    const params = {
        deploy: new DeployUtil.DeployParams(
            faucetKeyPair.publicKey,
            `casper-net-${NCTL_NET_ID}`
        ),
        transfer: new DeployUtil.Transfer(TRANSFER_AMOUNT, userKeyPair.publicKey),
        payment: DeployUtil.standardPayment(GAS_PAYMENT)
    }

    // Step 4: set deploy - unsigned.
    const deployUnsigned = client.makeTransferDeploy(params.deploy, params.transfer, params.payment);

    // Step 5: set deploy - signed.
    const deploy = client.signDeploy(deployUnsigned, faucetKeyPair); 

    // Step 5: set deploy - JSON representation.
    const deployJSON = client.deployToJson(deploy)

    // Step 6: set deploy hash (result of dispatch to chain).
    const deployHash = await client.putDeploy(deploy);
    logDeploy(deployHash, deployJSON)
    sleep.sleep('10');

    // Step 7: display final balances.
    logBalances(
        "final",
        await client.balanceOfByPublicKey(faucetKeyPair.publicKey),
        await client.balanceOfByPublicKey(userKeyPair.publicKey)
        );
})();
