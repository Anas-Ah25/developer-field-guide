@@ orientation|terminal|Find your way around|Three commands you will use almost every day.
## Think: where, what, move

The terminal is a text interface. Its shell reads commands and starts programs. Open **Terminal** on a Mac, a terminal app on Linux, or **PowerShell** in Windows Terminal. Windows examples here use PowerShell, not Command Prompt.

| Your question | macOS / Linux | Windows PowerShell |
|---|---|---|
| Where am I? | `pwd` | `Get-Location` |
| What is here? | `ls` | `Get-ChildItem` |
| Move into a folder. | `cd folder` | `Set-Location folder` |

```unix
pwd
ls
cd Documents
pwd
```

```windows
Get-Location
Get-ChildItem
Set-Location Documents
Get-Location
```

Start in your home folder for this example; a folder named Documents must exist. The last command prints your new location. `cd ..` moves one folder up on all three platforms; `cd` is also a PowerShell alias for Set-Location.

**Do not type the prompt.** If a tutorial shows `$ ls` or `PS C:\> Get-ChildItem`, type only the command after it. Press Return to run it. Use Tab to complete a folder name. Use Up to recall a command, then read it before running it again.

**Try it:** open the practice area and navigate to `docs`, then read its README. Nothing in the practice area touches your computer.

@@ folders|terminal|Paths and folders|Know which folder a command will change.
A **path** is a file or folder address. A relative path starts from where you are now. An absolute path starts from the filesystem root or a drive.

| Idea | macOS | Linux | Windows |
|---|---|---|---|
| Typical home | `/Users/you` | `/home/you` | `C:\Users\you` |
| Current directory | `.` | `.` | `.` |
| Parent directory | `..` | `..` | `..` |
| A relative file | `docs/notes.txt` | `docs/notes.txt` | `docs\notes.txt` |

Create a new learning folder in your home directory. This example writes only that folder.

```unix
cd ~
mkdir -p command-practice
cd command-practice
mkdir notes
```

```windows
Set-Location $HOME
New-Item -ItemType Directory -Path command-practice
Set-Location command-practice
New-Item -ItemType Directory -Path notes
```

PowerShell's New-Item can report an error if that directory already exists; inspect it and enter the existing directory rather than assuming creation failed mysteriously.

**Spaces need quotes:** `cd 'My Notes'` treats the name as one argument. Avoid “fixing” a path by guessing. Read your location and list its contents first.

**Habit to keep:** before any command that moves or deletes files, know the current folder and the exact target. You do not need to learn every system directory yet; the Advanced filesystem chapter is there when you need it.

@@ file-work|terminal|Copy, rename, and remove files|The useful everyday operations, with their effects made explicit.
Work in the command-practice folder from the previous lesson. First create a small note; this replaces `note.txt` if it exists.

```unix
printf '%s\n' 'My first note' > note.txt
cp -i note.txt note-copy.txt
mv -i note-copy.txt reviewed.txt
cat reviewed.txt
```

```windows
Set-Content -LiteralPath note.txt -Value 'My first note'
Copy-Item -LiteralPath note.txt -Destination note-copy.txt -Confirm
Move-Item -LiteralPath note-copy.txt -Destination reviewed.txt -Confirm
Get-Content -LiteralPath reviewed.txt
```

**Copy** keeps the original. **Move** changes the name or location. The confirmation options help you inspect a change, but do not replace understanding the destination.

For deletion, preview the exact filename first. Terminal deletion does not normally use your graphical Trash or Recycle Bin.

```unix
ls -l reviewed.txt
rm -i reviewed.txt
```

```windows
Remove-Item -LiteralPath reviewed.txt -WhatIf
Remove-Item -LiteralPath reviewed.txt -Confirm
```

PowerShell's `-WhatIf` previews an operation without doing it; the following command performs the removal if you confirm. Avoid recursive deletion while learning. A folder full of files is a different risk from one known practice file.

**Expected result:** `note.txt` remains; `reviewed.txt` has been removed. List the folder to verify that prediction.

@@ read-search|terminal|Read and find text|Find the line you need in a README or log.
For a small text file, print its contents. For a larger one, read just a part or search it.

