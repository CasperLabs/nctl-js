import * as node from '../utils/node';


/**
 * Returns block information from a random NCTL node.
 *
 * @param {null|String|Integer} blockID - A block identifier.
 * @return {Object|null} On-chain block information.
*/
export default async (blockID) => {
    let apiResponse = null;

    const {
        nodeClient: client
    } = node.getClient();

    try {
        if (blockID === undefined || blockID === null) {
            apiResponse = await client.getLatestBlockInfo();
        } else if (Number.isInteger(blockID)) {
            apiResponse = await client.getBlockInfoByHeight(blockID);
        } else {
            apiResponse = await client.getBlockInfo(blockID);
        } 
        return apiResponse.block;       
    } catch (error) {
        return null;
    }
};
