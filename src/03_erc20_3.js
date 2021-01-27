 /**
 * @fileOverview CSPR JS SDK demo: ERC20 03 - fund users.
 */

import { 
    CLValue,
    DeployUtil,
    NamedArg,
    RuntimeArgs
} from 'casper-client-sdk';
import * as nctl from './nctl/index';
import * as sleep from 'sleep';


// Number of tokens to fund each user with.
const AMOUNT = 2000000000;

// Demonstration entry point.
const main = async (client) => {
    const keys = {
        owner: nctl.crypto.getKeyPairOfFaucet(),
        users: nctl.crypto.getKeyPairOfUserSet()
    };
    logKeys(keys);

    console.log("------------------------------------------------------");
    console.log("Dispatching deploys:");
    for (let userKeyPair of keys.users) {
        const deployHash = await dispatchDeploy(client, keys.owner, userKeyPair);
        console.log(`... dispatched deploy: ${deployHash}`);
    }

    console.log("------------------------------------------------------");
    console.log("... awaiting deploys to finalise ... ");
    sleep.sleep('20');
    console.log("------------------------------------------------------");
};

// Helper function to dispatch an ERC-20 fund account deploy.
const dispatchDeploy = async (client, ownerKeyPair, userKeyPair) => {
    return await client.putDeploy(
        DeployUtil.makeDeploy(
            new DeployUtil.DeployParams(
                ownerKeyPair.publicKey,
                nctl.constants.getChainID(),
            ),
            new DeployUtil.StoredContractByName(
                "ERC20",
                "transfer",
                RuntimeArgs.fromNamedArgs([
                    new NamedArg("recipient", CLValue.byteArray(userKeyPair.accountHash())),
                    new NamedArg("amount", CLValue.u256(AMOUNT)),
                ])
            ),
            DeployUtil.standardPayment(nctl.constants.GAS_PAYMENT)
        )
    );
};

// Helper function to log account keys.
const logKeys = ({owner: faucetKeyPair, users: userKeyPairs}) => {
    console.log("------------------------------------------------------");
    console.log("Account Keys:");
    console.log(`... faucet:   ${faucetKeyPair.accountHex()}`);
    userKeyPairs.forEach((userKeyPair, idx) => {
        console.log(`... user ${idx + 1}:   ${userKeyPair.accountHex()}`);
    });
};

main(nctl.node.getClient());
