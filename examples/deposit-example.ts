/**
 * Example: build deposit tx with @stacks/transactions for @stacks/connect.
 */
import { buildDepositPayload } from "../src/stacking-pool-tx.js";
import { parseStxAmount } from "../src/parse-amount.js";

const contractAddress = process.env.STACKING_POOL_CONTRACT_ADDRESS || "";
const amount = parseStxAmount(process.env.DEPOSIT_AMOUNT || "1");

if (contractAddress) {
  const payload = buildDepositPayload(contractAddress, amount);
  console.log("Deposit payload:", payload);
}
