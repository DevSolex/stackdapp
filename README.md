# stackdapp

STX Stacking Rewards dApp — a Clarity smart contract project for tracking STX deposits and reward shares in a stacking pool.

## Requirements

- [Clarinet](https://docs.hiro.so/clarinet/getting-started) (Clarity toolchain)
- Node.js 18+ (for running TypeScript tests)

## Quick start

```bash
# Install dependencies
npm install

# Check contracts
clarinet check

# Run tests
npm test
```

## Project structure

- `contracts/` — Clarity smart contracts
- `tests/` — TypeScript tests (Vitest + Clarinet SDK)
- `settings/` — Devnet, Testnet, Mainnet configs

## Contracts

### stacking-pool

A custodial-style pool where users deposit STX. The contract tracks each user's balance and total stacked STX. Reward share is computed as `(user_balance / total_stacked) * 10000` (basis points). The pool operator can update the current cycle and transfer the operator role.
