/**
 * @fileOverview NCTL on-chain balance queries.
 */

import * as JSBI from 'jsbi';

import getAccountHash from './getHash';
import * as crypto from '../utils/crypto';
import * as node from '../utils/node';



/**
 * Returns an account balance.
 *
 * @param {KeyPair} keyPair - ECC key pair associated with an on-chain account.
 * @return {JSBI.BigInt} On-chain account balance.
 */
export const getAccountBalance = async (keyPair) => {
    const accountHash = await getAccountHash(keyPair);
    const client = node.getClient();
    const balance = await client.balanceOfByAccountHash(accountHash);

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
 
 