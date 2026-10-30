#!/bin/bash
set -euo pipefail

# Refuse a missing or invalid directory before running inspection commands.
project_dir="${1:-.}"
if [[ ! -d "$project_dir" ]]; then
  printf 'Not a directory: %s\n' "$project_dir" >&2
  exit 1
fi

cd "$project_dir"
printf 'Inspecting %s\n' "$PWD"
find . -maxdepth 2 -type f -name '*.md' -print
