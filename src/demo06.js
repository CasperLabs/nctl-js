import * as sleep from 'sleep';
import * as nctl from './nctl/index';


// Set account key pairs.
const faucet = nctl.crypto.getKeyPairOfFaucet();
const user_1 = nctl.crypto.getKeyPairOfUser(1);
const user_2 = nctl.crypto.getKeyPairOfUser(2);
const user_3 = nctl.crypto.getKeyPairOfUser(3);
const user_4 = nctl.crypto.getKeyPairOfUser(4);

// Set multi-sig approvals.
const MULTI_SIG_APPROVALS = [user_1, user_2, user_3]


// Demonstration entry point.
// We will associate 2  additional accounts to the faucet account.  We will
// grant those accounts permissions to perform transfers.  However they will not
// be able to add other accounts - this remains available only to the faucet account. 
const main = async () => {
    // 1. Set key weights.
    await nctl.accounts.setAssociatedKeyWeight(faucet, faucet, 10);
    await nctl.accounts.setAssociatedKeyWeight(faucet, user_1, 1);
    await nctl.accounts.setAssociatedKeyWeight(faucet, user_2, 2);
    await nctl.accounts.setAssociatedKeyWeight(faucet, user_3, 3);
    console.log("1. set associated key weights:");
    console.log("... default -> 10");
    console.log("... user 1 -> 1");
    console.log("... user 2 -> 2");
    console.log("... user 3 -> 3");
    console.log("... awaiting deploys to finalise ... ");
    sleep.sleep('20');

    // 2. Set action thresholds.
    await nctl.accounts.setActionThreshold(faucet, "set_deployment_threshold", 5);
    await nctl.accounts.setActionThreshold(faucet, "set_key_management_threshold", 8);
    console.log("2. set action thresholds:");
    console.log("... deploy dispatch -> 5");
    console.log("... key management -> 8");
    console.log("... awaiting deploys to finalise ... ");
    sleep.sleep('20');

    // 3. Dispatch transfers.
    await nctl.accounts.setTransfer(faucet, user_3, 100000000);
    await nctl.accounts.setTransfer(faucet, user_4, 100000000, MULTI_SIG_APPROVALS)
    console.log("3. dispatch transfers:");
    console.log("... awaiting deploys to finalise ... ");
    sleep.sleep('60');

    // 4. Remove associated keys.
    await nctl.accounts.setAssociatedKeyWeight(faucet, user_1, 0);
    await nctl.accounts.setAssociatedKeyWeight(faucet, user_2, 0);
    await nctl.accounts.setAssociatedKeyWeight(faucet, user_3, 0);
    console.log("4. deleted account associated key weights:");
    console.log("... awaiting deploys to finalise ... ");
    sleep.sleep('60');

    // 5. Dispatch transfers.
    await nctl.accounts.setTransfer(faucet, user_3, 100000000);
    let deployHash = await nctl.accounts.setTransfer(faucet, user_4, 100000000, MULTI_SIG_APPROVALS)
    console.log("dispatched transfers:");
    console.log(`... ${deployHash} <= multi sig`);
    console.log("... awaiting deploys to finalise ... ");
    sleep.sleep('60');
};

main();
