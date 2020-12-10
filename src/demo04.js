/**
 * @fileOverview Demonstration of CSPR JS SDK - 04.
 * ERC-20 - install contract under faucet account.
 */

import { 
    CasperClient,
    CLValue,
    DeployUtil,
    NamedArg,
    RuntimeArgs,
} from 'casper-client-sdk';
import * as fs from 'fs';
import * as nctl from './nctl/index';

// Default NCTL net identifier.
const NET_ID = 1;

// Default NCTL node identifier.
const NODE_ID = 1;

// Node JSON-RPC API endpoint. 
const NODE_URL_RPC = nctl.utils.getNodeURLForRPC(NET_ID, NODE_ID);

// Default gas payment (motes).
const GAS_PAYMENT = 1e11;

// Chain identifier.
const CHAIN_ID = nctl.utils.getChainID(NET_ID);

// Token parameters.
const TOKEN_NAME = "Acme Token";
const TOKEN_SYMBOL = "ACME";
const TOKEN_TOTAL_SUPPLY = 1e15;

// Helper function to log contract owner's key pair.
const logContractOwnerKeyPair = (keyPair) => {
    console.log("------------------------------------------------------");
    console.log("Account Keys:");
    console.log(`... hex:  ${keyPair.accountHex()}`);
    console.log(`... hash: ${keyPair.publicKey.toAccountHash()}`);
    console.log("------------------------------------------------------");
}

// Helper function to log deploy.
const logDeploy = (deployHash) => {
    console.log("------------------------------------------------------");
    console.log("Deploy Info:");
    console.log(`... ${deployHash}`);
    console.log("... awaiting finalisation ... please wait ...");
    console.log("------------------------------------------------------");
}

(async function () {
    // Step 0: create a client connected to a Casper Node.
    const client = new CasperClient(NODE_URL_RPC, null);

    // Step 1: set contract wasm.
    const contractPath = nctl.io.getPathToBinary(NET_ID, "erc20.wasm");
    const contractWASM = fs.readFileSync(contractPath);

    // Step 2: set contract args (passed to constructor).
    const contractArgs = new RuntimeArgs([
        new NamedArg("tokenName", CLValue.fromString(TOKEN_NAME)),
        new NamedArg("tokenSymbol", CLValue.fromString(TOKEN_SYMBOL)),
        new NamedArg("tokenTotalSupply", CLValue.fromU512(TOKEN_TOTAL_SUPPLY)),
    ]);
    const contractArgsAsBytes = contractArgs.toBytes()

    // Step 3: set contract owner key pair.
    const contractOwnerKeyPair = nctl.crypto.getKeyPairOfFaucet(NET_ID, NODE_ID);

    // Step 4: set deploy parameters.
    const params = {
        forDeploy: new DeployUtil.DeployParams(contractOwnerKeyPair.publicKey, CHAIN_ID),
        forSession: new DeployUtil.ModuleBytes(contractWASM, contractArgsAsBytes),
        forPayment: DeployUtil.standardPayment(GAS_PAYMENT)
    };

    // Step 5: set deploy - unsigned.
    const deployUnsigned = DeployUtil.makeDeploy(
        params.forDeploy,
        params.forSession,
        params.forPayment
    );

    // Step 6: set deploy - signed.
    const deploy = client.signDeploy(deployUnsigned, contractOwnerKeyPair); 
    
    // Step 7: set deploy hash (result of dispatch to chain).
    const deployHash = await client.putDeploy(deploy);
    logDeploy(deployHash);
})();
