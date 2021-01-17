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
 * Returns randomness, i.e. entropy, derived from a PRNG.
 * @param {KeyPair} account - Size in bytes of generated entropy.
 * @param {String} actionType - The type of action for which a threshold is to be assigned.
 * @param {Integer} weight - Minimum approval weight required to execute action.
 * @return {String} Dispatched deploy hash.
 */
export default async (account, actionType, weight) => {
    const [client, deploy] = getDeploy(account, actionType, weight);
    
    return await node.dispatchDeploy(client, deploy, [account]);
};

/**
 * Returns native transfer deploy for dispatch to chain.
 */
const getDeploy = (account, actionType, weight) => {
    const client = node.getClient();
    const deploy = client.makeDeploy(
        new DeployUtil.DeployParams(
            account.publicKey,
            constants.getChainID(),
        ),
        new DeployUtil.ModuleBytes(
            io.getContractWasm(CONTRACT_FILENAME),
            new RuntimeArgs([
                new NamedArg("action", CLValue.string(actionType)),
                new NamedArg("weight", CLValue.u8(weight)),
            ]).toBytes()
        ),
        DeployUtil.standardPayment(constants.GAS_PAYMENT)
    );

    return [client, deploy];
};
