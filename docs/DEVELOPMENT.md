# Development

## Local workflow

1. `npm install` then `clarinet check` and `npm test`.
2. Edit contracts in `contracts/`; use `clarinet contract new <name>` for new contracts.
3. Add or update tests in `tests/`; use `simnet.callPublicFn` and `simnet.callReadOnlyFn` with the Clarinet SDK.
4. Use `src/stacking-pool-tx.ts` and `src/connect-wallet.ts` with `@stacks/transactions` and `@stacks/connect` for app integration.

## Clarinet

- `clarinet check` — validate all contracts.
- `clarinet test` — run contract tests (alternative to `npm test` which runs the TypeScript test suite).