```unix
cat note.txt
head -n 10 note.txt
grep -n 'first' note.txt
```

```windows
Get-Content -LiteralPath note.txt
Get-Content -LiteralPath note.txt -TotalCount 10
Select-String -LiteralPath note.txt -Pattern 'first' -SimpleMatch
```

These examples use the note from the previous lesson. A search can return no matches without anything being broken. `grep -n` includes line numbers. Select-String includes the path, line number, and matching text in its result.

For a large file on macOS/Linux, `less FILE` opens a pager: use Space to move forward, `/word` to search, and **q to exit**. To watch a real existing log grow:

```unix
tail -n 20 -f app.log
```

```windows
Get-Content -LiteralPath app.log -Tail 20 -Wait
```

Press **Control-C** to stop following the log. This stops your log viewer, not the application writing the log.

Searching filenames and searching contents are different tasks. For now, list the folder to find a file, then search that file's contents. Recursive search tools and regular expressions are in Advanced when you need them.

@@ glue|terminal|A little shell syntax|Quotes, output files, and pipes—without the entire shell manual.
**Quotes keep text together.** Use them around filenames with spaces. Double-quoted strings can expand variables; single-quoted strings usually mean literal text. The shell languages differ in the details.

A pipe `|` passes results from one command to another. Unix pipelines mostly pass text; PowerShell pipelines commonly pass objects.

```unix
printf '%s\n' 'INFO started' 'ERROR timeout' | grep 'ERROR'
```

```windows
'INFO started', 'ERROR timeout' | Select-String -Pattern 'ERROR'
```

**Expected result:** the error line is selected. You have joined two small operations instead of writing a program.

`>` writes output to a file and **replaces** existing contents. `>>` appends. Use these only with an intended output file. Never try to transform a file into itself with `tool file > file`; it can be emptied before the tool reads it.

To find a command or understand a failure:

```unix
command -v git
man ls
```

```windows
Get-Command git
Get-Help Get-ChildItem -Examples
```

For an external program such as Git, `git --help` works on every platform. A successful command can print nothing. Check the resulting files or state instead of repeating it because it was quiet.

@@ running|terminal|When a program will not stop or start|Processes and ports, explained through a common development problem.
A **process** is a running program. A development web server often occupies a terminal until you stop it. Press **Control-C** in that terminal to ask it to stop.

If the next server says “port 8000 is already in use,” find the existing listener:

```mac
lsof -nP -iTCP:8000 -sTCP:LISTEN
```

```linux
ss -ltnp 'sport = :8000'
```

```windows
Get-NetTCPConnection -LocalPort 8000 -State Listen
```

Linux may show less process information without sufficient permission. Windows shows an `OwningProcess` ID; inspect it with `Get-Process -Id PID`, replacing PID with that number.

Do not terminate an unfamiliar process just to reclaim a port. Stop your own old server normally, or choose a different port. The advanced reference covers process signals and stronger termination options.

**Command not found?** First check spelling, whether the tool is installed, and whether this shell can find it. Installing a command and starting a service are different actions. For example, a Docker CLI can exist while the Docker engine is stopped.

**Practice habit:** note the exact error, the directory, and the command that produced it. Those three facts make troubleshooting much easier.

@@ tidy-project|terminal|Keep a project understandable|Folders, comments, and a useful daily routine.
A small project often has these parts:

```diagram
project/
├── README.md       how to set up, run, and test it
├── src/            the application
├── tests/          checks that matter
├── docs/           longer explanations
├── scripts/        repeatable helper tasks
├── .gitignore      local files Git should not start tracking
└── .env.example    configuration names with placeholder values
```

You do not need to create every folder in a small project. Follow an existing repository's conventions. Keep credentials and local environments out of version control; a leading dot does not make a file secret.

## A good code comment explains why

```python
# The provider counts the original request as attempt 1.
# Match that numbering so support can compare our logs with theirs.
attempt += 1
```

A weak comment merely says “increment attempt.” Prefer clear variable names, and comment on constraints or surprising decisions. Update comments when behavior changes.

## A useful commit message is specific

`Fix empty search results` tells a reviewer more than `updates`. Add a body when the reason or tradeoff needs explanation. A useful README includes actual commands and the directory in which to run them.

