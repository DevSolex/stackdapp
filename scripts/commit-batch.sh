#!/usr/bin/env bash
# Helper to run clarinet check and npm test before pushing.
set -e
cd "$(dirname "$0")/.."
clarinet check
npm test
