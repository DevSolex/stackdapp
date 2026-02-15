/**
 * Validate uSTX amount for use with @stacks/transactions (Cl.uint).
 */
export function validateAmountUstx(amount: bigint): boolean {
  return amount > 0n && amount <= 0xffffffffn;
}

export function validateAmountStx(stxString: string): boolean {
  try {
    const n = BigInt(stxString.replace(".", ""));
    return n > 0n;
  } catch {
    return false;
  }
}
