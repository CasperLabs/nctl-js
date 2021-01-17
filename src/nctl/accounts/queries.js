/**
 * @fileOverview NCTL chain interaction functions.
 */

import * as JSBI from 'jsbi';

import * as constants from '../utils/constants';
import * as crypto from '../utils/crypto';
import * as node from '../utils/node';


/**
 * Returns an account balance.
 *
 * @return {KeyPair} A key pair to be mapped to an on-chain account.
*/
export const getBalance = async (keyPair) => {
    // Set client.
    const client = node.getClient();

    // Dispatch chain query.
    const balance = await client.balanceOfByPublicKey(keyPair.publicKey);

    // Return balance formatted as BigInt.
    return JSBI.BigInt(balance || 0);
};

/**
 * Returns a faucet account account balance.
 *
 * @param {KeyPair} keyPair - ECC key pair associated with faucet account.
 * @return {BigInteger} Balance of a network faucet account.
*/
export const getBalanceOfFaucet = async (keyPair) => {
    keyPair = keyPair || crypto.getKeyPairOfFaucet();

    return await getBalance(keyPair);
};

/**
 * Returns a node account account balance.
 *
 * @param {Integer} nodeID - Identifier of an NCTL test node.
 * @return {BigInteger} Balance of a network user account.
*/
export const getBalanceOfNode = async (nodeID) => {
    const keyPair = crypto.getKeyPairOfNode(nodeID);

    return await getBalance(keyPair);
};

/**
 * Returns account balances of all node accounts.
 *
 * @return {Array} Array of balances.
*/
export const getBalanceOfNodeSet = async (nodeID) => {
    const keyPair = crypto.getKeyPairOfNode(nodeID);

    return await getBalance(keyPair);
};

/**
 * Returns a user account account balance.
 *
 * @param {Integer} userID - Identifier of an NCTL test user.
 * @return {BigInteger} Balance of a network user account.
*/
export const getBalanceOfUser = async (keyPair) => {
    return await getBalance(keyPair);
};

/**
 * Returns account balances of all user accounts.
 *
 * @param {Array} keyPairArray - Array of ECC key pairs associated with NCTL test users.
 * @return {Array} Array of balances.
*/
export const getBalanceOfUserSet = async (keyPairArray) => {
    keyPairArray = keyPairArray || crypto.getKeyPairOfUserSet();

    return Promise.all(keyPairArray.map(getBalanceOfUser));
};

/**
 * Returns an account hash.
 *
 * @return {KeyPair} A key pair to be mapped to an on-chain account hash.
*/
export const getHash = (keyPair) => {
    return Buffer.from(keyPair.accountHash()).toString('hex');
};
