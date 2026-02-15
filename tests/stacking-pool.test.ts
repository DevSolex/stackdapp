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

describe("stacking-pool deposit", () => {
  it("rejects zero amount", () => {
    const res = simnet.callPublicFn(
      contractName,
      "deposit",
      [Cl.uint(0)],
      wallet1
    );
    expect(res.result).toBeErr(Cl.uint(100));
  });

  it("deposits STX and updates balance and total", () => {
    const amount = 1_000_000; // 1 STX in uSTX
    const res = simnet.callPublicFn(
      contractName,
      "deposit",
      [Cl.uint(amount)],
      wallet1
    );
    expect(res.result).toBeOk(Cl.uint(amount));

    const balance = simnet.callReadOnlyFn(
      contractName,
      "get-balance",
      [Cl.principal(wallet1)],
      deployer
    );
    expect(balance.result).toBeOk(Cl.uint(amount));

    const total = simnet.callReadOnlyFn(
      contractName,
      "get-total-stacked",
      [],
      deployer
    );
    expect(total.result).toBeOk(Cl.uint(amount));
  });
});

describe("stacking-pool withdraw", () => {
  it("rejects zero amount", () => {
    const res = simnet.callPublicFn(
      contractName,
      "withdraw",
      [Cl.uint(0)],
      wallet1
    );
    expect(res.result).toBeErr(Cl.uint(100));
  });

  it("rejects withdraw exceeding balance", () => {
    const res = simnet.callPublicFn(
      contractName,
      "withdraw",
      [Cl.uint(1_000_000)],
      wallet2
    );
    expect(res.result).toBeErr(Cl.uint(101));
  });

  it("withdraws STX and updates balance and total", () => {
    simnet.callPublicFn(contractName, "deposit", [Cl.uint(2_000_000)], wallet1);

    const res = simnet.callPublicFn(
      contractName,
      "withdraw",
      [Cl.uint(500_000)],
      wallet1
    );
    expect(res.result).toBeOk(Cl.uint(500_000));

    const balance = simnet.callReadOnlyFn(
      contractName,
      "get-balance",
      [Cl.principal(wallet1)],
      deployer
    );
    expect(balance.result).toBeOk(Cl.uint(1_500_000));
    const total = simnet.callReadOnlyFn(
      contractName,
      "get-total-stacked",
      [],
      deployer
    );
    expect(total.result).toBeOk(Cl.uint(1_500_000));
  });
});

describe("stacking-pool reward-share", () => {
  it("returns 0 when total stacked is zero", () => {
    const res = simnet.callReadOnlyFn(
      contractName,
      "get-reward-share",
      [Cl.principal(wallet1)],
      deployer
    );
    expect(res.result).toBeOk(Cl.uint(0));
  });

  it("returns 10000 (100%) for sole depositor", () => {
    simnet.callPublicFn(contractName, "deposit", [Cl.uint(1_000_000)], wallet1);
    const res = simnet.callReadOnlyFn(
      contractName,
      "get-reward-share",
      [Cl.principal(wallet1)],
      deployer
    );
    expect(res.result).toBeOk(Cl.uint(10000));
  });

  it("splits share proportionally between two depositors", () => {
    simnet.callPublicFn(contractName, "deposit", [Cl.uint(3_000_000)], wallet1);
    simnet.callPublicFn(contractName, "deposit", [Cl.uint(1_000_000)], wallet2);
    const share1 = simnet.callReadOnlyFn(
      contractName,
      "get-reward-share",
      [Cl.principal(wallet1)],
      deployer
    );
    const share2 = simnet.callReadOnlyFn(
      contractName,
      "get-reward-share",
      [Cl.principal(wallet2)],
      deployer
    );
    expect(share1.result).toBeOk(Cl.uint(7500));
    expect(share2.result).toBeOk(Cl.uint(2500));
  });
});

describe("stacking-pool pool-operator", () => {
  it("deployer is pool operator initially", () => {
    const res = simnet.callReadOnlyFn(
      contractName,
      "is-pool-operator",
      [Cl.principal(deployer)],
      deployer
    );
    expect(res.result).toBeOk(Cl.bool(true));
  });

  it("non-operator cannot set pool operator", () => {
    const res = simnet.callPublicFn(
      contractName,
      "set-pool-operator",
      [Cl.principal(wallet1)],
      wallet1
    );
    expect(res.result).toBeErr(Cl.uint(102));
  });

  it("operator can set new pool operator", () => {
    const res = simnet.callPublicFn(
      contractName,
      "set-pool-operator",
      [Cl.principal(wallet1)],
      deployer
    );
    expect(res.result).toBeOk(Cl.bool(true));
    const check = simnet.callReadOnlyFn(
      contractName,
      "is-pool-operator",
      [Cl.principal(wallet1)],
      deployer
    );
    expect(check.result).toBeOk(Cl.bool(true));
  });
});

describe("stacking-pool current-cycle", () => {
  it("returns initial cycle 1", () => {
    const res = simnet.callReadOnlyFn(
      contractName,
      "get-current-cycle",
      [],
      deployer
    );
    expect(res.result).toBeOk(Cl.uint(1));
  });

  it("non-operator cannot set current cycle", () => {
    const res = simnet.callPublicFn(
      contractName,
      "set-current-cycle",
      [Cl.uint(5)],
      wallet2
    );
    expect(res.result).toBeErr(Cl.uint(102));
  });

  it("operator can set current cycle", () => {
    const res = simnet.callPublicFn(
      contractName,
      "set-current-cycle",
      [Cl.uint(5)],
      deployer
    );
    expect(res.result).toBeOk(Cl.bool(true));
    const cycle = simnet.callReadOnlyFn(
      contractName,
      "get-current-cycle",
      [],
      deployer
    );
    expect(cycle.result).toBeOk(Cl.uint(5));
  });
});
