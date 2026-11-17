#!/usr/bin/env bash
set -euo pipefail

# Shared production build for Vercel / Netlify.
# Runs full Tina build when Cloud credentials are present.

if [[ -z "${NEXT_PUBLIC_TINA_CLIENT_ID:-}" || -z "${TINA_TOKEN:-}" ]]; then
  echo "Tina Cloud credentials are not set."
  echo "Building the public site only. /admin will not work until credentials are added."
  rm -rf public/admin
  npx next build
else
  echo "Building with Tina Cloud..."
  npx tinacms build && npx next build
fi
