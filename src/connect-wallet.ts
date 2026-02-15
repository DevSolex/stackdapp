/**
 * Use @stacks/connect for wallet connection and sending stacking-pool transactions.
 * In the browser, use connect() then request('stx_callContract', ...) with payloads
 * built from stacking-pool-tx.ts (@stacks/transactions).
 */
import { connect } from "@stacks/connect";
import { buildDepositPayload } from "./stacking-pool-tx.js";

export type ConnectOptions = {
  appDetails: { name: string; icon?: string };
  contractAddress: string;
  network: "mainnet" | "testnet";
};

/**
 * Example: connect wallet and request a deposit contract call.
 * Call this from a click handler in your app.
 */
export async function requestDeposit(
  opts: ConnectOptions & { amountUstx: bigint }
) {
  const payload = buildDepositPayload(opts.contractAddress, opts.amountUstx);
  const result = await connect({
    ...opts.appDetails,
    network: opts.network,
    onFinish: (p) => p,
  });
  return result;
}

export { connect };
