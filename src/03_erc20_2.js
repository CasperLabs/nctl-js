 /**
 * @fileOverview CSPR JS SDK demo: ERC20 02 - display on-chain contract details.
 */

import * as nctl from './nctl/index';


// Demonstration entry point.
const main = async (client) => {
    const ownerKeyPair = nctl.crypto.getKeyPairOfFaucet();
    const contractHash = await nctl.accounts.getNamedKey(ownerKeyPair, "ERC20");
    console.log({
        decimals: await nctl.state.getStoredValue(contractHash, "_decimals"),
        name: await nctl.state.getStoredValue(contractHash, "_name"),
        symbol: await nctl.state.getStoredValue(contractHash, "_symbol"),
        totalSupply: await nctl.state.getStoredValue(contractHash, "_totalSupply")
    });
};

main(nctl.node.getClient());
