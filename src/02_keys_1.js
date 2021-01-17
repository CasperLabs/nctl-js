/**
 * @fileOverview CSPR JS SDK demo: KEYS 01 - set associated keys + weight.
 */

import * as sleep from 'sleep';
import * as nctl from './nctl/index';


// Set account keys.
const faucet = nctl.crypto.getKeyPairOfFaucet();
const user_1 = nctl.crypto.getKeyPairOfUser(1);
const user_2 = nctl.crypto.getKeyPairOfUser(2);
const user_3 = nctl.crypto.getKeyPairOfUser(3);


// Demonstration entry point.
const main = async () => {
    console.log("Setting associated key weights:");
    console.log("... default -> 10");
    console.log("... user 1 -> 1");
    console.log("... user 2 -> 2");
    console.log("... user 3 -> 3");

    // Set default account key weight.
    await nctl.accounts.setAssociatedKeyWeight(faucet, faucet, 10);

    // Set 3rd party associated key weights.
    await nctl.accounts.setAssociatedKeyWeight(faucet, user_1, 1);
    await nctl.accounts.setAssociatedKeyWeight(faucet, user_2, 2);
    await nctl.accounts.setAssociatedKeyWeight(faucet, user_3, 3);

    console.log("------------------------------------------------------");
    console.log("... awaiting deploys to finalise ... ");
    sleep.sleep('20');
    console.log("------------------------------------------------------");
    console.log("to view updated faucet account -> nctl-view-faucet-account");
};

main();
