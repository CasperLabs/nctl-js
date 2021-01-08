import * as nctl from './nctl/index';


// Key manager smart contract file name.
const CONTRACT_FILENAME="keys-manager.wasm"

// Key manager smart contract file path.
const CONTRACT_FILEPATH = nctl.io.getPathToBinary(CONTRACT_FILENAME);

// Set faucet key.
const faucet = nctl.crypto.getKeyPairOfFaucet();

// Set user keys.
const user_1 = nctl.crypto.getKeyPairOfUser(1);
const user_2 = nctl.crypto.getKeyPairOfUser(2);
const user_3 = nctl.crypto.getKeyPairOfUser(3);
const user_4 = nctl.crypto.getKeyPairOfUser(4);

// Demonstration entry point.
// We will associate 2  additional accounts to the faucet account.  We will
// grant those accounts permissions to perform transfers.  However they will not
// be able to add other accounts - this remains available only to the faucet account. 
const main = async () => {
    
    // 1. Set default associated key weight -> 3.
    await nctl.chain.accounts.setAssociatedKeyWeight(faucet, 3);

    // 2. Set action thresholds.
    await nctl.chain.accounts.setActionThreshold(faucet, "key-management", 3);
    await nctl.chain.accounts.setActionThreshold(faucet, "dispatch-deploy", 2);

    // 3. Set 2 associated keys - each key has a weight -> 1.
    await nctl.chain.accounts.setAssociatedKey(faucet, user_1, 1);
    await nctl.chain.accounts.setAssociatedKey(faucet, user_2, 1);

    // 4. Dispatch a trasfer from the faucet - signed using faucet default key.
    await nctl.chain.accounts.transfer(faucet, user_3, 100000000, signer=faucet)

    // 5. Dispatch a trasfer from the faucet - signed using associated keys.
    await nctl.chain.accounts.transfer(faucet, user_4, 100000000, signer=[user_1, user_2])

    // 5. Remove 2 associated keys.
    await nctl.chain.accounts.deleteAssociatedKey(faucet, user_1);
    await nctl.chain.accounts.deleteAssociatedKey(faucet, user_2);

    // 6. Dispatch a transfer from faucet - signed using faucet default key.
    await nctl.chain.accounts.transfer(faucet, user_3, 100000000, signer=faucet)

    // 7. Dispatch a transfer from faucet - signed using associated keys.
    await nctl.chain.accounts.transfer(faucet, user_4, 100000000, signer=[user_1, user_2])
};
