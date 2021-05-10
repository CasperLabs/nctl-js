/**
 * @fileOverview NCTL on-chain account details query.
 */

import * as clargs from '../utils/clargs';
import * as node from '../utils/node';
import * as state from '../state';


/**
 * Returns on-chain account details.
 *
 * @param {KeyPair} keyPair - ECC key pair associated with an on-chain account.
 * @return {Object} On-chain account information.
 */
export default async (keyPair) => {
    const accountHash = clargs.getAccountHash(keyPair);
    const stateRootHash = await state.getStateRootHash();
    const client = node.getClient();

    const {
        Account: account
    } = await client.nodeClient.getBlockState(stateRootHash, accountHash, []);

    return account;
};
