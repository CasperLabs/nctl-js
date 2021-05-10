import * as sleep from 'sleep';
import getBlock from './getBlock';


/**
 * Blocks calling thread until chain has progressed to requested era.
 *
 * @param {Integer} eraID - Era height to await.
*/
export default async (eraID) => {
    let block = await getBlock();
    while (block.header.era_id < eraID) {
        sleep.sleep('2');
        block = await getBlock();
    }
};
