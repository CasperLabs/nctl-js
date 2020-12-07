/**
 * @fileOverview NCTL cryptographic functions.
 */

 import { Keys } from 'casper-client-sdk';
import * as io from './io';


/**
 * Returns an ED25519 ECC key pair from PEM files previously copied into a directory.
 *
 * @param {String} pathToKeyFolder - File system folder in which key pair is found.
 * @return {Keys.AsymmetricKey} An ED25519 ECC key pair.
*/
const getKeyPair = (pathToKeyFolder) => {
    return Keys.Ed25519.parseKeyFiles(
        `${pathToKeyFolder}/public_key.pem`,
        `${pathToKeyFolder}/secret_key.pem`, 
        );
}

/**
 * Returns a network faucet's ECC key pair.
 *
 * @param {Integer} netID - Identifier of an NCTL test network.
 */
export const getKeyPairOfFaucet = (netID) => {
    return getKeyPair(io.getPathToFaucet(netID));
}

/**
 * Returns a node's ECC key pair.
 *
 * @param {Integer} netID - Identifier of an NCTL test network.
 * @param {Integer} nodeID - Identifier of an NCTL test node.
 */
export const getKeyPairOfNode = (netID, nodeID) => {
    return getKeyPair(io.getPathToNodeKeys(netID, nodeID));
}

/**
 * Returns a user's ECC key pair.
 *
 * @param {Integer} netID - Identifier of an NCTL test network.
 * @param {Integer} userID - Identifier of an NCTL test user.
 */
export const getKeyPairOfUser = (netID, userID) => {
    return getKeyPair(io.getPathToUser(netID, userID));
}
