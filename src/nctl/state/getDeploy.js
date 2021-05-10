import * as node from '../utils/node';


 /**
  * Returns deploy information from a random NCTL node.
  *
  * @param {String} deployID - A deploy identifier, i.e. a deploy hash.
  * @return {Object|null} On-chain deploy information.
 */
 export default async (deployID) => {
     const {
         nodeClient: client
     } = node.getClient();
 
     try {
        const apiResponse = await client.getDeployInfo(deployID);
        console.log(apiResponse);
    } catch (error) {
         return null;
     }
 
     return apiResponse.deploy;
 };
 