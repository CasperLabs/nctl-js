import * as sleep from 'sleep';
import getBlock from './getBlock';


/**
 * Blocks calling thread until chain has progressed to requested height.
 *
 * @param {Integer} blockHeight - Block height to await.
*/
export default async (blockHeight) => {
    let block = await getBlock();
    while (block.header.height < blockHeight) {
        sleep.sleep('10');
        block = await getBlock();
    }
};
