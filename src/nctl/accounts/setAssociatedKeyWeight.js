import * as fs from 'fs';
const {
    NamedArg,
    RuntimeArgs,
    CLValue,
    DeployUtil,
} = require('casper-client-sdk');

import * as constants from '../constants';
import * as io from '../io';
import * as utils from '../utils';

const CONTRACT_FILENAME = "keys-manager.wasm";


/**
 * Returns randomness, i.e. entropy, derived from a PRNG.
 * @param {KeyPair} account - Size in bytes of generated entropy.
 * @param {Integer} weight - The associated key's approval weight.
 * @param {Array} approvalKeys - Set of keys for deploy approval.
 * @return {String} Dispatched deploy hash.
 */
export default async (account1, account2, weight) => {
    const [client, deploy] = getDeploy(account1, account2, weight);

    return await utils.dispatchDeploy(client, deploy, [account1]);
};

/**
 * Returns native transfer deploy for dispatch to chain.
 */
const getDeploy = (account1, account2, weight) => {
    const client = utils.getClient();
    const deploy = client.makeDeploy(
        new DeployUtil.DeployParams(
            account1.publicKey,
            utils.getChainID(),
        ),
        new DeployUtil.ModuleBytes(
            io.getContractWasm(CONTRACT_FILENAME),
            new RuntimeArgs([
                new NamedArg("action", CLValue.fromString("set_key_weight")),
                new NamedArg("account", CLValue.fromBytes(account2.accountHash())),
                new NamedArg("weight", CLValue.fromU8(weight)),
            ]).toBytes()
        ),
        DeployUtil.standardPayment(constants.GAS_PAYMENT)
    );

    return [client, deploy];
};

