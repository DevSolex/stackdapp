/**
 * Types for stacking-pool client using @stacks/connect and @stacks/transactions.
 */
export type Network = "mainnet" | "testnet";

export type PoolConfig = {
  contractAddress: string;
  network: Network;
};

export type DepositOptions = PoolConfig & { amountUstx: bigint };
export type WithdrawOptions = PoolConfig & { amountUstx: bigint };
