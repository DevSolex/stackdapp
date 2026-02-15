#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/.."
echo "Running clarinet check..."
clarinet check
echo "Running tests..."
npm test
echo "Done."
