/**
 * @fileOverview CSPR JS SDK demo: KEYS 03 - execute native transfers with multi-sig.
 */

import * as sleep from 'sleep';
import * as nctl from './nctl/index';


// Set account keys.
const faucet = nctl.crypto.getKeyPairOfFaucet();
const user_1 = nctl.crypto.getKeyPairOfUser(1);
const user_2 = nctl.crypto.getKeyPairOfUser(2);
const user_3 = nctl.crypto.getKeyPairOfUser(3);
const user_4 = nctl.crypto.getKeyPairOfUser(4);

// Set multi-sig approvals.
const MULTI_SIG_APPROVALS = [user_1, user_2, user_3]

// Demonstration entry point.
const main = async () => {
    logBalances({
        typeof: "initial",
        faucet: await nctl.accounts.getBalanceOfFaucet(),
        users: await nctl.accounts.getBalanceOfUserSet()
    });

    console.log("------------------------------------------------------");
    console.log("Dispatch transfers:");
    console.log("... from faucet to user 3 signed by faucet");
    console.log("... from faucet to user 4 signed by users 1, 2 & 3");

    // Transfer to user 3 using default key.
    await nctl.accounts.setTransfer(faucet, user_3, 100000000);

    // Transfer to user 4 using multi-sig.
    await nctl.accounts.setTransfer(faucet, user_4, 100000000, MULTI_SIG_APPROVALS)

    console.log("------------------------------------------------------");
    console.log("... awaiting deploys to finalise ... ");
    sleep.sleep('20');

    logBalances({
        typeof: "final",
        faucet: await nctl.accounts.getBalanceOfFaucet(),
        users: await nctl.accounts.getBalanceOfUserSet()
    });
    console.log("------------------------------------------------------");
};

// Helper function to log balances.
const logBalances = async ({typeof: balanceType, faucet: faucetBalance, users: userBalances}) => {
    console.log("------------------------------------------------------");
    console.log(`Account CSPR Balances (${balanceType}):`);
    console.log(`... faucet:   ${String(faucetBalance)}`);
    for (let userBalance of userBalances) {
        const userID = userBalances.indexOf(userBalance) + 1;
        console.log(`... user ${userID}:   ${String(userBalance)}`);        
    }
};

main();
