# FAQ

**How do I deposit?** Use buildDepositPayload from src/stacking-pool-tx.ts (@stacks/transactions) and send via @stacks/connect.

**What is uSTX?** 1 STX = 1e6 uSTX. Use Cl.uint(amountUstx) in transactions.

**Where is the contract?** Deploy with Clarinet, set STACKING_POOL_CONTRACT_ADDRESS.
