/**
 * @fileOverview CSPR JS SDK demo: TRANSFERS 03 - query account transfers from event store.
 */

import * as nctl from './nctl/index';


// Demonstration entry point.
const main = async (client) => {
    // Step 1: set faucet key pair.
    const keyPair = nctl.crypto.getKeyPairOfFaucet();
    console.log(`Faucet account key:  ${keyPair.accountHex()}`);

    // Step 2: set faucet account hash.
    const accountHash = nctl.accounts.getHash(keyPair);
    console.log(`Faucet account hash:  ${accountHash}`);

    // Step 3: set faucet main purse Uref (on-chain query).
    const mainPurseUref = await client.getAccountMainPurseUref(keyPair.publicKey);
    console.log(`Faucet main purse Uref:  ${mainPurseUref}`);

    // Step 4: set faucet main purse transfers (on-chain query).
    const transfers = await client.getTransfersByPublicKey(keyPair.publicKey);
    if (transfers.length === 0) {
        console.log("Please run demo 01 in order to view transfers.")
        return;
    }

    // Step 5: set faucet transfers (incoming).
    const transfersIncoming = transfers.filter(t => t.targetPurse == mainPurseUref);
    console.log(`Faucet main purse # of incoming transfers: ${transfersIncoming.length}`);

    // Step 6: set faucet transfers (outgoing).
    const transfersOutgoing = transfers.filter(t => t.sourcePurse == mainPurseUref);
    console.log(`Faucet main purse # of outgoing transfers: ${transfersOutgoing.length}`);

    console.log("------------------------------------------------------");
    console.log("Example transfer data returned from event store:");
    console.log(transfers[Math.floor(Math.random() * transfers.length)]);
    console.log("------------------------------------------------------");
};

main(nctl.node.getClient());
