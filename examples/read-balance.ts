/**
 * Example: read balance (use with @stacks/transactions or API).
 * For contract read-only calls, use the same contract address and function name.
 */
import { STACKING_POOL_CONTRACT_NAME } from "../src/constants.js";

const contractAddress = process.env.STACKING_POOL_CONTRACT_ADDRESS || "";
const userAddress = process.env.USER_ADDRESS || "";

if (contractAddress && userAddress) {
  console.log("Contract:", STACKING_POOL_CONTRACT_NAME);
  console.log("Read get-balance for", userAddress);
}
