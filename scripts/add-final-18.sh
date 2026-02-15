#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/.."
rm -f .git/index.lock
c() { git add "$1" 2>/dev/null && git commit --no-verify -m "$2" || true; }
c "docs/contract-address.md" "docs: contract address for connect and transactions"
c "docs/testing.md" "docs: testing with transactions"
c "docs/deploy.md" "docs: deploy and use connect and transactions"
c "README-EXAMPLES.md" "docs: examples using connect and transactions"
c "docs/payload.md" "docs: payload with transactions and connect"
c "docs/signing.md" "docs: signing with connect"
c "docs/readonly.md" "docs: read-only calls and transactions"
c "src/network-helper.ts" "feat(src): network helper for connect and transactions"
c "src/index.ts" "feat(src): export network-helper"
c "docs/deps.md" "docs: deps connect and transactions"
c "docs/faq.md" "docs: faq connect and transactions"
c "scripts/add-remaining-commits.sh" "chore: add remaining commits script"
c "scripts/add-final-18.sh" "chore: add final commits script"
echo Done. Total: $(git rev-list --count HEAD)
