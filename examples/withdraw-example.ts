/**
 * Example: build withdraw payload with @stacks/transactions for @stacks/connect.
 */
import { buildWithdrawPayload } from "../src/withdraw-payload.js";
import { parseStxAmount } from "../src/parse-amount.js";

const contractAddress = process.env.STACKING_POOL_CONTRACT_ADDRESS || "";
const amount = parseStxAmount(process.env.WITHDRAW_AMOUNT || "0.5");

if (contractAddress) {
  const payload = buildWithdrawPayload(contractAddress, amount);
  console.log("Withdraw payload:", payload);
}
