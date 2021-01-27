/**
 * @fileOverview CSPR JS SDK demo: TRANSFERS 02 - native transfers via SDK.
 */

import { 
    DeployUtil
} from 'casper-client-sdk';
import * as nctl from './nctl/index';
import * as sleep from 'sleep';


// Demonstration entry point.
const main = async (client) => {
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
        // Set deploy params.
        const params = {
            deploy: new DeployUtil.DeployParams(
                keys.faucet.publicKey,
                nctl.constants.getChainID(),
                ),
            transfer: DeployUtil.ExecutableDeployItem.newTransfer(
                nctl.constants.TRANSFER_AMOUNT,
                userKeyPair.publicKey
                ),
            payment: DeployUtil.standardPayment(nctl.constants.GAS_PAYMENT)
        };

        // Set deploy (unsigned).
        const deployUnsigned = client.makeTransferDeploy(params.deploy, params.transfer, params.payment);

        // Set deploy (signed).
        const deploy = client.signDeploy(deployUnsigned, keys.faucet);

        // Dispatch deploy to node.
        const deployHash = await client.putDeploy(deploy);

        // Log dispatched deploy.
        logDeploy(client.deployToJson(deploy));
    }
    sleep.sleep('10');

    // Step 4: display final balances.
    logBalances({
        typeof: "final",
        faucet: await nctl.accounts.getBalanceOfFaucet(keys.faucet),
        users: await nctl.accounts.getBalanceOfUserSet(keys.users)
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

// Helper function to log deploy.
const logDeploy = (deployAsJSON) => {
    console.log("------------------------------------------------------");
    console.log("Deploy Info:");
    console.log(deployAsJSON);
    console.log("... awaiting finalisation ... please wait ...");
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

main(nctl.node.getClient());
