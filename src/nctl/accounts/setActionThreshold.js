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
 * @param {Integer} weight - The associated key's approval weight.
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
            utils.getChainID(),
        ),
        new DeployUtil.ModuleBytes(
            io.getContractWasm(CONTRACT_FILENAME),
            new RuntimeArgs([
                new NamedArg("action", CLValue.fromString(actionType)),
                new NamedArg("weight", CLValue.fromU8(weight)),
            ]).toBytes()
        ),
        DeployUtil.standardPayment(constants.GAS_PAYMENT)
    );

    return [client, deploy];
};
