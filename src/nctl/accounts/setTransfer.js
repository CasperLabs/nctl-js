const {
    DeployUtil,
} = require('casper-client-sdk');

import * as constants from '../utils/constants';
import * as misc from '../utils/misc';
import * as node from '../utils/node';


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
    approvalKeys = approvalKeys || [cp1];

    return await node.dispatchDeploy(client, deploy, approvalKeys);
};

/**
 * Returns native transfer deploy for dispatch to chain.
 */
const getDeploy = (cp1, cp2, amount) => {
    const client = node.getClient();
    const deploy = client.makeTransferDeploy(
        new DeployUtil.DeployParams(
            cp1.publicKey,
            constants.getChainID()
            ),
        DeployUtil.ExecutableDeployItem.newTransfer(
            amount,
            cp2.publicKey,
            null,
            misc.getRandomInteger(0, Number.MAX_SAFE_INTEGER)
            ),
        DeployUtil.standardPayment(constants.GAS_PAYMENT)
    );

    return [client, deploy];
};
