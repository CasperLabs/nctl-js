 /**
 * @fileOverview CSPR JS SDK demo: ERC20 01 - install contract under faucet account.
 */

import * as sleep from 'sleep';
import { 
    CLValue,
    DeployUtil,
    NamedArg,
    RuntimeArgs,
} from 'casper-client-sdk';
import * as nctl from './nctl/index';


// Token parameters.
const TOKEN_NAME = "Acme Token";
const TOKEN_SYMBOL = "ACME";
const TOKEN_TOTAL_SUPPLY = 1e15;

// Demonstration entry point.
const main = async (client) => {
    // Step 1: set contract owner account key.
    const ownerKeyPair = nctl.crypto.getKeyPairOfFaucet();
    logContractOwnerKeyPair(ownerKeyPair);

    // Step 2: set contract installation deploy.
    let deploy = DeployUtil.makeDeploy(
        new DeployUtil.DeployParams(
            ownerKeyPair.publicKey,
            nctl.constants.getChainID(),
        ),
        new DeployUtil.ModuleBytes(
            nctl.io.getBinary("erc20.wasm"),
            new RuntimeArgs([
                new NamedArg("tokenName", CLValue.string(TOKEN_NAME)),
                new NamedArg("tokenSymbol", CLValue.string(TOKEN_SYMBOL)),
                new NamedArg("tokenTotalSupply", CLValue.u512(TOKEN_TOTAL_SUPPLY)),
            ]).toBytes()
        ),
        DeployUtil.standardPayment(nctl.constants.GAS_PAYMENT_FOR_CONTRACT_INSTALLATION)
    );

    // Step 3: sign deploy.
    deploy = client.signDeploy(deploy, ownerKeyPair); 

    // Step 4: set deploy hash (result of dispatch to chain).
    const deployHash = await client.putDeploy(deploy);
    logDeploy(deployHash);
};

// Helper function to log contract owner's key pair.
const logContractOwnerKeyPair = (keyPair) => {
    console.log("------------------------------------------------------");
    console.log("ERC20 Contract Owner Account:");
    console.log(`... key:  ${keyPair.accountHex()}`);
    console.log(`... hash: ${Buffer.from(keyPair.publicKey.toAccountHash()).toString('hex')}`);
    console.log("------------------------------------------------------");
};

// Helper function to log deploy.
const logDeploy = (deployHash) => {
    console.log("------------------------------------------------------");
    console.log("ERC20 Contract Deploy Info:");
    console.log(`... hash: ${deployHash}`);
    console.log("... awaiting finalisation ... please wait ...");
    sleep.sleep('10');
    console.log("------------------------------------------------------");
    console.log("To view deploy details:");
    console.log(`nctl-view-chain-deploy deploy=${deployHash}`);
    console.log("------------------------------------------------------");
};

main(nctl.node.getClient());
