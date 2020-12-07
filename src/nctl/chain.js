/**
 * @fileOverview NCTL chain interaction functions.
 */

import { 
    CasperClient,
    Keys,
    DeployUtil
} from 'casper-client-sdk';
import * as crypto from './crypto';
import * as utils from './utils';



/**
 * Returns a configured CasperClient instance.
 *
 * @param {Integer} netID - Identifier of an NCTL test network.
 * @param {Integer} nodeID - Identifier of an NCTL test node.
 * @return {CasperClient} A configured casper client ready for use.
*/
export const getClient = (netID, nodeID=1) => {
    const nodeURL = utils.getNodeURLForRPC(netID, nodeID);

    return new CasperClient(nodeURL, null);
};

/**
 * Returns account balance of a network faucet account.
 *
 * @param {Integer} netID - Identifier of an NCTL test network.
 * @param {Integer} nodeID - Identifier of an NCTL test node.
 * @return {BigInteger} Balance of a network faucet account.
*/
export const getAccountBalance = async (netID, nodeID, keyPair) => {
    // Set client.
    const client = getClient(netID, nodeID);

    // Dispatch chain query.
    return await client.balanceOfByPublicKey(keyPair.publicKey);
};

/**
 * Returns account balance of a network faucet account.
 *
 * @param {Integer} netID - Identifier of an NCTL test network.
 * @param {Integer} nodeID - Identifier of an NCTL test node.
 * @return {BigInteger} Balance of a network faucet account.
*/
export const getAccountBalanceOfFaucet = async (netID, nodeID) => {
    // Set key pair associated with account.
    const keyPair = crypto.getKeyPairOfFaucet(netID);

    // Query chain & return balance.
    return await getAccountBalance(netID, nodeID, keyPair);
};

/**
 * Returns account balance of a network node account.
 *
 * @param {Integer} netID - Identifier of an NCTL test network.
 * @param {Integer} nodeID - Identifier of an NCTL test node.
 * @return {BigInteger} Balance of a network user account.
*/
export const getAccountBalanceOfNode = async (netID, nodeID) => {
    // Set key pair associated with account.
    const keyPair = crypto.getKeyPairOfNode(netID, nodeID);

    // Query chain & return balance.
    return await getAccountBalance(netID, nodeID, keyPair);
};

/**
 * Returns account balance of a network user account.
 *
 * @param {Integer} netID - Identifier of an NCTL test network.
 * @param {Integer} nodeID - Identifier of an NCTL test node.
 * @param {Integer} userID - Identifier of an NCTL test user.
 * @return {BigInteger} Balance of a network user account.
*/
export const getAccountBalanceOfUser = async (netID, nodeID, userID) => {
    // Set key pair associated with account.
    const keyPair = crypto.getKeyPairOfUser(netID, userID);

    // Query chain & return balance.
    return await getAccountBalance(netID, nodeID, keyPair);
};

/**
 * Dispatches an on-chain account transfer to a test node.
 *
 * @param {Integer} netID - Identifier of an NCTL test network.
 * @param {Integer} nodeID - Identifier of an NCTL test node.
 * @param {Integer} payment - Payment in motes to be attached to deploy.
 * @return {Object} transferInfo - Tuple of client, deeploy hash & deploy.
*/
export const doTransfer = async (fromKeyPair, toKeyPair, amount=1000000000, netID=1, nodeID=1, payment=100000000000) => {
    // Set client.
    const client = getClient(netID, nodeID);

    // Set deploy parameters.
    const params = {
        deploy: new DeployUtil.DeployParams(fromKeyPair.publicKey, utils.getChainID(netID)),
        transfer: new DeployUtil.Transfer(amount, toKeyPair.publicKey, null, 1),
        payment: DeployUtil.standardPayment(payment)
    }

    // Set deploy - unsigned.
    const deployUnsigned = client.makeTransferDeploy(params.deploy, params.transfer, params.payment);

    // Set deploy - signed.
    const deploy = client.signDeploy(deployUnsigned, fromKeyPair); 

    // Set deploy hash (result of dispatch to chain).
    const deployHash = await client.putDeploy(deploy);

    return {client, deployHash, deploy};
}