/**
 * Parse STX amounts for use with @stacks/transactions (Cl.uint).
 */
import { ONE_STX } from "./constants.js";

/** Parse "1.5" or "1500000" (uSTX) to bigint uSTX. */
export function parseStxAmount(input: string): bigint {
  if (input.includes(".")) {
    const [whole, frac = ""] = input.split(".");
    const padded = frac.padEnd(6, "0").slice(0, 6);
    return BigInt(whole || "0") * ONE_STX + BigInt(padded);
  }
  return BigInt(input);
}

export { ONE_STX };
