# Contributing to stackdapp

Thanks for your interest in contributing.

## Development setup

1. Clone the repo and run `npm install`.
2. Install [Clarinet](https://docs.hiro.so/clarinet/getting-started).
3. Run `clarinet check` to validate contracts and `npm test` for tests.

## Code and contracts

- Clarity contracts live in `contracts/`. Use `clarinet contract new <name>` to add one.
- TypeScript tests use Vitest and the Clarinet SDK in `tests/`.
- Frontend/script helpers using `@stacks/connect` and `@stacks/transactions` live in `src/`.

## Submitting changes

Open a pull request with a clear description. Ensure `clarinet check` and `npm test` pass.
