#!/bin/sh

set -euo pipefail

cd app && npm run-script build

firebase serve
