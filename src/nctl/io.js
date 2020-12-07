/**
 * @fileOverview NCTL file system i/o functions.
 */

 // Path to NCTL root folder.
export const PATH_TO_NCTL = process.env.NCTL;

/**
 * Returns path to a network's asset set.
 */
export const getPathToAssets = () => {
    return `${PATH_TO_NCTL}/assets`
};

/**
 * Returns path to a network's faucet root directory.
 *
 * @param {Integer} netID - Identifier of an NCTL test network.
 */
export const getPathToFaucet = (netID) => {
    return `${getPathToNet(netID)}/faucet`
};

/**
 * Returns path to a network's faucet public key PEM file.
 *
 * @param {Integer} netID - Identifier of an NCTL test network.
 */
export const getPathToFaucetPublicKeyPEMFile = (netID) => {
    return `${getPathToFaucet(netID)}/public_key.pem`
};

/**
 * Returns path to a network's faucet secret key PEM file.
 *
 * @param {Integer} netID - Identifier of an NCTL test network.
 */
export const getPathToFaucetSecretKeyPEMFile = (netID) => {
    return `${getPathToFaucet(netID)}/secret_key.pem`
};

/**
 * Returns path to a network root directory.
 *
 * @param {Integer} netID - Identifier of an NCTL test network.
 */
export const getPathToNet = (netID) => {
    return `${getPathToAssets()}/net-${netID}`
};

/**
 * Returns path to a node's root directory.
 *
 * @param {Integer} netID - Identifier of an NCTL test network.
 * @param {Integer} nodeID - Identifier of an NCTL test node.
 */
 export const getPathToNode = (netID, nodeID) => {
    return `${getPathToNet(netID)}/nodes/node-${nodeID}`
};

/**
 * Returns path to a node's config file.
 *
 * @param {Integer} netID - Identifier of an NCTL test network.
 * @param {Integer} nodeID - Identifier of an NCTL test node.
 */
export const getPathToNodeConfigFile = (netID, nodeID) => {
    return `${getPathToNode(netID, nodeID)}/config/node-config.toml`
};

/**
 * Returns path to a node's keys sub-directory.
 *
 * @param {Integer} netID - Identifier of an NCTL test network.
 * @param {Integer} nodeID - Identifier of an NCTL test node.
 */
export const getPathToNodeKeys = (netID, nodeID) => {
    return `${getPathToNode(netID, nodeID)}/keys`
};

/**
 * Returns path to a node's logs sub-directory.
 *
 * @param {Integer} netID - Identifier of an NCTL test network.
 * @param {Integer} nodeID - Identifier of an NCTL test node.
 */
export const getPathToNodeLogs = (netID, nodeID) => {
    return `${getPathToNode(netID, nodeID)}/logs`
};

/**
 * Returns path to a node's storage sub-directory.
 *
 * @param {Integer} netID - Identifier of an NCTL test network.
 * @param {Integer} nodeID - Identifier of an NCTL test node.
 */
export const getPathToNodeStorage = (netID, nodeID) => {
    return `${getPathToNode(netID, nodeID)}/storage`
};

/**
 * Returns path to a user's root directory.
 *
 * @param {Integer} netID - Identifier of an NCTL test network.
 * @param {Integer} nodeID - Identifier of an NCTL test node.
 */
export const getPathToUser = (netID, userID) => {
    return `${getPathToNet(netID)}/users/user-${userID}`
};
