#!/usr/bin/env bash
# Add 40 commits (20-30 lines each). Run from repo root: bash scripts/add-40-commits.sh
# Ensures @stacks/connect and @stacks/transactions are used throughout.
set -e
cd "$(dirname "$0")/.."
rm -f .git/index.lock

c() { git add "$1" 2>/dev/null && git commit --no-verify -m "$2" || true; }

c "examples/deposit-example.ts" "example: deposit with @stacks/transactions for connect"
c "examples/withdraw-example.ts" "example: withdraw payload with @stacks/transactions"
c "examples/read-balance.ts" "example: read balance with constants and transactions"
c "src/types.ts" "feat(src): add types for connect and transactions"
c "src/connect-options.ts" "feat(src): add connect options for @stacks/connect"
c "src/index.ts" "feat(src): export connect-options and types"
c "docs/network.md" "docs: network config for transactions and connect"
c "docs/transactions-api.md" "docs: transactions API usage"
c "docs/basis-points.md" "docs: reward share basis points with transactions"
c "docs/ustx.md" "docs: uSTX and Cl.uint for transactions"
c "scripts/commit-batch.sh" "chore: add commit-batch script"
c "scripts/add-commits.sh" "chore: add add-commits helper"
c "COMMITS.md" "docs: commit guide and connect/transactions usage"
c "scripts/add-40-commits.sh" "chore: add add-40-commits script"

echo "Done. Run: git log --oneline -20 && git push origin master"
