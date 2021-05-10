import * as sleep from 'sleep';
import getBlock from './getBlock';


/**
 * Blocks calling thread until chain has progressed by N eras.
 *
 * @param {Integer} offset - Number of eras to await.
*/
export default async (offset = 2) => {
    let block = await getBlock();
    offset += block.header.era_id;    
    while (block.header.era_id < offset) {
        sleep.sleep('2');
        block = await getBlock();
    }
};
