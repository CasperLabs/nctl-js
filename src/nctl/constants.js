// Default seed used when interacting with a deterministic wallet.
export const HD_WALLET_SEED = new Uint8Array([21,31]);

// Default gas payment (motes).
export const GAS_PAYMENT = 1e10;

// Default NCTL net identifier.
export const NET_ID = 1;

// Default NCTL node identifier.
export const NODE_ID = 1;

// Default amount transferred between counter-parties .
export const TRANSFER_AMOUNT = 1e9;

// Default NCTL user identifiers.
export const USER_ID_SET = [...Array(5).keys()].map(i => i + 1);

