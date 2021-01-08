/**
 * @fileOverview NCTL chain interaction functions.
 */

import * as JSBI from 'jsbi';

import { 
    CasperClient,
    CasperServiceByJsonRPC,
    Keys,
    DeployUtil
} from 'casper-client-sdk';
import * as constants from './constants';
import * as crypto from './crypto';
import * as utils from './utils';


/**
 * Returns a configured CasperClient instance.
 *
 * @return {CasperClient} A configured casper client ready for use.
*/
export const getClient = (nodeID = constants.NODE_ID) => {
    const nodeURL = utils.getNodeURLForRPC(constants.NET_ID, nodeID);

    return new CasperClient(nodeURL, null);
};

/**
 * Returns a configured CasperServiceByJsonRPC instance.
 *
 * @return {CasperServiceByJsonRPC} A configured casper json RPC client ready for use.
*/
export const getClientJsonRPC = (nodeID = constants.NODE_ID) => {
    const nodeURL = utils.getNodeURLForRPC(constants.NET_ID, nodeID);

    return new CasperServiceByJsonRPC(nodeURL);
};

/**
 * Returns account balance of a network faucet account.
 *
 * @return {Keys.KeyPair} An on-chain account key.
*/
export const getAccount = async (keyPair) => {
    // Set client.
    const client = getClientJsonRPC();

    // Set state root hash.
    const stateRootHash = (await client.getLatestBlockInfo()).block.header.state_root_hash;

    // Set account.
    const account = await client.getBlockState(
        stateRootHash,
        'account-hash-' + toAccountHashString(publicKey),
        []
    ).then(res => res.stored_value.Account);

    return account;
}

/**
 * Returns account balance of a network faucet account.
 *
 * @return {KeyPair} An on-chain account key.
*/
export const getAccountBalance = async (keyPair) => {
    // Set client.
    const client = getClient();

    // Dispatch chain query.
    let balance = await client.balanceOfByPublicKey(keyPair.publicKey);

    // Return balance formatted as BigInt
    return JSBI.BigInt(balance || 0);
};

/**
 * Returns account balance of a network faucet account.
 *
 * @return {BigInteger} Balance of a network faucet account.
*/
export const getAccountBalanceOfFaucet = async () => {
    // Set key pair associated with account.
    const keyPair = crypto.getKeyPairOfFaucet();

    // Query chain & return balance.
    return await getAccountBalance(keyPair);
};

/**
 * Returns account balance of a network node account.
 *
 * @param {Integer} nodeID - Identifier of an NCTL test node.
 * @return {BigInteger} Balance of a network user account.
*/
export const getAccountBalanceOfNode = async (nodeID) => {
    // Set key pair associated with account.
    const keyPair = crypto.getKeyPairOfNode(nodeID);

    // Query chain & return balance.
    return await getAccountBalance(keyPair);
};

/**
 * Returns account balance of a network user account.
 *
 * @param {Integer} userID - Identifier of an NCTL test user.
 * @return {BigInteger} Balance of a network user account.
*/
export const getAccountBalanceOfUser = async (userID) => {
    // Set key pair associated with account.
    const keyPair = crypto.getKeyPairOfUser(userID);

    // Query chain & return balance.
    return await getAccountBalance(keyPair);
};

/**
 * Returns account balance of a network user account.
 *
 * @return {Array} Array of user balances.
*/
export const getAccountBalanceOfUserSet = async () => {
    return Promise.all(
        constants.USER_ID_SET.map(getAccountBalanceOfUser)
        )
};

/**
 * Dispatches an on-chain account transfer to a test node.
 *
 * @param {Integer} payment - Payment in motes to be attached to deploy.
 * @return {Object} transferInfo - Tuple of client, deeploy hash & deploy.
*/
export const doTransfer = async (fromKeyPair, toKeyPair, amount=1000000000, payment=100000000000) => {
    // Set client.
    const client = getClient();

    // Set deploy parameters.
    const params = {
        deploy: new DeployUtil.DeployParams(
            fromKeyPair.publicKey,
            utils.getChainID()
            ),
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