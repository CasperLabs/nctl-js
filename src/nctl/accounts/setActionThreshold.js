import * as fs from 'fs';

const {
    NamedArg,
    RuntimeArgs,
    CLValue,
    DeployUtil,
} = require('casper-client-sdk');

import * as constants from '../utils/constants';
import * as io from '../utils/io';
import * as node from '../utils/node';


// File name of relevant smart contract.
const CONTRACT_FILENAME = "keys-manager.wasm";


/**
 * Updates the weight of a set of approval keys associated with an on-chain account.
 * @param {KeyPair} account - An account with which a key association is being 
 * @param {Integer} weight - The associated key's approval weight.
 * @param {Array} approvalKeys - Set of keys for deploy approval.
 * @return {String} Dispatched deploy hash.
 */
export default async (account, actionType, weight) => {
    const { client, deploy } = getDeploy(account, actionType, weight);
    
    return await node.dispatchDeploy(client, deploy, [account]);
};

/**
 * Returns native transfer deploy for dispatch to chain.
 */
const getDeploy = (account, actionType, weight) => {
    // Dispatch node client.
    const client = node.getClient();

    // Construct deploy:
    const deploy = client.makeDeploy(
        // ... header;
        new DeployUtil.DeployParams(
            account.publicKey,
            constants.getChainID(),
        ),
        // ... session;
        DeployUtil.ExecutableDeployItem.newModuleBytes(
            io.getContractWasm(CONTRACT_FILENAME),
            RuntimeArgs.fromNamedArgs([
                new NamedArg("action", CLValue.string(actionType)),
                new NamedArg("weight", CLValue.u8(weight)),
            ])
        ),
        // ... payment;
        DeployUtil.standardPayment(constants.GAS_PAYMENT)
    );

    return { client, deploy };
};
