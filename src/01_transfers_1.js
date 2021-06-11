/**
 * @fileOverview CSPR JS SDK demo: TRANSFERS 01 - native transfers via JS SDK nctl wrapper.
 */

import * as sleep from 'sleep';
import * as nctl from './nctl/index';


// Demonstration entry point.
const main = async () => {

    console.log(await nctl.getDeploy("ebcc2dbd64fe802755b0e2c36df950c2606c6d4d2c0aa24f3593e30023343bdc"))

    // Step 0: set account keys.
    const keys = {
        faucet: nctl.getKeyPairOfFaucet(),
        users: nctl.getKeyPairOfUserSet()
    };
    logKeys(keys);

    // Step 1: display initial balances.
    logBalances({
        typeof: "initial",
        faucet: await nctl.getAccountBalanceOfFaucet(keys.faucet),
        users: await nctl.getAccountBalanceOfUserSet(keys.users)
    });

    // Step 2: dispatch a batch of native transfer - one per user.
    console.log("------------------------------------------------------");
    console.log("Dispatching transfers:");
    const deployHashes = await nctl.setAccountTransferBatch(
        keys.faucet,
        keys.users,
        nctl.constants.TRANSFER_AMOUNT
    );
    for (let deployHash of deployHashes) {
        console.log(`... ${deployHash}`);    
    };

    // Step 3: allow chain to process deploys.
    console.log("------------------------------------------------------");
    console.log("Awaiting transfers ...");    
    for (let deployHash of deployHashes) {
        await nctl.awaitDeploy(deployHash)
    };

    // Step 4: display final balances.
    logBalances({
        typeof: "final",
        faucet: await nctl.getAccountBalanceOfFaucet(keys.faucet),
        users: await nctl.getAccountBalanceOfUserSet(keys.users)
    });
    console.log("------------------------------------------------------");

};

const updateDatabase = async (deployInfo) => {
    "TODO: update databse"
};

const notifyUser = async (deployInfo) => {
    "TODO: send user a message"
};

const onDeployTimeout = async (deployHash) => {
    "TODO: error situation"
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

// Helper function to log account keys.
const logKeys = ({faucet: faucetKeyPair, users: userKeyPairs}) => {
    console.log("------------------------------------------------------");
    console.log("Account Keys:");
    console.log(`... faucet:   ${faucetKeyPair.accountHex()}`);
    userKeyPairs.forEach((userKeyPair, idx) => {
        console.log(`... user ${idx + 1}:   ${userKeyPair.accountHex()}`);
    });
};

main();
