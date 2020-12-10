/**
 * @fileOverview Demonstration of CSPR JS SDK - 01.
 * Transfers - execute using nctl.
 */

import * as nctl from './nctl/index';
import * as sleep from 'sleep';

// Default NCTL net identifier.
const NET_ID = 1;

// Default NCTL node identifier.
const NODE_ID = 1;

// Default NCTL user identifier.
const USER_ID = 1;

// Default amount transferred between counter-parties .
const TRANSFER_AMOUNT = 1e9;

// Helper function to log balances.
const logBalances = (balanceType, faucetBalance, userBalance) => {
    console.log("------------------------------------------------------");
    console.log(`Account CSPR Balances (${balanceType}):`);
    console.log(`... faucet: ${faucetBalance}`);
    console.log(`... user:   ${userBalance}`);
    console.log("------------------------------------------------------");
}

// Helper function to log balances.
const logKeys = (faucetKeyPair, userKeyPair) => {
    console.log("------------------------------------------------------");
    console.log("Account Keys:");
    console.log(`... faucet: ${faucetKeyPair.accountHex()}`);
    console.log(`... user:   ${userKeyPair.accountHex()}`);
    console.log("------------------------------------------------------");
}

(async function () {
    // Step 0: set account keys.
    const faucetKeyPair = nctl.crypto.getKeyPairOfFaucet(NET_ID, NODE_ID);
    const userKeyPair = nctl.crypto.getKeyPairOfUser(NET_ID, USER_ID);
    logKeys(faucetKeyPair, userKeyPair);

    // Step 1: display initial balances.
    let faucetBalance = await nctl.chain.getAccountBalanceOfFaucet(NET_ID);
    let userBalance = await nctl.chain.getAccountBalanceOfUser(NET_ID, NODE_ID, USER_ID);
    logBalances("initial", faucetBalance, userBalance);

    // Step 2: dispatch a wasmless deploy from faucet to user 1.
    const { deploy, deployHash } = 
        await nctl.chain.doTransfer(
            faucetKeyPair,
            userKeyPair,
            TRANSFER_AMOUNT,
            NET_ID,
            NODE_ID,
            );

    // Step 3: Display user account information.
    sleep.sleep('2');
    faucetBalance = await nctl.chain.getAccountBalanceOfFaucet(NET_ID, NODE_ID);
    userBalance = await nctl.chain.getAccountBalanceOfUser(NET_ID, NODE_ID, USER_ID);
    logBalances("final", faucetBalance, userBalance);
})();
