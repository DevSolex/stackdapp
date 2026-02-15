/**
 * Withdraw payload builder using @stacks/transactions for @stacks/connect.
 */
import { createContractCallPayload, Cl } from "@stacks/transactions";
import { STACKING_POOL_CONTRACT_NAME } from "./constants.js";

export function buildWithdrawPayload(
  contractAddress: string,
  amountUstx: bigint
) {
  return createContractCallPayload({
    contractAddress,
    contractName: STACKING_POOL_CONTRACT_NAME,
    functionName: "withdraw",
    functionArgs: [Cl.uint(amountUstx)],
  });
}
