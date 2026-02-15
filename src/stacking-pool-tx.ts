/**
 * Build stacking-pool contract call transactions using @stacks/transactions.
 * Use with @stacks/connect to let the user sign and broadcast.
 */
import {
  makeContractCall,
  createContractCallPayload,
  Cl,
} from "@stacks/transactions";

const CONTRACT_NAME = "stacking-pool";

export type PoolTxOptions = {
  contractAddress: string;
  amountUstx: bigint;
  network: "mainnet" | "testnet";
};

/** Build an unsigned contract call to deposit STX into the stacking pool. */
export function buildDepositTx(opts: PoolTxOptions & { senderKey: string }) {
  return makeContractCall({
    contractAddress: opts.contractAddress,
    contractName: CONTRACT_NAME,
    functionName: "deposit",
    functionArgs: [Cl.uint(opts.amountUstx)],
    senderKey: opts.senderKey,
    network: opts.network,
  });
}

/** Build payload for deposit (e.g. for use with @stacks/connect wallet). */
export function buildDepositPayload(
  contractAddress: string,
  amountUstx: bigint
) {
  return createContractCallPayload({
    contractAddress,
    contractName: CONTRACT_NAME,
    functionName: "deposit",
    functionArgs: [Cl.uint(amountUstx)],
  });
}

/** Build an unsigned contract call to withdraw STX from the stacking pool. */
export function buildWithdrawTx(opts: PoolTxOptions & { senderKey: string }) {
  return makeContractCall({
    contractAddress: opts.contractAddress,
    contractName: CONTRACT_NAME,
    functionName: "withdraw",
    functionArgs: [Cl.uint(opts.amountUstx)],
    senderKey: opts.senderKey,
    network: opts.network,
  });
}
