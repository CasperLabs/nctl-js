/**
 * @fileOverview CSPR JS SDK demo 01 - native transfers via JS SDK nctl wrapper.
 */

import * as sleep from 'sleep';
import * as nctl from './nctl/index';


// Demonstration entry point.
const main = async () => {
    // Step 0: set account keys.
    const keys = {
        faucet: nctl.crypto.getKeyPairOfFaucet(),
        users: nctl.crypto.getKeyPairOfUserSet()
    };
    logKeys(keys);

    // Step 1: display initial balances.
    logBalances({
        typeof: "initial",
        faucet: await nctl.accounts.getBalanceOfFaucet(keys.faucet),
        users: await nctl.accounts.getBalanceOfUserSet(keys.users)
    });

    // Step 2: dispatch a native transfer from faucet to each user.
    console.log("------------------------------------------------------");
    console.log("Executing transfers:");    
    for (let userKeyPair of keys.users) {
        const deployHash = 
            await nctl.accounts.setTransfer(
                keys.faucet,
                userKeyPair,
                nctl.constants.TRANSFER_AMOUNT,
                );
        console.log(`... dispatched deploy: ${deployHash}`);
    }

    // Step 3: allow chain to process deploys.
    console.log("Awaiting transfers ...");    
    sleep.sleep('10');

    // Step 4: display final balances.
    logBalances({
        typeof: "final",
        faucet: await nctl.accounts.getBalanceOfFaucet(keys.faucet),
        users: await nctl.accounts.getBalanceOfUserSet(keys.users)
    });
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
    console.log("------------------------------------------------------");
};

// Helper function to log account keys.
const logKeys = ({faucet: faucetKeyPair, users: userKeyPairs}) => {
    console.log("------------------------------------------------------");
    console.log("Account Keys:");
    console.log(`... faucet:   ${faucetKeyPair.accountHex()}`);
    userKeyPairs.forEach((userKeyPair, idx) => {
        console.log(`... user ${idx + 1}:   ${userKeyPair.accountHex()}`);
    });
    console.log("------------------------------------------------------");
};

main();
