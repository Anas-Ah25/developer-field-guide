#!/bin/bash
set -euo pipefail

lab_dir=$(mktemp -d /tmp/git-learning.XXXXXX)
cd "$lab_dir"
git init -b main
git config user.name "Git Learner"
git config user.email "learner@example.invalid"
git config commit.gpgsign false
git config core.hooksPath /dev/null

# A: the shared starting point.
printf '%s\n' '# Learning Git' > README.md
git add README.md
git commit -m "Create practice project"
base_commit=$(git rev-parse HEAD)

# Feature change C.
git switch -c feature/search
printf '%s\n' 'Search returns matching documents.' > search.txt
git add search.txt
git commit -m "Add search behavior"
search_commit=$(git rev-parse HEAD)

# An independent change on main, so the later merge has two parents.
git switch main
printf '%s\n' 'Main branch configuration.' > config.txt
git add config.txt
git commit -m "Add project configuration"
git merge --no-ff feature/search -m "Merge search feature"

# A maintenance release from the original base; backport only search.
git switch -c release/practice "$base_commit"
git cherry-pick -x "$search_commit"
git log -1 --format=full

# Undo the backport with a new inverse commit, keeping its history.
git revert --no-edit HEAD
test ! -e search.txt

# Create a toy committed file, deliberately move back, then rescue it.
git switch main
git switch -c rescue-demo
printf '%s\n' 'This committed work can be recovered.' > recover.txt
git add recover.txt
git commit -m "Add recovery practice file"
lost_tip=$(git rev-parse HEAD)
git reset --hard HEAD~1
git reflog -5

git branch recovered "$lost_tip"
git switch recovered
test -f recover.txt

git log --graph --decorate --oneline --all
git status --short
printf '\nLab complete. Repository: %s\n' "$lab_dir"
