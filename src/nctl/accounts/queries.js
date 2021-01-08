/**
 * @fileOverview NCTL chain interaction functions.
 */

import * as JSBI from 'jsbi';

import { 
    CasperClient,
    CasperServiceByJsonRPC,
    Keys,
    DeployUtil
} from 'casper-client-sdk';
import * as constants from '../constants';
import * as crypto from '../crypto';
import * as utils from '../utils';


/**
 * Returns account balance of a network faucet account.
 *
 * @return {Keys.KeyPair} An on-chain account key.
*/
export const getAccount = async (keyPair) => {
    // Set client.
    const client = getClientJsonRPC();

    // Set state root hash.
    const stateRootHash = (await client.getLatestBlockInfo()).block.header.state_root_hash;

    // Set account.
    const account = await client.getBlockState(
        stateRootHash,
        'account-hash-' + toAccountHashString(publicKey),
        []
    ).then(res => res.stored_value.Account);

    return account;
}

/**
 * Returns account balance of a network faucet account.
 *
 * @return {KeyPair} An on-chain account key.
*/
export const getAccountBalance = async (keyPair) => {
    // Set client.
    const client = getClient();

    // Dispatch chain query.
    let balance = await client.balanceOfByPublicKey(keyPair.publicKey);

    // Return balance formatted as BigInt
    return JSBI.BigInt(balance || 0);
};

/**
 * Returns account balance of a network faucet account.
 *
 * @return {BigInteger} Balance of a network faucet account.
*/
export const getAccountBalanceOfFaucet = async () => {
    // Set key pair associated with account.
    const keyPair = crypto.getKeyPairOfFaucet();

    // Query chain & return balance.
    return await getAccountBalance(keyPair);
};

/**
 * Returns account balance of a network node account.
 *
 * @param {Integer} nodeID - Identifier of an NCTL test node.
 * @return {BigInteger} Balance of a network user account.
*/
export const getAccountBalanceOfNode = async (nodeID) => {
    // Set key pair associated with account.
    const keyPair = crypto.getKeyPairOfNode(nodeID);

    // Query chain & return balance.
    return await getAccountBalance(keyPair);
};

/**
 * Returns account balance of a network user account.
 *
 * @param {Integer} userID - Identifier of an NCTL test user.
 * @return {BigInteger} Balance of a network user account.
*/
export const getAccountBalanceOfUser = async (userID) => {
    // Set key pair associated with account.
    const keyPair = crypto.getKeyPairOfUser(userID);

    // Query chain & return balance.
    return await getAccountBalance(keyPair);
};

/**
 * Returns account balance of a network user account.
 *
 * @return {Array} Array of user balances.
*/
export const getAccountBalanceOfUserSet = async () => {
    return Promise.all(
        constants.USER_ID_SET.map(getAccountBalanceOfUser)
        )
};
