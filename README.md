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
### mini-coin (SIP-10)

A simple fungible token used as a reward for the mini-game.
- **Name**: Mini Coin
- **Symbol**: MINI
- **Decimals**: 6

### simple-game

A Play-to-Earn contract.
- **Function `play`**: Calling this function rewards the user with 10 MINI tokens.


### stacking-pool

A custodial-style pool where users deposit STX. The contract tracks each user's balance and total stacked STX. Reward share is computed as `(user_balance / total_stacked) * 10000` (basis points). The pool operator can update the current cycle and transfer the operator role.

## Using @stacks/connect and @stacks/transactions

This repo uses **@stacks/connect** for wallet connection and **@stacks/transactions** for building contract call payloads.

- **`src/stacking-pool-tx.ts`** — builds `deposit` and `withdraw` contract call transactions with `makeContractCall` and `createContractCallPayload` from `@stacks/transactions`.
- **`src/connect-wallet.ts`** — uses `connect()` from `@stacks/connect` and imports the payload builders for use in the browser.

Example: build a deposit payload and let the user sign via Connect:

```ts
import { buildDepositPayload } from "./src/stacking-pool-tx.js";
import { connect } from "@stacks/connect";
```

Install with `npm install`; both packages are in `package.json` dependencies.

## @stacks/connect and @stacks/transactions

This repo uses **@stacks/connect** and **@stacks/transactions** in src/, examples/, and docs. See COMMITS.md and README-EXAMPLES.md. All examples use both packages.

## Deployment

Deploy the `stacking-pool` contract with Clarinet to Devnet, Testnet, or Mainnet. Set `STACKING_POOL_CONTRACT_ADDRESS` in your app (e.g. from `.env`) and use `src/stacking-pool-tx.ts` with your deployed contract address.
