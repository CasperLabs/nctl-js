/**
 * @fileOverview NCTL utility functions.
 */

 /**
 * Returns identifier associated with a test chain.
 *
 * @param {Integer} netID - Identifier of an NCTL test network.
 * @return {String} A chain identifier.
*/
export const getChainID = (netID) => {
    return `casper-net-${netID}`;
}

 /**
 * Returns port associated with a node API endpoint.
 *
 * @param {Integer} netID - Identifier of an NCTL test network.
 * @param {Integer} nodeID - Identifier of an NCTL test node.
 * @param {Integer} basePort - Port ID associated with a particular type of endpoint.
 * @return {Integer} A node port.
*/
export const getNodePort = (netID, nodeID, basePort) => {
    return basePort + (netID * 100) + nodeID;
}

 /**
 * Returns url associated with a node's REST API endpoint.
 *
 * @param {Integer} netID - Identifier of an NCTL test network.
 * @param {Integer} nodeID - Identifier of an NCTL test node.
 * @return {String} A node's REST API endpoint.
*/
export const getNodeURLForREST = (netID, nodeID) => {
    const port = getNodePort(netID, nodeID, 50000); 

    return `http://localhost:${port}/rest`
}

 /**
 * Returns url associated with a node's JSON-RPC API endpoint.
 *
 * @param {Integer} netID - Identifier of an NCTL test network.
 * @param {Integer} nodeID - Identifier of an NCTL test node.
 * @return {String} A node's JSON-RPC API endpoint.
*/
export const getNodeURLForRPC = (netID, nodeID) => {
    const port = getNodePort(netID, nodeID, 40000); 

    return `http://localhost:${port}/rpc`
}

 /**
 * Returns url associated with a node's SSE API endpoint.
 *
 * @param {Integer} netID - Identifier of an NCTL test network.
 * @param {Integer} nodeID - Identifier of an NCTL test node.
 * @return {String} A node's SSE API endpoint.
*/
export const getNodeURLForSSE = (netID, nodeID) => {
    const port = getNodePort(netID, nodeID, 60000); 

    return `http://localhost:${port}/events`
}

// Hexadecimal character set.
const HEX_CHARSET = ["0", "1", "2", "3", "4", "5", "6", "7","8", "9", "A", "B", "C", "D", "E", "F"];


 /**
 * Returns hexadecimal representation of a byte array.
 *
 * @param {Array} b - A byte array.
 * @return {String} A hexadecimal representation of passed array.
*/
export const fromByteToHex = (b) => {
    return HEX_CHARSET[(b >> 4) & 0x0f] + HEX_CHARSET[b & 0x0f];
}