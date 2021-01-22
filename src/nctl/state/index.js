/**
 * @fileOverview NCTL chain state functions.
 */

import * as node from '../utils/node';

/**
 * Returns current state root hash at a random node.
 *
 * @return {String} A state root hash.
*/
export const getRootHash = async () => {
    const client = node.getClient();
    const { 
        block: { 
            header: { 
                state_root_hash: stateRootHash 
            } 
        } 
    } = await client.nodeClient.getLatestBlockInfo();

    return stateRootHash;
}; 

/**
 * Returns a value stored under a global state key.
 *
 * @return {String} JSON representation of decoded CLValue.
*/
export const getStoredValue = async (key, path) => {
    const client = node.getClient();
    const stateRootHash = await getRootHash();
    const {
        stored_value: {
            CLValue: {
                parsed_to_json: storedValue
            }
        }
    } = await client.nodeClient.getBlockState(stateRootHash, key, [path]);

    return storedValue;
};