**Daily loop:** inspect the directory and Git state → make a focused change → run relevant checks → review the diff → commit with a reason. You will learn more by repeating this loop than by memorizing a long list of obscure commands.

@@ snapshots|git|What Git is remembering|Understand the three places your work can live.
Git records meaningful snapshots of your project. GitHub is a service for hosting repositories and reviews; Git itself also works offline.

<!-- STAGING_MODEL -->

1. **Working files:** what you edit in your editor.
2. **Staging area:** the file versions selected for your next commit.
3. **History:** snapshots already committed locally.

```git
git status
git diff
git add README.md
git diff --staged
git commit -m "Explain local setup"
```

`status` gives the overall situation. `diff` reviews unstaged changes to tracked files. `add` selects the current contents of a path. `diff --staged` shows what the next commit will contain. `commit` saves that staged snapshot locally.

**The important surprise:** if you stage a file and then edit it again, commit saves the staged version, not the later edit. Stage it again if you want the newer version included.

Untracked files are not automatically included in diffs or commits. Inspect their contents yourself before adding them. A local commit is not a push, and a push is not automatically a production deployment.

**Try it:** the “Commit only the intended change” exercise includes a README edit and an unrelated note. Save the README without accidentally committing the note.

@@ first-commit|git|Make your first local commit|A complete example in a new practice folder.
Install Git first if needed, then check `git --version`. Use Git 2.28+ for this initialization example. Create a new folder; do not initialize inside an existing work repository.

```unix
mkdir git-practice
cd git-practice
printf '%s\n' '# My practice project' > README.md
```

```windows
New-Item -ItemType Directory -Path git-practice
Set-Location git-practice
Set-Content -LiteralPath README.md -Value '# My practice project'
```

These Git commands are the same on all three platforms:

```git
git init -b main
git config user.name "Git Learner"
git config user.email "learner@example.invalid"
git status
git add README.md
git diff --staged
git commit -m "Create practice project"
git log --oneline
```

The identity settings above apply only to this practice repository. For real work, use your actual approved identity or privacy address. Setting authorship does not sign you into GitHub.

**Expected result:** one commit appears in the log and README is tracked. `git status` should report no pending tracked changes. Git may open an editor if a command needs a message; use an editor you know.

A useful commit is one understandable change. Before committing in a real project, run its relevant checks and inspect the staged diff. Prefer `git add FILE` while learning; broad staging can pick up unrelated content.

@@ feature-branch|git|Work on a feature branch|See a real branch meet a newer main.
A branch is a name pointing at a commit. It lets you develop a change along its own history. It does not create an independent copy of your uncommitted edits.

```git
git switch -c feature/search
git branch --show-current
```

Starting from the intended base, those commands create and select a branch. Edit and commit your focused change there. Use `git status` before switching or integrating work.

<!-- CASE:merge -->

A **merge** combines histories. A **rebase** replays changes on a different base and typically creates replacement commit IDs. The walkthrough shows both outcomes; they are alternative integration choices, not commands you must run one after the other.

For a beginner working with a team, follow its pull request and merge policy. Do not rebase shared main or force a push simply to make the graph look tidy. The Advanced Git guide explains private-history cleanup and force-with-lease in detail.

**Predict it:** after a normal merge, does the feature's earlier commit change its ID? No; a merge preserves that commit and may add a new merge commit joining the histories.

@@ sharing|git|Share work through a pull request|A simple collaboration loop you can use repeatedly.
Use this when your project allows remote changes. `origin` is a remote nickname; inspect its URL before publishing.

```git
git remote -v
git fetch origin
git status
```

Fetch downloads history and updates your local record of remote branches. It normally does not merge that history into your working files.

For a clean local main with the intended upstream:

```git
git switch main
git pull --ff-only
git switch -c feature/my-change
```

Make the change, run checks, review the diff, stage, and commit. When ready:

```git
git push -u origin feature/my-change
```

**Then on GitHub:** open a pull request toward the intended base branch, explain the problem and behavior, and review the automated checks. Make review fixes locally and push the feature again.

After approval, merge using the repository's policy. Update local main and verify the result before deleting your feature branch.

