/**
 * Constants for stacking-pool; used with @stacks/transactions and @stacks/connect.
 */
export const STACKING_POOL_CONTRACT_NAME = "stacking-pool";

export const BASIS_POINTS_MAX = 10_000n;

/** 1 STX = 1e6 uSTX */
export const STX_DECIMALS = 6;
export const ONE_STX = 10n ** BigInt(STX_DECIMALS);
