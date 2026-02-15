# stacking-pool contract API

Public functions and read-only views for the `stacking-pool` Clarity contract.

## Public functions

| Function | Args | Description |
|---------|------|-------------|
| `deposit` | `(amount-ustx uint)` | Transfer STX into the pool; increases caller's balance and total. |
| `withdraw` | `(amount-ustx uint)` | Transfer STX from the pool to caller; decreases balance and total. |
| `set-pool-operator` | `(new-operator principal)` | Set the pool operator (caller must be current operator). |
| `set-current-cycle` | `(cycle uint)` | Set the current stacking cycle (caller must be operator). |

## Read-only functions

| Function | Args | Returns | Description |
|----------|------|---------|-------------|
| `get-balance` | `(user principal)` | `uint` | User's stacked balance in uSTX. |
| `get-total-stacked` | — | `uint` | Total STX in the pool (uSTX). |
| `get-reward-share` | `(user principal)` | `uint` | User's share in basis points (0–10000). |
| `get-current-cycle` | — | `uint` | Current cycle number. |
| `is-pool-operator` | `(who principal)` | `bool` | Whether `who` is the pool operator. |

## Error codes

- `100` — amount is zero.
- `101` — insufficient balance for withdraw.
- `102` — caller is not the pool operator.
- `103` — STX transfer failed.