**A rejected push is not an instruction to force.** Fetch and inspect what the remote contains. It might have a teammate's new commit. Authentication errors and history divergence are different problems.

A PR description needs three things: what changed, why, and how you checked it. Keep unrelated cleanup out of the same review when possible.

@@ backport|git|Cherry-pick a fix into a release|Move one useful change without bringing an unfinished feature.
**The situation:** main has a fix for empty invoice amounts. It also has an experimental export feature. The maintained release needs the fix today, but the experiment must stay out.

<!-- CASE:cherry -->

Cherry-pick applies the selected commit's change to your **current branch**, usually creating a new commit there. It does not merge the whole source branch.

```git
git show FIX_COMMIT_ID
git switch release/1.4
git cherry-pick -x FIX_COMMIT_ID
```

Replace the placeholder with the actual fix ID. Begin from a clean working tree and the correct current release base. `-x` adds a reference to the source commit in the new message, useful for backports.

**Check more than “it applied.”** The fix might depend on code absent from the old release. Run the release's relevant tests and inspect the resulting behavior.

If Git stops for conflicts, read `git status`, edit the correct final files, stage them, and use `git cherry-pick --continue`. `git cherry-pick --abort` abandons the in-progress sequence.

**Try it:** in Practice, apply only the invoice fix to release/1.4. The success check verifies the resulting files and branch, not merely whether you typed the suggested command.

@@ fix-conflict|git|Resolve a conflict with understanding|Decide what the final file should say.
A conflict means Git cannot confidently choose a combined result. It often happens when two branches edit the same lines. Start with `git status` to identify the operation and affected paths.

<!-- CASE:conflict -->

Replace the conflict markers and alternatives with the final intended code. Sometimes one side is right, sometimes both need combining, and sometimes you need a different solution. “Accept current” is not automatically the correct choice.

After editing a file during a merge:

```git
git add README.md
git diff --staged
git merge --continue
```

Run relevant checks for the combined result. `git merge --abort` abandons an in-progress merge; starting from a clean tree makes recovery much simpler.

The continue command follows the operation. For a rebase, use `git rebase --continue`; for a cherry-pick, use `git cherry-pick --continue`. Do not run a random continue command because all the conflicts look similar.

**Important:** no text conflict does not guarantee correct behavior. Two compatible-looking changes can still break an assumption together. Review and tests matter after integration.

@@ undo-basics|git|Undo the right thing|Three common situations, three different tools.
| What happened? | What to consider | What remains? |
|---|---|---|
| I staged a file by mistake. | `git restore --staged FILE` | Working edits stay. |
| I want to discard one tracked file's unstaged edits. | Inspect, preserve anything needed, then `git restore FILE`. | The index's version replaces those edits. |
| A shared commit introduced a bug. | `git revert COMMIT_ID` | History stays; a new inverse commit is added. |

The second row **overwrites local edits**. Do not try it simply to “see what happens” in an active project. Git cannot reliably recover work it never saved.

If you edited files on main but have not committed, `git switch -c feature/my-fix` can create a branch at that same point while preserving the edits. If you already committed, the right repair depends on whether the commit is shared.

**When in doubt:** stop making history changes, inspect `git status` and `git log`, and preserve committed work with a new backup branch. A branch preserves commits, not unsaved or untracked file contents.

Reset, reflog, stash, and the complete 20-scenario cookbook are in Advanced Git. You do not need to memorize them before making your first good commits.

@@ real-lab|git|Practice in a real local repository|A guided exercise when you are ready to use your own terminal.
The browser exercises are simulations. This downloadable lab uses real Git in a **new temporary folder**. It makes no network calls or pushes.

It creates a feature, makes a real merge, backports one change, reverts it, and recovers a committed file after a deliberately demonstrated reset. Read the script first; run it only as a practice lab.

On macOS/Linux, download [git-lab.sh](git-lab.sh), open a terminal in the download folder, then run:

```unix
bash git-lab.sh
```

On Windows, use [git-lab.ps1](git-lab.ps1) in PowerShell under your machine's approved script-execution policy. Alternatively, the Bash lab can run in Git Bash installed with Git for Windows. Bash scripts are not native PowerShell scripts.

