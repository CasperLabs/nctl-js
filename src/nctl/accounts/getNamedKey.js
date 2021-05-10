import getAccountDetails from './getDetails';


/**
 * Returns a named key associated with on-chain account .
 *
 * @param {KeyPair} keyPair - ECC key pair associated with an on-chain account.
 * @param {String} namedKeyID - Identifier of associated named key.
 * @return {String} The named key.
*/
export default async (keyPair, namedKeyID) => {
    let { named_keys } = await getAccountDetails(keyPair);    
    named_keys = named_keys.filter(i => i.name == namedKeyID);

    return named_keys.length > 0 ? named_keys[0].key : undefined;
};
