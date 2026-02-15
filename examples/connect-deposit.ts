/**
 * Example: use @stacks/connect with deposit payload from @stacks/transactions.
 */
import { connect } from "@stacks/connect";
import { buildDepositPayload } from "../src/stacking-pool-tx.js";
import { parseStxAmount } from "../src/parse-amount.js";
import { getConnectOptions } from "../src/connect-options.js";

async function run() {
  const opts = getConnectOptions(
    process.env.STACKING_POOL_CONTRACT_ADDRESS || "",
    "testnet"
  );
  const amount = parseStxAmount(process.env.DEPOSIT_AMOUNT || "1");
  const payload = buildDepositPayload(opts.contractAddress, amount);
  const result = await connect({ ...opts.appDetails, network: opts.network, onFinish: (p) => p });
  return { payload, result };
}