```windows
.\git-lab.ps1
```

The script prints the repository location when finished. Inspect it with `git log --graph --decorate --oneline --all` and `git status`. Temporary storage is not a permanent home for valuable work.

**Questions to answer:** why does the release lack the unrelated main-only file? Why does revert leave the bad commit in history? Why can a recovered branch contain a file that disappeared from another branch?

You can repeat the lab: each run creates a separate folder. Completion of this reading lesson does not claim that you have executed the real lab.

@@ image-container|docker|Image versus container|Two nouns explain most Docker commands.
An **image** is the reusable package: files, runtime, and a default command. A **container** is an instance created from that image, with its running or stopped process state and its own writable layer.

```diagram
IMAGE: the reusable package
         │ docker run
    ┌────┴─────┐
    ▼          ▼
container A   container B
own state     own state
```

On macOS and Windows, Docker Desktop commonly supplies a Linux environment for Linux containers. On Linux, the engine can use the host's Linux kernel directly. Install the supported Docker setup for your platform first.

```cli
docker version
docker compose version
docker run --rm hello-world
```

`docker version` shows client and server details. If it cannot connect to the daemon, start or select the intended Docker engine. Reinstalling your application is not the first fix.

`run` creates and starts a container. `--rm` removes this container after it exits; the image can remain cached. Downloaded images and running services use disk and memory.

Docker helps make runtime environments repeatable. It does not automatically make every application secure, correct, or compatible with every CPU architecture. The Advanced guide covers Apple silicon and build details.

@@ local-web|docker|Run and inspect a local container|Understand the host port and the container port.
With Docker running, this starts a local nginx server:

```cli
docker run -d --name learning-web -p 127.0.0.1:8080:80 nginx:stable-alpine
```

Open `http://localhost:8080` in your browser. The mapping means **your computer's port 8080 → the container's port 80**. The explicit `127.0.0.1` host address is intended for local access.

`-d` runs in the background. `--name` gives you a name to use in later commands. The image tag is readable but may move over time.

```cli
docker ps
docker logs --tail 30 learning-web
docker stop learning-web
docker rm learning-web
```

Read logs when a container fails. Stop ends its service; rm removes the stopped container and its writable layer. Use `docker ps -a` to see exited containers too.

If the name is already taken, an old stopped container may still exist. Inspect it before removing it. If port 8080 is busy, choose a different **host** port, for example `127.0.0.1:8081:80`.

**Try it:** the Docker mapping exercise checks that you publish the right ports with a local binding. It does not download or run Docker in your browser.

@@ keep-data|docker|Where container data lives|Know what survives before cleaning up.
A container's ordinary writable layer belongs to that container. Removing the container removes that layer. A **named volume** can hold data independently. A **bind mount** makes a folder from your computer visible inside a container.

| Use case | Usual choice |
|---|---|
| Edit source on your computer and see it inside a container. | Bind mount. |
| Keep database data while replacing its container. | Named volume. |

A volume surviving container removal does not make it a backup. A bad database command or deliberate volume deletion can still destroy data.

With a Compose project:

```cli
docker compose ps
docker compose stop
docker compose start
```

`stop` keeps existing containers. `start` starts those same stopped containers. `docker compose down` removes project containers and usual networks while keeping named volumes by default.

**Do not confuse that with `docker compose down -v`:** the volume-removal option can delete the database data. It is a deliberate reset, not an everyday “restart” command.

Inside a container, `localhost` means that container. Another Compose service is commonly reached by its service name, such as `db`. The next lesson introduces the full working example.

@@ compose-basics|docker|Use a Compose project|One file describes related containers.
A `compose.yaml` describes services, their images or builds, ports, configuration, and storage. Run Compose from the intended project folder.

```cli
docker compose config --quiet
docker compose up -d
docker compose ps
docker compose logs --tail 50
```

Validate first, start services, inspect state, then read logs. In projects with a Dockerfile build, `docker compose up -d --build` also rebuilds as needed. Restarting an old container is not the same as recreating it from updated configuration.

The included [PostgreSQL + Adminer example](examples/compose-practice/compose.yaml) is explained completely in **Advanced → Docker Compose**. Adminer's web UI connects to the database using the service name `db`; the data lives in a named volume.

