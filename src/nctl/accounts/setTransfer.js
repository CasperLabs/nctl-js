const {
    DeployUtil,
} = require('casper-client-sdk');

import * as constants from '../constants';
import * as utils from '../utils';


/**
 * Dispatches a native transfer deploy.
 * @param {KeyPair} cp1 - Key pair of counter-party 1.
 * @param {KeyPair} cp2 - Key pair of counter-party 2.
 * @param {Integer} amount - Amount to be transferred between accounts.
 * @param {Array} approvalKeys - Set of keys for deploy approval.
 * @return {String} Dispatched deploy hash.
 */
export default async (cp1, cp2, amount, approvalKeys = null) => {
    const [client, deploy] = getDeploy(cp1, cp2, amount);

    return await utils.dispatchDeploy(client, deploy, approvalKeys || [cp1]);
};

/**
 * Returns native transfer deploy for dispatch to chain.
 */
const getDeploy = (cp1, cp2, amount) => {
    const client = utils.getClient();
    const deploy = client.makeTransferDeploy(
        new DeployUtil.DeployParams(
            cp1.publicKey,
            utils.getChainID(),
            ),
        new DeployUtil.Transfer(
            amount,
            cp2.publicKey
            ),
        DeployUtil.standardPayment(constants.GAS_PAYMENT)
    );

    return [client, deploy];
};
