import * as node from '../utils/node';


/**
 * Returns block information from a random NCTL node.
 *
 * @param {null|String|Integer} blockID - A block identifier.
 * @return {Object|null} On-chain block information.
*/
export default async (blockID) => {
    const {
        nodeClient: client
    } = node.getClient();

    try {
        if (blockID === undefined || blockID === null) {
            const apiResponse = await client.getLatestBlockInfo();
        } else if (Number.isInteger(blockID)) {
            const apiResponse = await client.getBlockInfoByHeight(blockID);
        } else {
            const apiResponse = await client.getBlockInfo(blockID);
        }        
    } catch (error) {
        return null;
    }

    return apiResponse.block;
};
