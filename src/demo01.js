/**
 * @fileOverview Demonstration of CSPR JS SDK - 01.
 */

import * as sleep from 'sleep';
import * as nctl from './nctl/index';

// Default NCTL net identifier.
const NCTL_NET_ID = 1;

// Default NCTL node identifier.
const NCTL_NODE_ID = 1;

// Default NCTL user identifier.
const NCTL_USER_ID = 1;

// Default amount transferred between counter-parties .
const TRANSFER_AMOUNT = 1e9;

// Helper function to log balances.
const logBalances = (balanceType, faucetBalance, userBalance) => {
    console.log("------------------------------------------------------");
    console.log(`Faucet CSPR balance (${balanceType}): ${faucetBalance}`);
    console.log(`User CSPR balance   (${balanceType}): ${userBalance}`);
    console.log("------------------------------------------------------");
}

(async function () {
    // Step 0: set account keys.
    const faucetKeyPair = nctl.crypto.getKeyPairOfFaucet(NCTL_NET_ID, NCTL_NODE_ID);
    const userKeyPair = nctl.crypto.getKeyPairOfUser(NCTL_NET_ID, NCTL_USER_ID);

    // Step 1: display initial balances.
    let faucetBalance = await nctl.chain.getAccountBalanceOfFaucet(NCTL_NET_ID);
    let userBalance = await nctl.chain.getAccountBalanceOfUser(NCTL_NET_ID, NCTL_NODE_ID, NCTL_USER_ID);
    logBalances("initial", faucetBalance, userBalance);

    // Step 2: dispatch a wasmless deploy from faucet to user 1.
    const transferDeployInfo = 
        await nctl.chain.doTransfer(
            faucetKeyPair,
            userKeyPair,
            TRANSFER_AMOUNT,
            NCTL_NET_ID,
            NCTL_NODE_ID,
            );
    
    // Step 3: Display user account information.
    sleep.sleep('2');
    faucetBalance = await nctl.chain.getAccountBalanceOfFaucet(NCTL_NET_ID, NCTL_NODE_ID);
    userBalance = await nctl.chain.getAccountBalanceOfUser(NCTL_NET_ID, NCTL_NODE_ID, NCTL_USER_ID);
    logBalances("final", faucetBalance, userBalance);
})();
