/**
 * @fileOverview NCTL conversion utility functions.
 */

// Hexadecimal character set.
const HEX_CHARSET = ["0", "1", "2", "3", "4", "5", "6", "7","8", "9", "A", "B", "C", "D", "E", "F"];


 /**
 * Returns hexadecimal representation of a byte array.
 *
 * @param {Array} b - A byte array.
 * @return {String} A hexadecimal representation of passed array.
*/
export const fromByteToHex = (b) => {
    return HEX_CHARSET[(b >> 4) & 0x0f] + HEX_CHARSET[b & 0x0f];
};
