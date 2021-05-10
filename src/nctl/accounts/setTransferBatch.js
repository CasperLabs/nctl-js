const {
    DeployUtil,
} = require('casper-client-sdk');

import * as constants from '../utils/constants';
import * as misc from '../utils/misc';
import * as node from '../utils/node';
import setTransfer from './setTransfer';

/**
 * Dispatches a native transfer deploy.
 * @param {KeyPair} cp1 - Key pair of counter-party 1.
 * @param {Array} cp2Set - Set of key pairs of counter-party 2.
 * @param {Integer} amount - Amount to be transferred between accounts.
 * @param {Array} approvalKeys - Set of keys for deploy approval.
 * @return {String} Dispatched deploy hash.
 */
export default async (cp1, cp2Set, amount, approvalKeys = null) => {
    return await Promise.all(cp2Set.map(async (cp2) => {
        return await setTransfer(
            cp1,
            cp2,
            amount,
            approvalKeys
            );
    }));
};
