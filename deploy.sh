#!/bin/sh

set -eu

cd app && npm run-script build

firebase deploy