The demo has explicit disposable credentials. Do not reuse those values for real services or publish real secrets. A `.env` file being hidden does not protect it from accidental copying or committing.

A healthy dependency check can help with startup ordering; the app still needs to handle later dependency failures. “The container is running” and “the service is ready to answer requests” are different states.

## A Dockerfile is a different file

It describes how to build an image. Compose describes how to run related services. Learn that distinction before copying a large configuration you cannot explain.

@@ cloud-context|gcloud|Account, project, configuration|Three checks before doing anything in Google Cloud.
`gcloud` is Google's command-line tool for Google Cloud. Install it using the official instructions for your operating system, then check:

```cli
gcloud version
gcloud auth list
gcloud config list
```

**Account:** whose identity the CLI uses. **Project:** which resource container you are targeting. **Configuration:** a named group of settings such as account, project, and default region.

A project has an ID, a display name, and a numeric project number. Commands expecting a project ID need the actual ID, not an approximate display name.

```cli
gcloud config get-value project
gcloud config configurations list
```

These inspection commands do not create a VM or deploy an application. Authentication, API availability, and permissions can still affect what you can list.

**A useful first habit:** say out loud which account and project a command will use. An account with permission to access a project is not necessarily the account you intended to use today.

The practice area includes a fictional cloud context. You can learn to select and verify it without signing into Google or creating billable resources.

