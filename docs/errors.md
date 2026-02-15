# stacking-pool error codes

| Code | Constant | Meaning |
|------|----------|---------|
| 100 | err-amount-zero | `deposit` or `withdraw` was called with amount 0. |
| 101 | err-insufficient-balance | `withdraw` amount exceeds caller's balance. |
| 102 | err-not-pool-operator | Caller is not the pool operator. |
| 103 | err-transfer-failed | STX transfer failed. |

Handle these in app code when using @stacks/connect and @stacks/transactions.
