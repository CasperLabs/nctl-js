/**
 * @fileOverview NCTL integration wrapper.
 */

import * as constants from './utils/constants';
import * as contracts from './contracts';
import * as io from './utils/io';
import * as node from './utils/node';
import * as state from './state';
import * as utils from './utils';

import {
    getAccountBalance,
    getAccountBalanceOfFaucet,
    getAccountBalanceOfNode,
    getAccountBalanceOfUser,
    getAccountBalanceOfUserSet,
    getAccountDetails,
    getAccountHash,
    getAccountNamedKey,
    setAccountActionThreshold,
    setAccountAssociatedKeyWeight,
    setAccountTransfer,
    setAccountTransferBatch
} from './accounts';

import {
    getBlock,
    getDeploy,
    getStateKeyValue,
    getStateRootHash
} from './state';


import {
    getKeyPairOfFaucet,
    getKeyPairOfNode,
    getKeyPairOfUser,
    getKeyPairOfUserSet
} from './utils/crypto';

export {
    constants,
    contracts,
    io,
    node,
    state,
    utils,

    // accounts;
    getAccountBalance,
    getAccountBalanceOfFaucet,
    getAccountBalanceOfNode,
    getAccountBalanceOfUser,
    getAccountBalanceOfUserSet,
    getAccountDetails,
    getAccountHash,
    getAccountNamedKey,
    setAccountActionThreshold,
    setAccountAssociatedKeyWeight,
    setAccountTransfer,
    setAccountTransferBatch,

    // on-chain state;
    getBlock,
    getDeploy,
    getStateKeyValue,
    getStateRootHash,

    // crypto;
    getKeyPairOfFaucet,
    getKeyPairOfNode,
    getKeyPairOfUser,
    getKeyPairOfUserSet,
}
