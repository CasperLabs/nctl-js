import * as node from '../utils/node';
import getStateRootHash from './getStateRootHash';


/**
 * Returns a value stored under a global state key.
 *
 * @return {String} JSON representation of decoded CLValue.
*/
 export default async (key, path, stateRootHash) => {
    stateRootHash = stateRootHash || await getStateRootHash();
    const {
        nodeClient: client
    } = node.getClient();
    const {
        stored_value: {
            CLValue: {
                parsed_to_json: keyValue
            }
        }
    } = await client.getBlockState(stateRootHash, key, [path]);

    return keyValue;
 };
