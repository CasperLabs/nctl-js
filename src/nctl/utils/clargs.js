/**
 * @fileOverview CL args utility functions.
 */

 /**
 * Returns a CL arg: account hash.
 *
 * @param {PublicKey} publicKey - Public key associated with an account.
 * @return {String} A chain identifier.
*/
export const getAccountHash = (keyPair) => {
    return `account-hash-${Buffer.from(keyPair.accountHash()).toString('hex')}`;
};
