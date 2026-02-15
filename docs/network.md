# Network configuration

Use `mainnet` or `testnet` with @stacks/transactions and @stacks/connect:

```ts
import { buildDepositTx } from "./src/stacking-pool-tx.js";
buildDepositTx({ ..., network: "testnet" });
```

Set `STACKS_NETWORK` in `.env` to match your deployment.
