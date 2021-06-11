import * as sleep from 'sleep';
import getDeploy from './getDeploy';


/**
 * Blocks calling thread until chain has processed deploy.
 *
 * @param {String} deployHash - Hash of a deploy whose processing is being awaited.
 * @param {Integer} timeoutInSeconds - Time to await prior to returning.
*/
export default async (deployHash, timeoutInSeconds=60) => {
    let elapsedTimeInSeconds=0
    let deploy = await getDeploy(deployHash);
    while (deploy === null && elapsedTimeInSeconds < timeoutInSeconds) {
        sleep.sleep('1');
        elapsedTimeInSeconds += 1;
        console.log(`... ... ${deployHash} :: ${elapsedTimeInSeconds}`);    
        deploy = await getDeploy(deployHash);
    }

    return deploy;
};