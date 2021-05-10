import * as node from '../utils/node';


 /**
  * Returns deploy information from a random NCTL node.
  *
  * @param {String} deployHash - A deploy identifier, i.e. a deploy hash.
  * @return {Object|null} On-chain deploy information.
 */
export default async (deployHash) => {
    let deploy = null;

    const {
        nodeClient: client
    } = node.getClient();

    try {
        let { deploy: deploy } = await client.getDeployInfo(deployHash);
    } catch (error) {
        return null;
    }

    return deploy;
};
 