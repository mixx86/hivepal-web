#!/bin/sh
# Builds the site from the Hivepal repo's docs and publishes it on GitHub Pages (branch gh-pages).
#   ./deploy.sh [path to the hivepal repo, default ../hivepal]
set -eu
cd "$(dirname "$0")"
python3 sync.py "${1:-../hivepal}"
NO_MKDOCS_2_WARNING=1 uvx --quiet --from "mkdocs-material>=9.5" mkdocs gh-deploy --strict --force --no-history
