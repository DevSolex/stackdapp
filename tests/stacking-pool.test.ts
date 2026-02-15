import { describe, it, expect } from "vitest";
import { Cl } from "@stacks/transactions";

const contractName = "stacking-pool";

const accounts = simnet.getAccounts();
const deployer = accounts.get("deployer")!;
const wallet1 = accounts.get("wallet_1")!;
const wallet2 = accounts.get("wallet_2")!;

const getStxBalance = (addr: string): bigint => {
  const assets = simnet.getAssetsMap();
  const stx = assets.get("STX");
  return stx?.get(addr) ?? 0n;
};

describe("stacking-pool read-only", () => {
  it("returns zero balance for user with no deposit", () => {
    const res = simnet.callReadOnlyFn(
      contractName,
      "get-balance",
      [Cl.principal(wallet1)],
      deployer
    );
    expect(res.result).toBeOk(Cl.uint(0));
  });

  it("returns zero total stacked initially", () => {
    const res = simnet.callReadOnlyFn(
      contractName,
      "get-total-stacked",
      [],
      deployer
    );
    expect(res.result).toBeOk(Cl.uint(0));
  });
});
