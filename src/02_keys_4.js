/**
 * @fileOverview CSPR JS SDK demo: KEYS 04 - revoke associated keys.
 */

import * as sleep from 'sleep';
import * as nctl from './nctl/index';


// Set account key pairs.
const faucet = nctl.crypto.getKeyPairOfFaucet();
const user_1 = nctl.crypto.getKeyPairOfUser(1);
const user_2 = nctl.crypto.getKeyPairOfUser(2);
const user_3 = nctl.crypto.getKeyPairOfUser(3);

// Demonstration entry point.
const main = async () => {
    console.log("------------------------------------------------------");
    console.log("Setting associated key weights:");
    console.log("... user 1 -> 0");
    console.log("... user 2 -> 0");
    console.log("... user 3 -> 0");
    
    await nctl.accounts.setAssociatedKeyWeight(faucet, user_1, 0);
    await nctl.accounts.setAssociatedKeyWeight(faucet, user_2, 0);
    await nctl.accounts.setAssociatedKeyWeight(faucet, user_3, 0);

    console.log("------------------------------------------------------");
    console.log("... awaiting deploys to finalise ... ");
    sleep.sleep('20');
    console.log("------------------------------------------------------");
    console.log("To view updated faucet account -> nctl-view-faucet-account");
    console.log("------------------------------------------------------");
};

main();
