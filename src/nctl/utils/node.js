/**
 * @fileOverview NCTL utility functions.
 */

import { 
    CasperClient,
} from 'casper-client-sdk';
import * as constants from './constants';


/**
 * Returns identifier associated with a test chain.
 *
 * @return {String} A chain identifier.
*/
export const dispatchDeploy = async (client, deploy, approvals) => {
    deploy = approvals.reduce(client.signDeploy, deploy);

    return await client.putDeploy(deploy);
};

/**
 * Returns a configured CasperClient instance.
 *
 * @param {Integer} nodeID - Identifier of dispatch node.
 * @return {CasperClient} A configured casper client ready for use.
*/
export const getClient = (nodeID = constants.NODE_ID) => {
    const nodeURL = getNodeURLForRPC(constants.NET_ID, nodeID);

    return new CasperClient(nodeURL);
};

/**
 * Returns a configured CasperServiceByJsonRPC instance.
 *
 * @param {Integer} nodeID - Identifier of dispatch node.
 * @return {CasperServiceByJsonRPC} A configured casper json RPC client ready for use.
*/
export const getClientJsonRPC = (nodeID = constants.NODE_ID) => {
    const nodeURL = getNodeURLForRPC(constants.NET_ID, nodeID);

    return new CasperServiceByJsonRPC(nodeURL);
};

 /**
 * Returns port associated with a node API endpoint.
 *
 * @param {Integer} nodeID - Identifier of an NCTL test node.
 * @param {Integer} basePort - Port ID associated with a particular type of endpoint.
 * @return {Integer} A node port.
*/
export const getNodePort = (nodeID, basePort) => {
    return basePort + (constants.NET_ID * 100) + (nodeID);
};

 /**
 * Returns url associated with a node's REST API endpoint.
 *
 * @param {Integer} nodeID - Identifier of an NCTL test node.
 * @return {String} A node's REST API endpoint.
*/
export const getNodeURLForREST = (nodeID = constants.NODE_ID) => {
    const port = getNodePort(nodeID, 50000); 

    return `http://localhost:${port}/rest`
};

 /**
 * Returns url associated with a node's JSON-RPC API endpoint.
 *
 * @param {Integer} nodeID - Identifier of an NCTL test node.
 * @return {String} A node's JSON-RPC API endpoint.
*/
export const getNodeURLForRPC = (nodeID = constants.NODE_ID) => {
    const port = getNodePort(nodeID, 40000); 

    return `http://localhost:${port}/rpc`
};

 /**
 * Returns url associated with a node's SSE API endpoint.
 *
 * @param {Integer} nodeID - Identifier of an NCTL test node.
 * @return {String} A node's SSE API endpoint.
*/
export const getNodeURLForSSE = (nodeID = constants.NODE_ID) => {
    const port = getNodePort(nodeID, 60000); 

    return `http://localhost:${port}/events`
};
