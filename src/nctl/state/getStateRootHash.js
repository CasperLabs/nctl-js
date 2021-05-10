import * as node from '../utils/node';


 /**
 * Returns block information from a random NCTL node.
 *
 * @param {null|String|Integer} blockID - A block identifier.
 * @return {Object|null} On-chain block information.
 */
export default async () => {
    const {
        nodeClient: client
    } = node.getClient();     

    const { 
        block: { 
            header: { 
                state_root_hash: stateRootHash 
            } 
        } 
    } = await client.getLatestBlockInfo();

    return stateRootHash;
};
