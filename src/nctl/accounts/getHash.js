/**
 * Returns an account hash.
 *
 * @param {KeyPair} keyPair - ECC key pair associated with an on-chain account.
 * @return {String} Hexadecimal representation of an on-chain account hash.
*/
export default async (keyPair) => {
    return Buffer.from(keyPair.accountHash()).toString('hex');
};
