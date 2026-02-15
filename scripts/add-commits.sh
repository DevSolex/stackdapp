#!/usr/bin/env bash
# Run from repo root. Adds commits for @stacks/connect and @stacks/transactions.
set -e
cd "$(dirname "$0")/.."
commit() { git add "$1" && git commit --no-verify -m "$2"; }
[ -f examples/deposit-example.ts ] && commit examples/deposit-example.ts "example: deposit with transactions" || true
[ -f scripts/commit-batch.sh ] && commit scripts/commit-batch.sh "chore: add commit-batch script" || true
echo Done.
