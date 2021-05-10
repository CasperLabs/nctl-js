import * as sleep from 'sleep';
import * as node from '../utils/node';
import getBlock from './getBlock';


/**
 * Blocks calling thread until chain has progressed by N blocks.
 *
 * @param {Integer} offset - Number of blocks to await.
*/
export default async (offset = 2) => {
    let block = await getBlock();
    offset += block.header.height;    
    while (block.header.height < offset) {
        sleep.sleep('2');
        block = await getBlock();
    }
};
 