Official reference: [gcloud configurations](https://docs.cloud.google.com/sdk/docs/configurations).

@@ cloud-login|gcloud|CLI sign-in versus application sign-in|Avoid a common source of local-development confusion.
When you choose to authorize your local CLI:

```cli
gcloud auth login
```

This starts an authorization flow and stores credentials for gcloud. Use the intended account and follow your organization's rules. Do not paste login codes, credential files, or tokens into a public issue.

Your own program using Google client libraries may instead need **Application Default Credentials (ADC)** for local development:

```cli
gcloud auth application-default login
```

This is a separate credential setup, not simply a synonym for the first command. It can replace the previously generated local ADC credentials. Use it when your application's documented setup calls for ADC.

| You are troubleshooting… | First concept to inspect |
|---|---|
| A gcloud CLI command. | gcloud's active account, config, and command overrides. |
| Your local application using Google libraries. | Its actual credential discovery, ADC, and project/quota configuration. |

Being logged into a Google website is another separate session. It does not prove the CLI or your application uses that same identity.

For cloud-hosted workloads, follow the platform's recommended identity approach. Do not make long-lived downloaded service-account keys your default workaround.

Official references: [CLI login](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login), [ADC login](https://docs.cloud.google.com/sdk/gcloud/reference/auth/application-default/login).

@@ cloud-config|gcloud|Keep work contexts separate|Make it harder to use yesterday's project by mistake.
Named configurations let you keep different projects and identities together. These commands change **local CLI defaults**, not IAM permissions or cloud resource ownership.

```cli
gcloud config configurations create learning
gcloud config set project YOUR_PROJECT_ID
gcloud config set account YOUR_AUTHORIZED_ACCOUNT
gcloud config configurations list
```

Replace both placeholders with real authorized values. Creating a configuration normally activates it. Selecting an account does not authorize a new one; it needs valid credentials.

To revisit a configuration:

```cli
gcloud config configurations activate learning
gcloud config get-value project
gcloud auth list
```

A command-line flag can override a saved default for one call:

```cli
gcloud projects describe YOUR_PROJECT_ID --format=json
```

For commands that support it, `--project=YOUR_PROJECT_ID` is useful when you want the target visible in the command. Other overrides, environment variables, and impersonation can affect the effective context too.

**Try it:** activate the simulated learning configuration, set `guide-sandbox`, then inspect the result. Success requires verification as well as changing the setting. That project ID is fictional in the exercise.

Official reference: [gcloud configurations](https://docs.cloud.google.com/sdk/docs/configurations).

@@ cloud-inspect|gcloud|Read resources before changing them|A small read-first command set.
After confirming identity and project, start with inspection. These are independent examples; not every project uses each service.

```cli
gcloud projects list
gcloud services list --enabled --project=YOUR_PROJECT_ID
gcloud compute instances list --project=YOUR_PROJECT_ID
gcloud run services list --project=YOUR_PROJECT_ID --region=YOUR_REGION
gcloud storage ls gs://YOUR_BUCKET
```

Replace placeholders and use only resources you are authorized to inspect. These commands list or read resources; they do not deploy a VM or a Cloud Run service. Listing can still require APIs, permissions, and network access. API and network usage can have service-specific cost implications.

**Do not turn an inspection failure into broad new privileges.** “Permission denied” may mean a wrong account or project. An API-disabled error and an IAM-denied error have different remedies.

Before learning create, deploy, delete, or IAM mutation commands, know the target, expected changes, potential cost, and cleanup plan. Budget alerts can notify you about spend; they are not automatically hard spending caps.

The Advanced gcloud section explains filters, formats, logs, credential troubleshooting, and explicit context. This handbook does not create or deploy anything in your cloud account.

Official references: [gcloud reference](https://docs.cloud.google.com/sdk/gcloud/reference), [budgets and alerts](https://docs.cloud.google.com/billing/docs/how-to/budgets).

@@ windows-shell|windows-advanced|PowerShell is its own language|Why a Unix alias does not make Unix flags portable.
PowerShell commands commonly follow a Verb-Noun pattern: Get-ChildItem, Set-Location, Copy-Item. Windows PowerShell 5.1 and newer PowerShell 7 have differences; this guide's core examples use common syntax, with version-specific features labeled.

`ls` can be an alias for Get-ChildItem on Windows. That does not make `ls -lah` a native PowerShell equivalent. `curl` can refer to Invoke-WebRequest in Windows PowerShell 5.1; `curl.exe` explicitly calls the curl executable when installed. Use Get-Command to inspect what a name resolves to.

```windows
Get-Command ls
Get-Command curl
Get-Help Get-ChildItem -Examples
$PSVersionTable.PSVersion
```

PowerShell pipelines usually pass objects rather than only text. This lets you select properties and filter records:

```windows
Get-Process | Sort-Object CPU -Descending | Select-Object -First 5 Name, Id, CPU
```

CPU here is accumulated process CPU time, not an instantaneous utilization percentage. Unix text-processing assumptions do not automatically apply to object pipelines.

Use `-LiteralPath` for a literal filename when a parameter otherwise interprets wildcards. Use `-WhatIf` for a supported change preview and `-Confirm` to request a confirmation. Neither option makes an incorrectly selected target correct.

Documentation: [PowerShell overview](https://learn.microsoft.com/en-us/powershell/scripting/overview), [Get-ChildItem](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-childitem).

@@ windows-env|windows-advanced|Windows paths and environment|Use native paths and understand what changes your session.
Your home is normally under `C:\Users\NAME`. Paths can contain spaces; quote them. `$HOME` is a PowerShell variable. `$env:USERPROFILE` is an environment variable value. Unix `export NAME=value` is not PowerShell syntax.

```windows
$project = Join-Path $HOME 'Projects\My App'
$env:APP_MODE = 'development'
$env:PATH -split ';'
Get-Command git
```

A process-level environment assignment affects this shell and later children. It does not rewrite every already-running program's environment, and it is not automatically a persistent user-wide setting. For persistent changes, use your team's supported setup and reopen the appropriate terminal.

To read JSON as structured data:

```windows
$config = Get-Content -LiteralPath config.json -Raw | ConvertFrom-Json
$config.name
```

This requires an existing trusted configuration file. Reading JSON as data differs from executing a script. Do not use Invoke-Expression as an ordinary way to process external text.

In PowerShell, `$LASTEXITCODE` records many native executable exit codes; `$?` is a success Boolean for the previous operation. A native command's nonzero exit status is not handled exactly like a PowerShell cmdlet error in every version. In scripts, check the native exit code or use a documented compatible error-handling policy.

Documentation: [environment variables](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_environment_variables).

@@ windows-tools|windows-advanced|Windows processes, HTTP, and WSL|Know which environment a command is actually running in.
```windows
Get-Process
Get-NetTCPConnection -LocalPort 8000 -State Listen
Get-Command git
curl.exe -I https://example.com
```

Get-NetTCPConnection is a Windows networking cmdlet; availability and permissions depend on your Windows environment. Inspect its OwningProcess with Get-Process before stopping anything. `Stop-Process -Id PID -Confirm` requests termination of that selected Windows process; it is not a Unix signal interface and can interrupt writes.

Use `Invoke-RestMethod -Uri URL` for many structured API tasks, and `curl.exe` when you intend curl's documented flags. Do not paste real tokens into shared history or screenshots.

**Git Bash** supplies a Bash/Unix-style environment with Git for Windows. **WSL** supplies a Linux environment. **PowerShell** is another shell. Select this guide's Linux tab for a Linux shell in WSL; select Windows for native PowerShell. A Windows path like `C:\Users\NAME` is commonly represented as `/mnt/c/Users/NAME` inside WSL, while Linux-native project paths have their own filesystem and permissions.

Docker Desktop integrations can expose the engine to supported WSL distributions. Inspect the selected Docker context when a command reaches the wrong or unavailable engine. A file mounted into a container, a WSL path, and a Windows host path are related but not interchangeable strings.

Documentation: [WSL overview](https://learn.microsoft.com/en-us/windows/wsl/about), [Get-NetTCPConnection](https://learn.microsoft.com/en-us/powershell/module/nettcpip/get-nettcpconnection).

@@ linux-tools|linux-advanced|Linux-specific development tasks|Do not substitute macOS instructions for your distribution's tools.
Linux distributions differ. Ubuntu/Debian commonly use apt, Fedora uses dnf, and Alpine uses apk. Inspect distribution information before following package instructions:

```linux
cat /etc/os-release
command -v git
ss -ltnp
```

Do not install or upgrade every package merely to fix one missing development tool. Use your distribution's official instructions and project runtime requirements. Elevated package-management commands change the machine, not just the current project.

Many server distributions use systemd. On those systems, read-first service inspection can include:

```linux
systemctl status SERVICE
journalctl -u SERVICE -n 50 --no-pager
```

Replace SERVICE with a known service. These commands are not universal across all containers, WSL setups, or minimal Linux distributions. macOS normally uses launchd instead.

For shell examples, check whether you are using Bash, zsh, or another shell. Bash scripts with `[[ ... ]]` are not automatically portable `/bin/sh` scripts. Linux deployments often use case-sensitive filesystems, so match filename case in imports and links even when your laptop lets a mismatch pass.

@@ cloud-advanced|gcloud-advanced|Inspect, filter, format, and troubleshoot|Make your cloud evidence specific and reproducible.
Use `--help` on the specific command group before guessing options. gcloud supports output formats and many commands support filters; properties and filter semantics depend on the resource type.

```cli
gcloud compute instances list --project=YOUR_PROJECT_ID --format='table(name,zone,status)'
gcloud projects describe YOUR_PROJECT_ID --format=json
gcloud logging read 'severity>=ERROR' --project=YOUR_PROJECT_ID --limit=20 --format=json
```

These are read examples, not a sequence that should run for every project. Logs can contain confidential data; inspect and redact before exporting them. Avoid very broad log queries; use bounded time filters and limits when appropriate.

For a wrong-account failure, inspect credentialed accounts and the active configuration. For an application-only failure, inspect its actual credential discovery and ADC rather than repeatedly logging the CLI in again. For permission denied, identify the requested resource and missing permission; do not grant Owner as a debugging shortcut.

Use `--configuration=NAME`, `--account=ACCOUNT`, and `--project=PROJECT_ID` where supported to make intent explicit for one command. These do not eliminate all configuration sources, impersonation, environment overrides, or service-specific billing behavior. A successful read does not imply permission to mutate a resource.

Do not include access tokens or credential-file contents in diagnostic artifacts. Service-account impersonation and workload identity can avoid some long-lived key patterns, but require deliberate IAM setup under your organization's policy.

Documentation: [gcloud topic formats](https://docs.cloud.google.com/sdk/gcloud/reference/topic/formats), [gcloud topic filters](https://docs.cloud.google.com/sdk/gcloud/reference/topic/filters), [authentication](https://docs.cloud.google.com/sdk/docs/authenticate).
