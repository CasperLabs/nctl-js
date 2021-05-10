import * as sleep from 'sleep';

import * as node from '../utils/node';
import getBlock from './getBlock';


/**
 * Blocks calling thread until chain has progressed by N blocks.
 *
 * @param {Integer} offset - Number of blocks to await.
 * @return {Object|null} On-chain block information.
*/
export default async (offset = 2) => {
    let block = await getBlock();
    const future = block.header.height + offset;    
    while (block.header.height < future) {
        sleep.sleep('2');
        block = await getBlock();
    }
};
 