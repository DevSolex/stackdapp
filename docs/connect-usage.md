# Using @stacks/connect with stackdapp

Use `@stacks/connect` for wallet connection and `@stacks/transactions` for payloads.

```ts
import { connect } from "@stacks/connect";
import { buildDepositPayload } from "../src/stacking-pool-tx.js";
```

Build the contract call with `createContractCallPayload` or `makeContractCall` from `@stacks/transactions`, then pass to the wallet via Connect.
