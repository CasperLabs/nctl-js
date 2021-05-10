/**
 * @fileOverview CSPR JS SDK demo: KEYS 02 - set action thresholds.
 */

import * as sleep from 'sleep';
import * as nctl from './nctl/index';


// Set account key.
const faucet = nctl.getKeyPairOfFaucet();

// Demonstration entry point.
const main = async () => {
    console.log("Setting action thresholds:");
    console.log("... deploy dispatch -> 5");
    console.log("... key management -> 8");

    // Set action threshold: deploy dispatch.
    await nctl.setAccountActionThreshold(faucet, "set_deployment_threshold", 5);

    // Set action threshold: key management.
    await nctl.setAccountActionThreshold(faucet, "set_key_management_threshold", 8);

    console.log("------------------------------------------------------");
    console.log("... awaiting deploys to finalise ... ");
    sleep.sleep('20');
    console.log("------------------------------------------------------");
    console.log("to view updated faucet account -> nctl-view-faucet-account");
};

main();
