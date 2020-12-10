/**
 * @fileOverview Demonstration of CSPR JS SDK - 05.
 * ERC-20 - view installed contract details.
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

    // Step 1: set contract owner key pair.
    const contractOwnerKeyPair = nctl.crypto.getKeyPairOfFaucet(NET_ID, NODE_ID);

    // Step 2: set contract on-chain hash.
    let stateRootHash = await client.nodeClient.getStateRootHash();

    // TODO: get contract hash under named key.

    // TODO: query contract for token name.

    // TODO: query contract for token symbol.

    // TODO: query contract for token total supply.

    // TODO: query contract for token decimals.
})();

