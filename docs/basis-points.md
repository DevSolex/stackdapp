# Reward share (basis points)

Reward share is returned as 0–10000 (10000 = 100%) from `get-reward-share`. Use with @stacks/transactions when building read-only calls or displaying in the app.

`(user_balance * 10000) / total_stacked`
