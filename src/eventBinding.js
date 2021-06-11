    // Awaiting blockchain via polling.
    // Latency = 1-2 seconds.
    await nctl.awaitBlock(450);
    await nctl.awaitBlockOffset(4);
    await nctl.awaitEra(45);
    await nctl.awaitEraOffset(3);
    await nctl.awaitDeploy("b07ce6614e0dc221f013310399f03d1602cc8c9a31b6edc2f984113c81f1c825", 300);

    // Awaiting blockchain via event binding.
    // Latency = 0.1 seconds.
    await nctl.bindToEvent("BlockAdded", [
        updateDatabase,
    ], onTimeout);

    await nctl.bindToEvent("DeployProcessed", deployHashes, [
        updateDatabase,
        notifyUser
    ], onDeployTimeout);
