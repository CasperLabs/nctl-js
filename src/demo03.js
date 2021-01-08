/**
 * @fileOverview Demonstration of CSPR JS SDK - 03.
 * Transfers - query for all faucet main purse transfers.
 */

import { 
    CasperClient,
    Keys,
    DeployUtil
} from 'casper-client-sdk';
import * as nctl from './nctl/index';

// Default NCTL net identifier.
const NET_ID = 1;

// Default NCTL node identifier.
const NODE_ID = 1;

// Node JSON-RPC API endpoint. 
const NODE_URL_RPC = nctl.utils.getNodeURLForRPC(NET_ID, NODE_ID);

// Set event store endpoint path.
const EVENT_STORE_URL = 'http://localhost:3000';

(async function () {
    // Step 0: create a client connected to a Casper Node.
    let client = new CasperClient(NODE_URL_RPC, EVENT_STORE_URL);

    // Step 1: set faucet account key pair.
    const faucetKeyPair = nctl.crypto.getKeyPairOfFaucet();

    // Step 2: set faucet main purse Uref (on-chain query).
    const faucetMainPurseUref = await client.getAccountMainPurseUref(faucetKeyPair.publicKey);
    console.log(`Faucet's main purse Uref:  ${faucetMainPurseUref}`);

    // Step 3: set faucet main purse transfers (on-chain query).
    const faucetTransfers = await client.getTransfersByPurse(faucetMainPurseUref);

    // Step 4: set incoming transfers.
    const faucetTransfersIncoming = faucetTransfers.filter(t => t.targetPurse == faucetMainPurseUref);
    console.log(`# of incoming transfers: ${faucetTransfersIncoming.length}`);

    // Step 5: set outgoing transfers.
    const faucetTransfersOutgoing = faucetTransfers.filter(t => t.sourcePurse == faucetMainPurseUref);
    console.log(`# of outgoing transfers: ${faucetTransfersOutgoing.length}`);
})();
