# The Developer Field Guide

A practical, beginner-friendly guide to terminal development, Git, Docker, and gcloud on **macOS, Linux, and Windows PowerShell**.

The default **Everyday** mode teaches mainstream commands in short, focused lessons. **Advanced** keeps the deeper explanations and recovery recipes. Git has a dedicated entry page and worked cases showing commands, branch ancestry, HEAD, and file changes together.

## What is included

- Four guides: Terminal, Git, Docker, and gcloud.
- A platform selector with native PowerShell examples rather than Unix flags disguised as Windows commands.
- 56 lesson records: 23 short Everyday lessons plus Advanced and platform-specific references. Which lessons appear depends on platform and depth.
- 200 entries across the detailed command index, filtered for the selected platform.
- Three interactive Git case walkthroughs, plus a staging/snapshot visual explanation.
- Five browser practice exercises: navigation, selective commits, backports, Docker port mappings, and gcloud context verification.
- Named local profiles, separate lesson/practice progress, and versioned JSON export/import.
- Topic- and platform-aware cheat sheets with Markdown/HTML downloads and browser Print / Save PDF.
- Downloadable real Git labs for Bash and PowerShell, plus Docker and terminal practice files.

## Read or run locally

Open `index.html` from this folder in a modern browser. Keep the `assets/` directory beside it. The runtime uses ordinary HTML, CSS, and JavaScript; it has no package-install step, remote fonts, analytics, online login, or external application backend.

For a consistent local origin and convenient testing, serve this folder:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open `http://localhost:8000`. On Windows with the Python launcher installed, `py -m http.server 8000 --bind 127.0.0.1` is another option. Stop the local server with Control-C.

Direct entry pages are `git.html`, `docker.html`, `gcloud.html`, and `practice.html`. Lessons use hash routes, so GitHub Pages needs no SPA rewrite server.

## Local profiles and privacy

Profiles are **browser-local labels, not authenticated online accounts**. They do not synchronize automatically. Anyone using that browser profile can access the saved learning data. Clearing browser storage can remove it; use **Progress → Export progress.json** for a backup or manual transfer.

Import validates the file before applying it. The default merges into the current profile. Replacing existing progress requires an explicit confirmation checkbox. Lesson completion is self-reported; browser practice completion is checked against the simulator's resulting state. Hint/solution-assisted attempts are distinguished from independent completion.

Local storage behavior for `file://` URLs varies by browser. If storage is unavailable, the site reports session-only mode; use export or a local HTTP server. A hosted site's origin has separate storage from a local preview; manually transfer progress with export/import.

## Practice is a simulation

The browser practice area supports a small documented command vocabulary and changes an in-memory model. It **never executes commands on your computer, pushes to GitHub, runs a real container, or creates cloud resources**. Type `help` inside an exercise to see supported commands. Reset starts a fresh attempt.

Read a real Git lab before running it. `bash git-lab.sh` creates its own temporary repository and does not contact a remote. `git-lab.ps1` is its native PowerShell companion, to be run under your approved script-execution policy. The intentional hard reset is contained inside the toy repository after committing its practice files. The Windows script has not been executed on a real Windows host during this preparation.

## Rebuild the content

The generated `assets/content.js` is checked in, so the deployed site needs no Python runtime. To edit lessons, use `lessons.md` and `source/advanced.md`, then rebuild:

```sh
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
python build.py
```

Windows can use its corresponding Python/virtual-environment setup. The builder uses only the sources inside this directory. `source/command-index.txt` supplies the longer reference; the short cheat sheets and course metadata are defined in `build.py`.

## Tests

Run the pure state/validation tests with Node.js 20 or newer:

```sh
node --test tests/*.test.cjs
node --check assets/app.js
node --check assets/model.js
```

`tests/browser-check.cjs` exports a Playwright-page check suite. The executable adapter below runs it with an installed Playwright package and a local server:

```sh
node tests/run-browser.mjs http://localhost:8000/
```

Install Playwright in your development environment before using that optional browser adapter. It is not a production dependency. The suite uses a fresh isolated browser context and checks real downloads, profile isolation, import validation, platform-specific examples, practice goals, Git steps, print CSS, and mobile navigation. It does not touch an existing user's progress.

See `TEST-RESULTS.md` for the checks run during preparation and their limits. Docker runtime examples were not launched because the local daemon was stopped; the Compose configuration was validated separately.

## Publish with GitHub Pages

This repository is a static site. With the public repository created and these files on its default branch, choose **Settings → Pages → Deploy from a branch**, then the default branch and `/ (root)`. `.nojekyll` keeps publication as static files. No database, client secret, or server credentials are needed.

The intended project URL is `https://anas-ah25.github.io/developer-field-guide/`. Treat that as a deployment target until the Pages deployment has actually completed. Any enabled Actions workflow in this repository runs checks; the Pages publishing source is configured separately.

## Contributing

Prefer one teaching outcome per Everyday lesson. Keep uncommon flags and edge cases in Advanced. Platform examples should reflect their actual shell. Add state-based tests for practice behavior, label any simulation limitations, cite primary documentation, and keep real credentials or private project material out of examples.
