/**
 * @fileOverview NCTL cryptographic functions.
 */

import { Keys } from 'casper-client-sdk';
import * as constants from './constants';
import * as io from './io';


/**
 * Returns a derived account from a master seed and account index.
 *
 * @param {Integer} index - Derived account index.
 * @param {Bytes} seed - 32 byte hd wallet seed.
 * @return {Keys.KeyPair} A derived ECC key pair.
*/
const getDerivedAccount = (index, seed = constants.HD_WALLET_SEED) => {
    return CasperHDKey.fromMasterSeed(seed).deriveIndex(index);
}

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
 * Returns network faucet ECC key pair.
 */
export const getKeyPairOfFaucet = () => {
    return getKeyPair(io.getPathToFaucet());
}

/**
 * Returns a node ECC key pair.
 *
 * @param {Integer} nodeID - Identifier of an NCTL test node.
 */
export const getKeyPairOfNode = (nodeID) => {
    return getKeyPair(
        io.getPathToNodeKeys(nodeID)
        );
}

/**
 * Returns a user ECC key pair.
 *
 * @param {Integer} userID - Identifier of an NCTL test user.
 */
export const getKeyPairOfUser = (userID) => {
    return getKeyPair(
        io.getPathToUser(userID)
        );
}

/**
 * Returns a set ECC key pairs - one for each user.
 *
 */
export const getKeyPairOfUserSet = () => {
    return constants.USER_ID_SET.map(getKeyPairOfUser);
}
