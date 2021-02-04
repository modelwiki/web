#!/bin/sh

# When this is running, sign in at http://localhost:5000/index.html

# Joakim gets an error for: o pipefail
set -eu

cd app && npm run-script build

firebase serve

