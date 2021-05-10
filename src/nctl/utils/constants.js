// Hexadecimal character set.
export const HEX_CHARSET = ["0", "1", "2", "3", "4", "5", "6", "7","8", "9", "A", "B", "C", "D", "E", "F"];

// Default seed used when interacting with a deterministic wallet.
export const HD_WALLET_SEED = new Uint8Array([21,31]);

// Default gas payment (motes).
export const GAS_PAYMENT = 1e10;

// Default gas payment (motes).
export const GAS_PAYMENT_FOR_CONTRACT_INSTALLATION = 7e10;

// Default NCTL net identifier.
export const NET_ID = 1;

// Default NCTL node identifier.
export const NODE_ID = 1;

// Default amount transferred between counter-parties .
export const TRANSFER_AMOUNT = 2500000000;

// Default NCTL user identifiers.
export const USER_ID_SET = [...Array(5).keys()].map(i => i + 1);

/**
 * Returns identifier associated with a test chain.
 *
 * @return {String} A chain identifier.
*/
export const getChainID = () => {
    return `casper-net-${NET_ID}`;
};
