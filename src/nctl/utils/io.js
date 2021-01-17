/**
 * @fileOverview NCTL file system i/o functions.
 */

import * as fs from 'fs';
import * as constants from './constants';


// Path to NCTL root folder.
export const PATH_TO_NCTL = process.env.NCTL;

/**
 * Returns contract wasm as byte array.
 * @param {String} fileName - Name of a contract wasm file to be loaded into memory.
 * @return {Uint8Array} Byte array.
 */
export const getContractWasm = (fileName) => {
    const pathToBinary = getPathToBinary(fileName);

    return new Uint8Array(fs.readFileSync(pathToBinary, null).buffer);
};

/**
 * Returns path to a network's asset set.
 */
export const getPathToAssets = () => {
    return `${PATH_TO_NCTL}/assets`
};

/**
 * Returns path to a network binary.
 */
export const getPathToBinary = (binaryFileName) => {
    return `${getPathToNet()}/bin/${binaryFileName}`;
};

/**
 * Returns path to a network's faucet root directory.
 *
 */
export const getPathToFaucet = () => {
    return `${getPathToNet()}/faucet`;
};

/**
 * Returns path to a network's faucet public key PEM file.
 *
 */
export const getPathToFaucetPublicKeyPEMFile = () => {
    return `${getPathToFaucet()}/public_key.pem`;
};

/**
 * Returns path to a network's faucet secret key PEM file.
 *
 */
export const getPathToFaucetSecretKeyPEMFile = () => {
    return `${getPathToFaucet()}/secret_key.pem`;
};

/**
 * Returns path to a network root directory.
 *
 */
export const getPathToNet = () => {
    return `${getPathToAssets()}/net-${constants.NET_ID}`;
};

/**
 * Returns path to a node's root directory.
 *
 * @param {Integer} nodeID - Identifier of an NCTL test node.
 */
 export const getPathToNode = (nodeID) => {
    return `${getPathToNet()}/nodes/node-${nodeID}`;
};

/**
 * Returns path to a node's config file.
 *
 * @param {Integer} nodeID - Identifier of an NCTL test node.
 */
export const getPathToNodeConfigFile = (nodeID) => {
    return `${getPathToNode(nodeID)}/config/node-config.toml`;
};

/**
 * Returns path to a node's keys sub-directory.
 *
 * @param {Integer} nodeID - Identifier of an NCTL test node.
 */
export const getPathToNodeKeys = (nodeID) => {
    return `${getPathToNode(nodeID)}/keys`;
};

/**
 * Returns path to a node's logs sub-directory.
 *
 * @param {Integer} nodeID - Identifier of an NCTL test node.
 */
export const getPathToNodeLogs = (nodeID) => {
    return `${getPathToNode(nodeID)}/logs`;
};

/**
 * Returns path to a node's storage sub-directory.
 *
 * @param {Integer} nodeID - Identifier of an NCTL test node.
 */
export const getPathToNodeStorage = (nodeID) => {
    return `${getPathToNode(nodeID)}/storage`;
};

/**
 * Returns path to a user's root directory.
 *
 * @param {Integer} nodeID - Identifier of an NCTL test node.
 */
export const getPathToUser = (userID) => {
    return `${getPathToNet()}/users/user-${userID}`;
};
