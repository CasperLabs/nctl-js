/**
 * @fileOverview Demonstration of CSPR JS SDK - 01.
 * Transfers - execute using nctl.
 */

import * as sleep from 'sleep';
import * as nctl from './nctl/index';


// Demonstration entry point.
const main = async () => {
    // Step 0: set account keys.
    const faucetKeyPair = nctl.crypto.getKeyPairOfFaucet();
    const userKeyPairs = nctl.crypto.getKeyPairOfUserSet();
    logKeys(faucetKeyPair, userKeyPairs);

    // Step 1: display initial balances.
    logBalances(
        "initial",
        await nctl.chain.getAccountBalanceOfFaucet(),
        await nctl.chain.getAccountBalanceOfUserSet()
        );

    // Step 2: dispatch a wasmless deploy from faucet to each user.
    console.log("------------------------------------------------------");
    console.log("Executing transfers:");    
    for (let userKeyPair of userKeyPairs) {
        const { deployHash } = 
            await nctl.chain.doTransfer(
                faucetKeyPair,
                userKeyPair,
                nctl.constants.TRANSFER_AMOUNT,
                );
        console.log(`... dispatched deploy: ${deployHash}`);
    }

    // Step 3: allow chain to process deploys.
    sleep.sleep('2');

    // Step 4: display final balances.
    logBalances(
        "final",
        await nctl.chain.getAccountBalanceOfFaucet(),
        await nctl.chain.getAccountBalanceOfUserSet()
        );
};

// Helper function to log balances.
const logBalances = (balanceType, faucetBalance, userBalances) => {
    console.log("------------------------------------------------------");
    console.log(`Account CSPR Balances (${balanceType}):`);
    console.log(`... faucet: ${String(faucetBalance)}`);
    userBalances.forEach((userBalance, idx) => {
        console.log(`... user ${idx + 1}:   ${String(userBalance)}`);
    });
    console.log("------------------------------------------------------");
}

// Helper function to log balances.
const logKeys = (faucetKeyPair, userKeyPairs) => {
    console.log("------------------------------------------------------");
    console.log("Account Keys:");
    console.log(`... faucet:   ${faucetKeyPair.accountHex()}`);
    userKeyPairs.forEach((userKeyPair, idx) => {
        console.log(`... user ${idx + 1}:   ${userKeyPair.accountHex()}`);
    });
    console.log("------------------------------------------------------");
}

main();