import * as sleep from 'sleep';
import getBlock from './getBlock';


export default async (deployHash) => {
    let block = await getBlock();
    while (block.header.height < blockHeight) {
        sleep.sleep('10');
        block = await getBlock();
    }
};