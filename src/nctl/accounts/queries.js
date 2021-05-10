/**
 * @fileOverview NCTL chain interaction functions.
 */

import * as JSBI from 'jsbi';

import * as clargs from '../utils/clargs';
import * as constants from '../utils/constants';
import * as crypto from '../utils/crypto';
import * as node from '../utils/node';
import * as state from '../state';


/**
 * Returns on-chain account details.
 *
 * @param {KeyPair} keyPair - ECC key pair associated with an on-chain account.
 * @return {Object} On-chain account information.
*/
export const getAccount = async (keyPair) => {
    const accountHash = clargs.getAccountHash(keyPair);
    const stateRootHash = await state.getStateRootHash();
    const client = node.getClient();

    const {
        stored_value: {
            Account: account
        }
    } = await client.nodeClient.getBlockState(stateRootHash, accountHash, []);

    return account;
};

/**
 * Returns an account balance.
 *
 * @param {KeyPair} keyPair - ECC key pair associated with an on-chain account.
 * @return {JSBI.BigInt} On-chain account balance.
*/
export const getAccountBalance = async (keyPair) => {
    const client = node.getClient();
    const balance = await client.balanceOfByPublicKey(keyPair.publicKey);

    return JSBI.BigInt(balance || 0);
};

/**
 * Returns a faucet account account balance.
 *
 * @param {KeyPair} keyPair - ECC key pair associated with faucet account.
 * @return {BigInteger} Balance of a network faucet account.
*/
export const getAccountBalanceOfFaucet = async (keyPair) => {
    keyPair = keyPair || crypto.getKeyPairOfFaucet();

    return await getAccountBalance(keyPair);
};

/**
 * Returns a node account account balance.
 *
 * @param {Integer} nodeID - Identifier of an NCTL test node.
 * @return {BigInteger} Balance of a network user account.
*/
export const getAccountBalanceOfNode = async (nodeID) => {
    const keyPair = crypto.getKeyPairOfNode(nodeID);

    return await getAccountBalance(keyPair);
};

/**
 * Returns account balances of all node accounts.
 *
 * @return {Array} Array of balances.
*/
export const getAccountBalanceOfNodeSet = async (nodeID) => {
    const keyPair = crypto.getKeyPairOfNode(nodeID);

    return await getAccountBalance(keyPair);
};

/**
 * Returns a user account account balance.
 *
 * @param {Integer} userID - Identifier of an NCTL test user.
 * @return {BigInteger} Balance of a network user account.
*/
export const getAccountBalanceOfUser = async (keyPair) => {
    return await getAccountBalance(keyPair);
};

/**
 * Returns account balances of all user accounts.
 *
 * @param {Array} keyPairArray - Array of ECC key pairs associated with NCTL test users.
 * @return {Array} Array of balances.
*/
export const getAccountBalanceOfUserSet = async (keyPairArray) => {
    keyPairArray = keyPairArray || crypto.getKeyPairOfUserSet();

    return Promise.all(keyPairArray.map(getAccountBalanceOfUser));
};

/**
 * Returns an account hash.
 *
 * @param {KeyPair} keyPair - ECC key pair associated with an on-chain account.
 * @return {String} Hexadecimal representation of an on-chain account hash.
*/
export const getAccountHash = (keyPair) => {
    return Buffer.from(keyPair.accountHash()).toString('hex');
};

/**
 * Returns a named key associated with on-chain account .
 *
 * @param {KeyPair} keyPair - ECC key pair associated with an on-chain account.
 * @param {String} namedKeyID - Identifier of associated named key.
 * @return {String} The named key.
*/
export const getAccountNamedKey = async (keyPair, namedKeyID) => {
    let { named_keys } = await getAccountDetails(keyPair);    
    named_keys = named_keys.filter(i => i.name == namedKeyID);

    return named_keys.length > 0 ? named_keys[0].key : undefined;
};
