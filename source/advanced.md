@@ start|Start here|Your developer field guide|From your first terminal command to confident everyday development.
You do not need to memorize hundreds of commands. You need a few reliable mental models, the ability to inspect what is happening, and a way to recover when something goes wrong. This handbook teaches those habits using macOS and its usual shell, **zsh**.

**Audience:** someone who knows `cd` and wants to become comfortable working on real software. **Scope:** practical command-line development, substantial Git coverage, Docker fundamentals, project organization, and clear technical communication. This is an A–Z working reference, not a catalog of every Unix utility.

## How to use this handbook

1. Read the Terminal and Files chapters first. Run the practice examples in a new practice folder.
2. Learn Git in order: mental model → daily work → branches → remotes → recovery. Rebase and cherry-pick make much more sense after branches do.
3. Work through the local Git laboratory. It creates its own temporary repository and does not contact a remote.
4. Read Docker after processes, ports, and paths. Those concepts explain most Docker surprises.
5. Return to the scenario cookbook and A–Z command finder during real work.

Use the sidebar search for phrases such as **wrong branch**, **port**, **cherry-pick**, or **permission denied**. Search filters chapters and shows matching excerpts; the A–Z finder has its own filter. Copy buttons copy code as text; **nothing in this guide runs a command on your computer**. Print / PDF prints the complete guide, including collapsed answers and search-hidden chapters.

## The conventions in examples

| What you see | What it means |
|---|---|
| `pwd` | A command you can type, then press Return. |
| A block labeled **Terminal** | Commands for your terminal. Read the surrounding setup first. |
| A block labeled **Output / diagram / file** | An explanation or file contents; do not paste it as a command. |
| `COMMIT_ID`, `BRANCH`, `HOST` | Replace with an actual value; these are not magic Git words. |
| `# explanation` | A comment in a script. See the zsh note below before pasting annotated blocks. |
| `main`, `origin`, `feature/search` | Example names. Your repository may use different names. |
| `…` in a diagram | Details omitted. It is not a shell command. |

**zsh comment setup:** in an interactive zsh terminal, run `setopt interactivecomments` once for that session if you want to paste blocks containing `#` comments. Shell scripts already support comments. The guide uses prompt-free examples, so you never need to type `$` or `%` prompt symbols.

**Examples versus recipes:** command tables are alternatives to look up, not sequences to run from top to bottom. A procedure explicitly states its starting conditions. Commands that delete, overwrite, or rewrite history carry a nearby consequence note. Remote examples teach collaboration; do not run them where your organization or project prohibits remote changes.

## Your first 15 commands

| Command | Why it matters |
|---|---|
| `pwd` | Know where you are. |
| `ls -lah` | See files, hidden files, permissions, and sizes. |
| `cd DIRECTORY` | Move to a folder. |
| `mkdir -p DIRECTORY` | Create folders, including missing parents. |
| `cp -i SOURCE DESTINATION` | Copy with an overwrite prompt. |
| `mv -i SOURCE DESTINATION` | Move or rename with an overwrite prompt. |
| `less FILE` | Read without editing; press `q` to leave. |
| `man COMMAND` | Read the manual; press `q` to leave. |
| `grep -n 'text' FILE` | Find matching lines with their numbers. |
| `find . -type f -name '*.py'` | Find Python files below the current folder. |
| `git status` | See your current Git situation. |
| `git diff` | Review unstaged changes to tracked files. |
| `git add FILE` | Stage a specific file's current contents. |
| `git commit -m "Describe the change"` | Save the staged snapshot locally. |
| `docker ps` | See running containers, once Docker is installed and running. |

## A 14-day learning route

| Days | Focus | You are ready to move on when… |
|---|---|---|
| 1–2 | Terminal, paths, navigation | You can explain absolute and relative paths. |
| 3–4 | Files, text, pipes, search | You can find a log message without opening every file. |
| 5 | Environment, permissions, processes | You can identify what owns a port. |
| 6 | Project structure, scripts, comments | Someone else can follow your README. |
| 7–8 | Git model and daily commits | You can explain what is staged and what is committed. |
| 9–10 | Branches, remotes, pull requests | You can open a small reviewable change. |
| 11 | Merge, rebase, cherry-pick | You can draw how each changes history. |
| 12 | Recovery and the Git lab | You can recover a committed change using reflog. |
| 13 | Docker images and containers | You can start, inspect, and stop a local container. |
| 14 | Compose and troubleshooting | You can explain where a database's data survives. |

The schedule is a suggestion. Repeating one small lab is more useful than skimming five advanced chapters.

@@ terminal|Unix & macOS|01 · Understand the terminal|The difference between your Mac, the shell, and the commands you type.
## macOS, Unix, Linux, Terminal, and zsh

**macOS** is your operating system. It has Unix foundations and provides many familiar Unix tools. **Linux** is a different operating-system kernel used by many distributions, such as Ubuntu. Commands often overlap, but their options and system administration tools can differ.

**Terminal** is an application that displays a text session. A **shell** reads your input, expands things such as `~` and `*`, starts programs, and connects their input and output. On a typical current Mac user account, that shell is **zsh**. Bash is another shell; a Bash script is not automatically a zsh script.

```diagram
YOU type a command
       ↓
Terminal / your editor's terminal panel
       ↓
zsh interprets quotes, variables, pipes, and wildcards
       ↓
A built-in command OR an executable program
       ↓
macOS: files · processes · network · permissions
```

## Read a command before you run it

```terminal
ls -lah ~/Downloads
```

| Piece | Meaning |
|---|---|
| `ls` | Command name: list directory contents. |
| `-l` | Long format: more detail. |
| `-a` | Include names beginning with a dot. |
| `-h` | Human-readable sizes. |
| `~/Downloads` | An argument: which directory to list. |

Short flags can often be combined, as in `-lah`, but not every program uses the same flag conventions. A long flag such as `--help` is readable, but some macOS utilities do not support it. Use `man ls` for the installed command's actual options.

The shell may show a prompt such as `you@MacBook project %`. That is context, not part of the command. When a tutorial shows `$ pwd`, type only `pwd`.

## First session

```terminal
pwd
whoami
sw_vers
uname -m
printf '%s\n' "$SHELL"
ps -p $$ -o comm=
```

`pwd` prints your current directory. `whoami` prints your user name. `sw_vers` prints macOS version information. `uname -m` typically shows `arm64` on Apple silicon or `x86_64` on Intel. `$SHELL` usually records your configured login shell; the `ps` command helps identify the shell process actually running now.

A successful command may print **nothing**. Silence is common for commands that create, copy, or move files. Inspect with `ls` or `git status` rather than repeating a command because it was quiet.

## Keyboard skills that save time

| Keys | Effect |
|---|---|
| Tab | Complete a command or path; press again for choices. |
| Up / Down | Revisit previous commands. Inspect before pressing Return. |
| Control-C | Interrupt a foreground program; often cancel unfinished input. |
| Control-D | End input; at an empty shell prompt it may close the shell. |
| Control-A / Control-E | Move to the beginning / end of the line in common default key bindings. |
| Control-U / Control-K | Clear text before / after the cursor in common shell editing modes. |
| Control-R | Search command history interactively in common configurations. |
| Control-L | Redraw or clear the visible terminal display. |
| Command-C / Command-V | Copy / paste on macOS; Command-C is different from Control-C. |
| `q` | Leave pagers such as `less` and most `man` displays. |

Key bindings can be customized. If a shortcut differs on your machine, check Terminal settings and your shell configuration.

If you see a continuation prompt such as `quote>` or `dquote>`, you probably left a quote open. Control-C cancels that unfinished command. A trailing backslash also continues input onto the next line; it must be the last character on that line, with no spaces after it.

## Getting help effectively

```terminal
man cp
man git-log
git help cherry-pick
command -v git
type cd
type -a python3
```

`command -v` finds how a command resolves. `type` can reveal aliases, functions, built-ins, and executable paths. In `man`, type `/pattern` to search, `n` for the next match, and `q` to quit. Read an error before searching the web: it often names the missing file, invalid flag, or permission issue exactly.

**Checkpoint:** explain the difference between “Terminal is open” and “a Python server is running in Terminal.” Terminal is the interface; the server is a separate process launched through the shell.

Official references: [Apple Terminal User Guide](https://support.apple.com/guide/terminal/welcome/mac), [zsh shell grammar](https://zsh.sourceforge.io/Doc/Release/Shell-Grammar.html).

@@ paths|Unix & macOS|02 · Paths and the filesystem|Understand where a command will act before you let it change anything.
## The filesystem is a tree

```diagram
/                              root of the filesystem
├── Applications/              installed Mac applications
├── System/                    operating-system files
├── Library/                   machine-wide support files
├── Users/
│   └── YOUR_NAME/             your home directory: ~
│       ├── Desktop/
│       ├── Documents/
│       ├── Downloads/
│       ├── Library/           your user-specific app data
│       ├── Projects/          a folder you can create
│       ├── .zshrc             hidden shell configuration
│       └── .ssh/              SSH keys and configuration
├── opt/homebrew/              common Apple silicon Homebrew prefix
├── usr/local/                 common Intel Homebrew prefix
└── private/tmp/               temporary files; not permanent storage
```

Your actual Mac has more entries, and some visible paths point elsewhere. For example, `/tmp` usually points to `/private/tmp`. A path beginning with `/` starts at the filesystem root. A path beginning with `~` starts at your home directory after shell expansion. **Root directory `/` and the administrator user `root` are different concepts.**

On Linux you commonly see `/home/USER` instead of `/Users/USER`, and server configuration under `/etc` and logs under `/var/log`. macOS has related Unix paths but also Apple-specific services and its unified logging system. Do not apply a Linux disk-management tutorial to your Mac without checking the platform.

## Absolute and relative paths

Suppose `pwd` prints `/Users/you/Projects/shop`:

| Path | Resolves to |
|---|---|
| `src/app.py` | `/Users/you/Projects/shop/src/app.py` |
| `./src/app.py` | The same file; `.` means the current directory. |
| `../notes.txt` | `/Users/you/Projects/notes.txt`; `..` means parent. |
| `/Users/you/notes.txt` | That exact absolute path, regardless of the current directory. |
| `~/Downloads` | Your account's Downloads directory. |
| `-` as an argument to `cd` | The previous working directory; not a general path abbreviation. |

```terminal
pwd
ls
ls -lah
cd ~
cd ~/Downloads
cd ..
cd -
```

`cd` with no arguments returns home. `cd ..` moves one level up. `cd ../..` moves two. `cd -` is particularly useful when bouncing between two project directories.

## Spaces, quotes, and case

```terminal
cd "$HOME/Documents"
mkdir -p "$HOME/Projects/terminal-practice"
cd "$HOME/Projects/terminal-practice"
mkdir -p 'My Notes'
ls -ld 'My Notes'
```

A space separates arguments unless quoted or escaped. `My Notes` without quotes is two arguments. `'My Notes'` is one. A backslash also escapes a character: `My\ Notes` is one path.

`'~/Documents'` does **not** expand `~`, because it is quoted. Prefer `"$HOME/Documents"` when combining a variable and a path with spaces. Double quotes allow `$HOME` to expand; single quotes keep the contents literal.

Many Mac installations use a case-insensitive filesystem, while Linux deployment environments commonly use case-sensitive filesystems. Treat `README.md` and `readme.md` consistently. A case-only rename can be made through an intermediate name using `git mv`, as the Git scenarios chapter shows.

## Hidden files, symlinks, and extensions

A leading dot makes an entry hidden from a plain `ls`; `ls -a` shows it. `.git`, `.env`, and `.zshrc` are important examples. Hidden does not mean encrypted or protected.

A **symbolic link** is a path that points to another path. Inspect one with `ls -l`. Do not assume a symlink is a separate copy of data.

```terminal
file README.md
ls -ld .
ls -l /tmp
```

`file` inspects file type rather than trusting a filename extension. The name `data.txt` does not guarantee text contents. A folder named `.git` or a `.git` file in a worktree is Git metadata; do not edit its internals manually as a beginner.


## More filesystem names you will encounter

| Path | Role | Mac / Linux note |
|---|---|---|
| `/bin`, `/usr/bin` | Executable programs supplied by the system. | Layout and implementation vary; do not replace system tools casually. |
| `/sbin`, `/usr/sbin` | System administration programs. | Commands and permissions vary by platform. |
| `/etc` | Machine configuration. | On macOS, commonly maps into `/private/etc`. |
| `/var` | Variable system data such as logs and caches. | On macOS, commonly maps into `/private/var`. |
| `/dev` | Device-related special files. | `/dev/null` discards writes and returns end-of-file on reads. |
| `/proc` | Process/kernel information on many Linux systems. | Not a normal macOS filesystem interface. |
| `/Volumes` | Common macOS mount location for external disks. | Linux mount locations differ. |
| `~/Library` | Your Mac account's application support and settings. | Not the same as the machine-wide `/Library`. |

You can make a symbolic link with `ln -s TARGET LINK_NAME` when the link name is unused. A relative target is interpreted relative to the link's containing directory, not wherever you later run a command. Removing the link removes the reference; it does not mean you removed the target's data. Inspect links and command arguments carefully, especially trailing slashes, before any recursive operation.

On macOS, `open .` opens the current folder in Finder, and dragging a Finder item into Terminal helps insert its path. `printf '%s' 'hello' | pbcopy` copies text to the clipboard, while `pbpaste` prints clipboard contents. These are Mac conveniences rather than portable Linux commands.

## Find folders without guessing

```terminal
find "$HOME/Projects" -type d -name '*shop*'
find . -type f -name '*.md'
find . -maxdepth 2 -type d
```

The quoted `*.md` is passed to `find`, which performs its own name matching. Without quotes, your shell may expand it too early. If an option from an online example is rejected, consult `man find`; BSD/macOS and GNU/Linux versions are not identical.

**Practice:** from your practice folder, create `docs/drafts`, enter it, return with `cd ../..`, and verify with `pwd`. Predict the answer before running the command.

@@ files|Unix & macOS|03 · Create, copy, move, delete|Small commands can make large changes. Learn the boundaries first.
## A contained practice directory

This block creates a separate temporary folder and prints its location. Keep that terminal open while doing the exercises in this chapter. Temporary folders may be removed later by the operating system.

```terminal
practice_dir=$(mktemp -d /tmp/terminal-practice.XXXXXX)
cd "$practice_dir"
pwd
mkdir -p notes drafts archive
printf '%s\n' 'First note' > notes/today.txt
ls -R
```

`mktemp -d` chooses an unused directory. `practice_dir` is your own shell variable. `mkdir -p` creates parent directories if needed and accepts existing directories. `printf` writes predictable text; `>` sends that output to a file, replacing that file if it already exists.

## Everyday file operations

| Command | Meaning | Important detail |
|---|---|---|
| `touch notes/tomorrow.txt` | Create an empty file if missing. | If it exists, update its timestamps; do not erase its contents. |
| `cp -i notes/today.txt drafts/today.txt` | Copy a file. | `-i` asks before overwriting. |
| `cp -R notes archive/notes-copy` | Copy a directory recursively. | Destination existence changes nesting; inspect it first. |
| `mv -i drafts/today.txt drafts/review.txt` | Rename a file. | Moving across directories uses the same command. |
| `mkdir -p a/b/c` | Create nested directories. | Safe to repeat when they already exist. |
| `rmdir EMPTY_DIRECTORY` | Remove an empty directory. | Fails if it contains anything. |
| `rm -i drafts/review.txt` | Delete a file with a prompt. | Does not put it in Finder's Trash. |
| `rm -r DIRECTORY` | Delete a directory and contents. | Recursive deletion; inspect the exact target first. |

**Deletion consequence:** `rm` is generally permanent from the terminal's point of view. Git can help with committed files, but it cannot reliably recover untracked or never-saved work. Backups still matter. Avoid `rm -rf` as a reflex; `-f` suppresses prompts and certain errors, which makes a wrong target harder to notice.

Before recursive deletion, use `pwd`, `ls -ld TARGET`, and `find TARGET -maxdepth 2 -print` to inspect the boundary. Do not practice recursive deletion on your home, system, or actual project directories.

## Wildcards are expanded by the shell

| Pattern | Meaning |
|---|---|
| `*.txt` | Names ending in `.txt` in the current directory. |
| `file?.txt` | Names with exactly one character where `?` appears. |
| `[abc]*` | Names beginning with `a`, `b`, or `c`. |
| `**/*.py` in zsh | Recursive matching for Python paths. |

Plain `*` generally excludes dotfiles. In default zsh, an unmatched wildcard commonly produces `no matches found` rather than passing the literal text to the program. This is one reason commands copied from Bash tutorials can behave differently.

```terminal
printf '%s\n' notes/*.txt
```

This prints the matches so you can check them. Shell expansion happens **before** `cp`, `mv`, or `rm` runs. A program cannot protect you from a broad pattern you accidentally handed to it.

## Inspect size, type, and differences

```terminal
file notes/today.txt
wc -l notes/today.txt
du -sh .
df -h .
diff -u notes/today.txt archive/notes-copy/today.txt
```

`du` estimates disk usage of paths. `df` reports filesystem capacity. `wc -l` counts newline characters, which usually corresponds to lines in ordinary text files. `diff -u` compares two files and returns a nonzero status when they differ; a nonzero status is not always an unexpected failure.

## Archive without losing the folder structure

```terminal
tar -czf practice-backup.tar.gz notes drafts
tar -tzf practice-backup.tar.gz
mkdir extracted
tar -xzf practice-backup.tar.gz -C extracted
```

For `tar`: `c` creates, `x` extracts, `t` lists, `z` uses gzip, and `f` names the archive file. List an unfamiliar archive before extracting it, and extract into a new folder because existing files can be overwritten. ZIP alternatives: `zip -r notes.zip notes` and `unzip -l notes.zip` to list contents.

**Checkpoint:** explain why `cp file folder/` requires that you understand whether `folder` exists, and why `rm` is different from moving a file into Trash.

@@ text|Unix & macOS|04 · Read, search, and transform text|Find the evidence you need without opening every file by hand.
## Read large files comfortably

| Command | Use |
|---|---|
| `cat README.md` | Print a small file. |
| `less app.log` | Page through a large file without editing. |
| `head -n 20 app.log` | First 20 lines. |
| `tail -n 50 app.log` | Last 50 lines. |
| `tail -f app.log` | Follow appended lines; Control-C stops following. |
| `tail -F app.log` | Follow by name and retry, useful for log rotation. |
| `wc -l app.log` | Count lines. |

In `less`, use Space to advance, `b` to go back, `/error` to search, `n` for next, `g` for the beginning, `G` for the end, and `q` to leave. `cat` is for displaying, not editing; sending a huge binary file to your terminal is rarely useful.

## Create reproducible sample data

Run this inside your temporary practice folder. It creates or overwrites **only** `app.log` there.

```terminal
cat > app.log <<'EOF'
INFO server started
ERROR database timeout
INFO retry requested
WARN slow response
ERROR database timeout
ERROR missing token
EOF
```

A **here-document** feeds the lines between `<<'EOF'` and `EOF` into a command. Quoting the delimiter prevents variable and command expansion inside the body. The closing `EOF` must appear alone on its line.

## Search file contents

```terminal
grep -n 'ERROR' app.log
grep -ni 'error' app.log
grep -n -C 1 'timeout' app.log
grep -v 'INFO' app.log
grep -E 'ERROR|WARN' app.log
grep -F 'database timeout' app.log
```

`-n` prints line numbers, `-i` ignores case, `-C 1` includes one surrounding line on each side, `-v` inverts the match, `-E` enables extended regular expressions, and `-F` treats the pattern as literal text. A regular expression is a pattern language: `.` can mean any character, `^` the beginning of a line, and `$` the end. Use `-F` when you want literal punctuation rather than pattern interpretation.

`grep` exit statuses are useful: 0 means a match was found, 1 means no match, and values above 1 indicate an error. “No matches” is often a valid result.

For source trees, **ripgrep** (`rg`) is an optional fast tool that normally respects ignore files and skips hidden files:

```terminal
rg -n 'timeout' src
rg -n -i 'todo|fixme' .
rg --files -g '*.py'
rg --hidden -g '!.git' 'DATABASE_URL' .
```

Install it only if desired with `brew install ripgrep` after Homebrew is installed. Use `grep -R -n 'timeout' src` when `rg` is not available. `find` searches **names and metadata**; `grep` and `rg` search **contents**.

## Pipes: small tools working together

```terminal
grep 'ERROR' app.log | sort | uniq -c | sort -nr
```

```diagram
app.log
   │ grep 'ERROR'     keep error lines
   ▼
error lines
   │ sort             put identical lines next to one another
   ▼
grouped lines
   │ uniq -c          count adjacent identical lines
   ▼
counts
   │ sort -nr         numerical order, highest first
   ▼
most frequent error messages
```

`uniq` only combines adjacent duplicates. That is why sorting first matters. If timestamps or request IDs differ, the full lines are different; normalize or extract a stable message before counting.

## Useful transformations

```terminal
cut -d ' ' -f 1 app.log
awk '{print $1}' app.log
sed -n '2,4p' app.log
sed 's/ERROR/FAILURE/g' app.log
sort app.log
```

`cut` extracts delimited fields. `awk` splits whitespace fields by default and can do calculations. `sed -n '2,4p'` prints a line range. The substitution example prints changed output; **it does not edit the file** without an in-place flag or redirection. Do not use `sed ... file > file`; the shell can truncate the input file before `sed` reads it.

For in-place editing, macOS commonly uses `sed -i '' 's/old/new/g' FILE`, while GNU sed accepts `sed -i 's/old/new/g' FILE`. Both overwrite the target; start with non-editing output, review it, and keep a backup when the change matters.

For JSON, install optional `jq` and use structured queries instead of trying to parse JSON with regex:

```terminal
printf '%s\n' '{"name":"Ada","active":true}' | jq '.name'
printf '%s\n' '{"name":"Ada"}' | jq -r '.name'
```

`-r` gives a raw string rather than a quoted JSON string. A pipeline is a dataflow, not a guarantee that every stage succeeded; the scripting chapter explains `pipefail`.

@@ shell|Unix & macOS|05 · Shell syntax, variables, and PATH|Understand the shell's work before the program even starts.
## Quotes prevent surprising interpretation

```terminal
project_name='My App'
printf '%s\n' "$project_name"
printf '%s\n' '$project_name'
printf '%s\n' "Today is $(date +%F)"
```

The first print expands the variable; the second prints the literal characters `$project_name`. `$(...)` runs a command and substitutes its output, removing trailing newlines. A variable assignment has **no spaces** around `=`. `project_name = value` tries to run a command named `project_name`.

Use double quotes around path variables: `cd "$project_dir"`. This is a good habit across zsh and Bash, even though their default rules for unquoted scalar splitting differ. Quote patterns intended for tools: `find . -name '*.txt'`.

**Never paste unknown command substitutions into your shell.** A string that looks like text may execute code when it contains `$(...)` or backticks. Avoid `eval` for ordinary development tasks; it adds another interpretation pass.

## Output streams and redirection

```diagram
                     ┌── stdout (1) → normal output
stdin (0) → PROGRAM ─┤
                     └── stderr (2) → diagnostics / errors
```

| Syntax | Meaning | Consequence |
|---|---|---|
| `command > output.txt` | Send stdout to a file. | Creates or truncates that file. |
| `command >> output.txt` | Append stdout. | Keeps previous contents. |
| `command 2> errors.txt` | Send stderr to a file. | Creates or truncates that file. |
| `command > all.log 2>&1` | Send stdout and stderr to the same destination. | Order matters. |
| `command < input.txt` | Read stdin from a file. | The command receives file data as input. |
| `a | b` | Connect stdout of `a` to stdin of `b`. | stderr is separate by default. |
| `command > /dev/null` | Discard stdout. | stderr remains visible. |

`command 2>&1 > output.txt` is different: stderr is first connected to the **old** stdout destination, then stdout changes. Redirections are evaluated left to right.

## Exit status and command lists

```terminal
ls .
printf 'Exit status: %s\n' "$?"
```

`$?` is the previous command's numeric exit status. Zero usually means success; nonzero values carry command-specific meanings. Read it immediately because the next command replaces it.

| Pattern | Meaning |
|---|---|
| `a && b` | Run `b` only if `a` succeeds. |
| `a || b` | Run `b` only if `a` fails. |
| `a; b` | Run `b` after `a`, regardless of its status. |
| `command &` | Start a background job. |

Use `mkdir -p demo && cd demo` when you want to enter the directory only if creation succeeded. Avoid `a && b || c` as a substitute for a proper if/else when `b` can fail: `c` may run because either `a` or `b` failed.

## Environment variables

```terminal
APP_MODE=development
printf '%s\n' "$APP_MODE"
export APP_MODE
APP_MODE=test python3 --version
unset APP_MODE
```

A shell variable exists in the shell. `export` makes it available to subsequently launched child processes. `NAME=value command` sets a value for that one command. A child process cannot normally modify its parent's environment; this explains why running a script differs from sourcing it.

An `.env` file is a convention, not a feature that every program automatically reads. Docker Compose, a web framework, and a shell may interpret it differently. `source .env` executes its contents as shell code; only do that for a trusted, shell-compatible file. Do not dump your entire environment into tickets or screenshots because it may contain secrets.

## PATH: why “command not found” happens

```terminal
printf '%s\n' "$PATH" | tr ':' '\n'
command -v python3
type -a git
```

`PATH` is a colon-separated list of directories searched for command names. The first suitable match usually wins. That is how two installations of Python can lead to different behavior in different terminals.

```diagram
you type: git
      ↓
shell checks its command-resolution rules
      ↓
PATH directories, in order
      ├── /opt/homebrew/bin/git   ← first executable match wins
      └── /usr/bin/git
```

To add your own executable directory for the current session:

```terminal
export PATH="$HOME/bin:$PATH"
```

For interactive zsh settings and aliases, `~/.zshrc` is a common location. Login-shell environment initialization often uses `~/.zprofile`. Follow your tool's actual installation instructions rather than pasting the same PATH modification into every file. Inspect a configuration file before editing it, and open a new terminal to verify the result. `source ~/.zshrc` executes the file immediately and may repeat side effects.

## Aliases and functions

```terminal
alias ll='ls -lah'
function croot() { cd "$HOME/Projects"; }
```

These affect the current shell session. Save them in `.zshrc` if you want future interactive sessions to use them. Aliases are convenience shortcuts, not a reliable dependency for shared scripts. Keep destructive commands explicit rather than hiding them in clever aliases.

Official reference: [zsh grammar and command interpretation](https://zsh.sourceforge.io/Doc/Release/Shell-Grammar.html).

@@ permissions|Unix & macOS|06 · Permissions and ownership|Understand permission denied before reaching for sudo.
## Read a permission string

```output
-rwxr-xr--  1 anas  staff  420 Oct 30 10:00 run.sh
│└──┬──┘      │     │
│   │         │     └── group
│   │         └──────── owner
│   └────────────────── owner / group / others permissions
└────────────────────── type: - file, d directory, l symbolic link
```

The nine permission characters are three groups: owner, group, others. `r` is read, `w` is write, and `x` is execute. For directories, `x` means traversal/search permission, `r` means listing names, and `w` participates in creating or removing entries. Deleting a file depends importantly on permissions of its containing directory, not only whether the file itself is writable.

## Change only what you intend

```terminal
ls -l run.sh
chmod u+x run.sh
./run.sh
```

`chmod u+x` adds execute permission for the owner. `./run.sh` explicitly refers to a file in the current directory; the current directory is usually not automatically searched through PATH.

| Mode | Meaning | Typical use |
|---|---|---|
| `600` | Owner read/write only. | Private key or sensitive local configuration. |
| `644` | Owner read/write, others read. | Ordinary source or text file. |
| `700` | Owner read/write/execute only. | Private directory. |
| `755` | Owner all, others read/execute. | Executable script or traversable public directory. |

Numbers add `r=4`, `w=2`, `x=1` for each group. `chmod 777` gives everyone all three permissions; it is a poor default fix. `chmod -R` changes an entire tree and can break executable bits or expose data. Do not apply recursive permission changes to your home or system folders to solve one file error.

`chown USER FILE` changes ownership where permitted. It often needs administrative authority; first ask why ownership is wrong. A package installed using unnecessary `sudo` may have created root-owned files in a user project.

## What sudo does

`sudo COMMAND` runs a command with elevated privileges when your account is authorized. It is not a general “make it work” prefix. A password prompt may show no characters at all while you type; that is normal.

Before using it, check: is the target a system resource, is the command from a trusted source, and is elevated access actually required? User project files should normally be writable by your own account. Never solve a dependency installation failure by blindly adding `sudo`.

On macOS, ACLs, file flags, privacy controls, and protected system areas can impose additional restrictions beyond the basic nine permission bits. `ls -le FILE` shows ACL information; “Operation not permitted” can involve macOS privacy settings rather than ordinary Unix permissions.

**Troubleshooting order:** check `pwd` → check `ls -ld TARGET` → verify ownership and exact path → determine whether the operation should be allowed → make the smallest appropriate fix. Avoid changing permissions when the actual problem is a typo or missing file.

@@ processes|Unix & macOS|07 · Processes, ports, and logs|Find what is running and why your application cannot start.
## A process is a running program

A **PID** is a process ID. A program may launch children, listen on network ports, read files, and write logs. The terminal's foreground program receives your input until it exits or you interrupt it.

```terminal
ps aux
pgrep -fl python
top
```

`ps` is a snapshot. `pgrep` finds process IDs by a pattern; `-f` matches the command line, so inspect before taking action. `top` updates continuously; `q` exits. Activity Monitor is a useful graphical companion on macOS.

## Jobs versus processes

```terminal
sleep 120 &
jobs
fg
```

This launches a harmless background sleep, lists jobs in the **current shell**, and brings it back to the foreground. Press Control-C to stop it. Control-Z suspends a foreground job; `bg` resumes a suspended job in the background. A suspended process is still there. `jobs` does not list every process on your Mac.

## Stop the right process

```terminal
ps -p PID -o pid,ppid,command
kill -TERM PID
```

Replace `PID` with the verified numeric ID. `TERM` requests graceful termination, giving the application an opportunity to clean up. `kill -KILL PID` (often written `kill -9 PID`) is a last resort: it cannot be handled by the target process, so cleanup is skipped. Processes can exit and PIDs can be reused; verify before killing.

For a Docker-managed process, prefer `docker stop CONTAINER`, which lets Docker manage the container's lifecycle.

## “Address already in use”

```terminal
lsof -nP -iTCP:8000 -sTCP:LISTEN
```

This asks which process is listening on TCP port 8000. `-nP` avoids hostname and service-name conversion. Inspect the command and PID. Stop your own old development server gracefully, or choose another port. Do not kill an unfamiliar system process just because it owns a port you wanted.

```diagram
Browser → localhost:8000 → listening process
                           ├── correct app? inspect logs
                           ├── old dev server? stop it
                           └── another service? use a different port
```

On many Linux systems you use `ss -ltnp`; macOS does not include `ss` by default. `lsof` is a common Mac-friendly tool for this job.

## Start a local server in a controlled folder

If Python 3 is installed, change into a folder containing only files you intend to serve, then run:

```terminal
python3 -m http.server 8000 --bind 127.0.0.1
```

Open `http://localhost:8000` in your browser. Use Control-C to stop it. This is a local file server for practice, not a production web server. Binding to `127.0.0.1` limits ordinary access to the local machine. Do not serve your home directory, SSH keys, or environment files.

## Follow application logs

```terminal
tail -n 100 app.log
tail -f app.log
grep -n -C 3 'ERROR' app.log
```

Look for the **first causal error**, not just the final cascade. A missing environment variable can produce a database error, which then causes a server startup error. Track time, request ID, component, and relevant configuration. Logs may contain sensitive values; redact before sharing them.

`df -h .` helps diagnose a full disk; `du -sh DIRECTORY` identifies large directories. `time COMMAND` measures elapsed execution time. Make one change at a time and capture enough information to tell whether it helped.

@@ network|Unix & macOS|08 · Network, SSH, and package tools|Understand the boundaries between your computer, a server, and a container.
## URLs, hosts, and ports

```diagram
https://api.example.com:443/users?page=2
└─┬─┘   └─────┬──────┘ └┬┘ └─┬─┘ └──┬───┘
 scheme       hostname  port  path     query
```

DNS maps a hostname to addresses. A port identifies a service endpoint on a host. `localhost` refers to the local networking context; **inside a container it refers to that container**, not automatically to your Mac.

## Inspect HTTP without writing an application

```terminal
curl -I https://example.com
curl -i https://example.com
curl -fL -o example.html https://example.com
```

`-I` requests headers with HTTP HEAD, which some servers handle differently from GET. `-i` includes headers with the response. `-L` follows redirects, `-f` makes many HTTP error statuses cause failure, and `-o` writes to a named file, replacing that file if it exists. Normal `curl` can exit successfully even for an HTTP 404 without a fail option.

A typical API request pattern is `curl -H 'Accept: application/json' URL`. For a POST, use a file such as `curl -X POST -H 'Content-Type: application/json' --data @request.json URL`; the endpoint may change data, so understand it first. Avoid putting real access tokens directly into commands saved in history.

`curl -v URL` shows connection details and headers and can expose credentials in output. `ping HOST` tests ICMP reachability, not whether an HTTP service works; networks may block ping while the website works. `dig example.com` inspects DNS.

## SSH basics

```terminal
ssh USER@HOST
ssh -p 2222 USER@HOST
ssh -i "$HOME/.ssh/id_ed25519" USER@HOST
```

These are patterns: replace `USER` and `HOST`. SSH opens an encrypted remote session. After login, `pwd` refers to the remote computer. Check the prompt and run `hostname` before administering anything important. `exit` returns to the local shell.

On the first connection, verify the host-key fingerprint using a trusted source. Do not approve a changed fingerprint blindly. Your **private key** stays private; the `.pub` file is the public key you register with a service.

```terminal
ssh-keygen -t ed25519 -C "your-email@example.com"
```

This is an optional setup command. Choose a new path if the suggested key already exists; do not overwrite an existing key. Use a passphrase when appropriate and follow your provider's instructions for its SSH agent and key registration.

```terminal
scp report.txt USER@HOST:/remote/directory/
rsync -avn ./docs/ USER@HOST:/remote/docs/
```

`scp` copies files over SSH and may overwrite destination files. The `rsync` example is a **dry run** (`-n`): it previews an archive-style verbose sync. With rsync, a trailing slash on `docs/` means the directory's **contents**. Avoid `--delete` until you understand exactly which destination files it will remove. macOS and installed rsync versions vary.

## Installing development tools on macOS

First inspect what exists:

```terminal
xcode-select -p
git --version
command -v brew
python3 --version
```

Apple Command Line Tools can be installed through `xcode-select --install` when needed; it opens Apple's installation process. Homebrew is a separate package manager. Get installation instructions from its official page, inspect the installer, and follow the PATH instructions printed for your machine.

Once Homebrew is installed, these are examples of its workflow:

```terminal
brew search ripgrep
brew info ripgrep
brew install ripgrep jq tree
brew list
brew outdated
```

`brew update` refreshes package metadata; `brew upgrade PACKAGE` upgrades an installed package. Upgrades can change behavior, so do them deliberately. Homebrew installs ordinary formulae without routinely prefixing every command with sudo. GUI app packages are commonly called casks, such as `brew info --cask docker` for inspection; Docker's own installation docs remain the source for setup and system requirements.

Use project-specific dependency tooling and version files when present. `npm install`, `python3 -m pip install ...`, and `brew install ...` solve different layers of dependencies. A Python `.venv` is a project environment, not a replacement for macOS system files.

## Project dependencies: Python and JavaScript

For a trusted Python repository that documents `requirements.txt`, a common local setup is:

```terminal
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
python -m pip --version
deactivate
```

Creating `.venv` writes a project-local environment; do it in your separate writable checkout if the project requires one. Activation adjusts the current shell so `python` and installed commands resolve into that environment. `deactivate` restores the shell's earlier environment settings; it does not delete the folder. Installing dependencies can download packages and run build/install steps, so use the repository's trusted instructions. A Python virtual environment isolates Python packages; it does not provide a separate operating-system container. Other Python projects use different tools; follow their README rather than forcing this recipe.

For a trusted JavaScript repository that uses npm and has a compatible `package-lock.json`, `npm ci` installs according to that lockfile and replaces the existing `node_modules` directory. `npm install` is used in other situations and can update lockfiles. `npm run` lists available project scripts; `npm run dev` and `npm test` only work as intended if the project defines the corresponding scripts. Read `package.json` to see what they execute. These are project commands, not features supplied by zsh.

Some projects offer a `Makefile` with targets such as `make test`. Read that file before running unfamiliar targets: a make target can execute arbitrary commands and need not be a harmless build. The correct command is the one your project documents, not whichever command worked in a different repository.

Official references: [Homebrew installation](https://docs.brew.sh/Installation), [Apple Terminal guide](https://support.apple.com/guide/terminal/welcome/mac).

@@ scripts|Unix & macOS|09 · Editors and small scripts|Automate repeatable work while keeping it understandable.
## Edit a file without getting trapped

`nano FILE` opens a terminal editor where installed. Read its displayed shortcut legend: Control-O commonly writes a file, Return confirms the filename, and Control-X exits. Saving overwrites the edited file. Use a graphical editor when that is more comfortable.

If Git opens **Vim**: press `i` to insert text, Escape to return to normal mode, then `:wq` and Return to save and quit. `:q!` quits without saving editor changes. If you need Git to cancel an operation rather than use an unchanged message, `:cq` exits Vim with failure. Do not assume quitting without saving always cancels the command that launched the editor.

Set an editor you actually know. For example, `git config --global core.editor 'nano'` if nano is installed, or `git config --global core.editor 'code --wait'` if the VS Code CLI is installed. The `--wait` part lets Git wait until you finish editing.

## Your first script

Create a new file named `inspect-project.sh` in a practice directory with these contents:

```bash
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
```

Then run:

```terminal
chmod u+x inspect-project.sh
./inspect-project.sh .
```

The **shebang** `#!/bin/bash` selects Bash when the executable script is launched normally. macOS includes an older Bash, so this example avoids features that require modern Bash. You can also run `bash inspect-project.sh .`; that explicitly chooses Bash regardless of the shebang.

| Script piece | Meaning |
|---|---|
| `$1` | First positional argument. |
| `${1:-.}` | Use `.` if the first argument is unset or empty. |
| `[[ ... ]]` | A Bash/zsh conditional expression; not universal POSIX sh syntax. |
| `-d` | Test whether a path is a directory. |
| `>&2` | Write to standard error. |
| `exit 1` | Stop with failure. |
| `"$@"` | All positional arguments as separately quoted arguments. |

`set -e` requests exit on many unhandled command failures, with exceptions in conditionals and other contexts; it is not automatic correctness. `-u` rejects unset-variable expansions, and `pipefail` makes a failing pipeline stage affect the pipeline's status. Know these rules before using them in complex scripts.

## Loops, carefully

```bash
for file in ./*.md; do
  [[ -e "$file" ]] || continue
  printf 'Markdown file: %s\n' "$file"
done
```

The existence check handles an unmatched pattern in this **Bash** script. zsh's default unmatched-glob behavior differs. Quote `"$file"` inside the loop. Do not parse `ls` output to obtain filenames: filenames can contain spaces and newlines. For robust recursive processing, `find ... -exec COMMAND {} +` passes filenames as arguments; `find ... -print0` with a compatible `xargs -0` is another pattern.

## Execution versus sourcing

`./script.sh` runs a separate process. `source script.sh` executes its statements inside the current shell, so it can change your directory, variables, functions, and options. Source only trusted files designed for your current shell. Activating a Python environment with `source .venv/bin/activate` intentionally modifies your current shell.

## Make scripts pleasant for teammates

State prerequisites, input arguments, side effects, and a working example in the README. Validate before writing. Use explicit exit statuses, quote paths, and print errors with useful context. A good script is often ten clear lines rather than one clever pipeline. Optional tools such as ShellCheck can find many shell mistakes, but cannot replace reviewing the target paths and side effects.

**Practice:** extend the script to print `git status --short` only when `git rev-parse --is-inside-work-tree` succeeds. Test it in a Git folder and a normal folder. Avoid adding deletion features while you are still learning quoting.

@@ structure|Working habits|10 · Project hierarchy and good comments|Make a repository understandable to the next person—including future you.
## A practical project tree

```diagram
my-project/
├── README.md            purpose, setup, run, test, troubleshoot
├── src/                 application source code
├── tests/               automated checks
├── docs/                architecture and user/developer guides
├── scripts/             small repeatable maintenance commands
├── config/              non-secret configuration templates
├── .env.example         documented placeholder configuration
├── .gitignore           files Git should not begin tracking
├── .dockerignore        files excluded from a Docker build context
├── Dockerfile           image build instructions, if used
├── compose.yaml         related container services, if used
├── pyproject.toml       Python example: project/dependency metadata
├── package.json         JavaScript example: metadata and scripts
└── dependency lockfile  exact resolved versions for its ecosystem
```

This is an example, not a requirement to create every folder. Python and JavaScript projects use different conventions; you do not need both manifests unless you actually have both kinds of code. Read the existing repository before reorganizing it. Follow team conventions and keep related code together.

Separate **source** from generated output and local machine state. Examples of local/generated folders include `.venv/`, `node_modules/`, caches, `dist/`, and coverage output. Some projects intentionally version generated files; follow their policy. Dependency lockfiles are commonly committed for applications to make installations reproducible.

A Markdown README is a plain text file with formatting conventions such as `# Heading`, fenced code blocks, and `[label](URL)` links. Your editor or repository host renders it.

## A README people can use

Include the purpose, prerequisites, exact setup commands, required environment-variable names, run and test commands, and common failure remedies. Specify the directory in which commands should run. Distinguish host commands from container commands. Document migrations and destructive cleanup next to the relevant command, not only in a distant warning page.

A useful troubleshooting entry says: **“If port 8000 is busy, run `lsof -nP -iTCP:8000 -sTCP:LISTEN`; stop your old server or set another port.”** That is more useful than “Check your environment.”

## Code comments should explain intent

```python
# Weak: increment the attempt counter.
attempt += 1

# Useful: the provider counts the initial request as an attempt.
# Start retries at 2 so our audit log matches its dashboard.
attempt += 1
```

Useful comments explain business constraints, surprising tradeoffs, units, external behavior, invariants, or a workaround with an issue reference. If a comment only paraphrases a clear line of code, improve the name or remove the comment. Keep comments accurate when changing behavior.

```python
def retry_delay(attempt: int) -> float:
    """Return a delay in seconds for a one-based request attempt.

    Cap the delay at 30 seconds to stay within the caller's timeout budget.
    """
    return min(2 ** (attempt - 1), 30)
```

A docstring is documentation associated with an API. Describe inputs, outputs, units, errors, side effects, and important edge cases where they are not obvious. A comment about a temporary workaround should include a reason and a removal condition: `TODO(PROJ-142): remove fallback after provider v3 is deployed.` Do not leave a vague `TODO: fix later` without context.

## Write useful commit messages

```output
Fix duplicate invoice imports during retries

Reuse the request id when a provider timeout leaves the first import's
outcome unknown. This makes retries idempotent and avoids duplicate rows.

Validation: repeated the timeout scenario and ran the import tests.
```

The subject states the concrete change. The body explains **why**, observable behavior, and relevant validation. One logical change per commit makes review and cherry-picking easier. Conventional Commits such as `fix(import): avoid duplicate invoices` are an optional team convention, not a Git requirement.

## Write review comments and pull requests

A good review comment names the condition, consequence, and suggested next step: “If `items` is empty, this division raises an error. Return an empty summary before calculating the average.” Critique the code, explain the reason, and separate a required correction from an optional preference.

A useful pull request description states the problem, resulting behavior, how you checked it, and limitations. Avoid “misc fixes.” Review your own diff first: accidental formatting churn, debug prints, secrets, and unrelated file edits distract from the change you want approved.

## A disciplined daily loop

```diagram
Understand a small task
          ↓
Inspect project docs + current state
          ↓
Make a focused change
          ↓
Run relevant checks → inspect diff
          ↓
Commit with an explanation
          ↓
Review / integrate → update docs if behavior changed
```

Being a capable developer is mostly about reducing uncertainty systematically: know the directory, know the branch, inspect the diff, validate behavior, and make changes small enough to understand.

@@ git-model|Git, thoroughly|11 · Git's mental model|Snapshots, pointers, and three places where your work can live.
## What Git actually stores

Git tracks a project's history as **commits**. A commit identifies a snapshot of tracked files plus metadata, a message, and references to its parent commit or commits. Git stores content efficiently; conceptually, think “snapshot,” not “a folder of copied files.”

A **repository** includes the history and reference metadata, usually in `.git`. A **working tree** is the checked-out files you edit. The **index**, also called the staging area, describes the snapshot you plan to commit next.

```diagram
WORKING TREE              STAGING AREA / INDEX            LOCAL HISTORY
files you edit            next commit's proposed files    committed snapshots
      │                             │                            │
      └──── git add FILE ──────────→│                            │
                                    └──── git commit ───────────→│

Compare working tree ↔ index:        git diff
Compare index ↔ HEAD commit:         git diff --staged
Compare working tree ↔ HEAD commit:  git diff HEAD
```

**Important:** those diffs do not automatically show the contents of untracked files. `git status` tells you that an untracked file exists; open the file to review it.

## A file has states, not just “saved” or “unsaved”

| State | Meaning |
|---|---|
| Untracked | The file exists, but Git has not started tracking it. |
| Tracked, unmodified | Its checked-out contents match the index and current commit. |
| Modified, unstaged | Working-tree contents differ from the index. |
| Staged | The index differs from the current commit. |
| Ignored | An ignore rule usually keeps an untracked file out of normal status/add operations. |

A file can be both **staged and modified**: stage version 1, edit again to version 2, and only version 1 is ready to commit. `git add` captures the selected path's contents at that moment; it does not keep watching future edits.

```terminal
git status --short
```

```output
 M src/app.py       modified in working tree, not staged
M  README.md        staged modification
MM config.txt       staged version plus further unstaged edits
?? scratch.txt      untracked
```

The two status columns represent index status and working-tree status. A space is meaningful.

## Commits, branches, and HEAD

```diagram
A ─── B ─── C          main
            ↑
          HEAD
```

The letters stand for commit IDs. A branch is a movable reference pointing to a commit; it is not a separate copied folder. Normally **HEAD** refers to your current branch, and that branch points to the current commit. Creating a commit advances the current branch to the new commit.

A commit ID is a hash identifier, often displayed in abbreviated form such as `a1b2c3d`. In this guide, uppercase `COMMIT_ID` is a placeholder, not a valid ID you can paste.

| Revision | Meaning |
|---|---|
| `HEAD` | The currently checked-out commit. |
| `HEAD~1` | First-parent ancestor one step back. |
| `HEAD~2` | First-parent ancestor two steps back. |
| `HEAD^1` | First parent of HEAD. |
| `HEAD^2` | Second parent, if HEAD is a merge commit. |
| `main` | Commit pointed to by the local branch named main. |
| `origin/main` | Your local record of the remote's main branch as last fetched. |
| `v1.0.0` | A tag, if this repository has one. |

`HEAD~2` does not mean “second parent”; it follows first parents twice. Merge graphs make that distinction matter.

## Git is not GitHub

Git is the version-control program on your machine. GitHub, GitLab, and similar services host repositories and collaboration features. A commit is normally local until pushed. A pull request is a hosting-platform review feature, not a built-in Git command.

```diagram
YOUR MAC                                     HOSTING SERVICE
working files → staging → local commits      remote repository
                              │                      ↑
                              └────── push ──────────┘
local remote-tracking refs ←────── fetch ────────────┘
```

You can use Git entirely offline. A hosted copy is useful, but Git does not replace backups of uncommitted work, database data, or files you deliberately ignore.

Official reference: [Git documentation overview](https://git-scm.com/docs/git).

@@ git-daily|Git, thoroughly|12 · Setup and your daily Git loop|Create meaningful local checkpoints you can explain and review.
## First inspect the environment

```terminal
git --version
git config --show-origin --get user.name
git config --show-origin --get user.email
```

Set identity if it is absent or wrong. This is **commit authorship metadata**, not your hosting-service login:

```terminal
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
git config --global init.defaultBranch main
```

`--global` changes your user-wide Git configuration. Run without `--global` inside a repository for a repository-specific override. Use an address consistent with your work account or hosting-service privacy preferences. `git config --show-origin --get KEY` helps locate where a setting came from.

## Create or clone—choose one

**New local project:** in a new empty folder:

```terminal
git init -b main
```

**Existing project from a service:** use its actual URL and choose a new destination folder:

```terminal
git clone REPOSITORY_URL project-copy
cd project-copy
```

Do not run both recipes just because both are shown. A clone generally sets a remote named `origin` and checks out a default branch. Cloning copies repository history and tracked contents, not your colleague's uncommitted edits or their ignored `.env` file.

## A reliable daily sequence

Starting condition: you are inside the intended repository on the intended feature branch. If your project requires a separate checkout, create that first, as explained in the worktrees chapter.

```terminal
pwd
git status
git branch --show-current
```

Make your focused edits using an editor, then:

```terminal
git diff
git add README.md src/app.py
git diff --staged
git diff --staged --check
git commit -m "Handle empty search results"
git status
```

Replace the filenames with real files in your change. `git diff --staged --check` finds certain whitespace errors; it does not test application behavior. Run the project's relevant tests or checks before committing as appropriate.

`git add .` stages changes under the current directory; `git add -A` stages additions, modifications, and removals across the working tree. Both can include unintended content. Explicit paths or patch staging are easier to review when learning.

## Stage only part of a file

```terminal
git add -p src/app.py
```

Git displays change chunks called **hunks**. Common choices include `y` to stage a hunk, `n` to leave it, `s` to split when possible, and `q` to quit. Use the displayed help for other choices. This lets you separate an actual bug fix from an unrelated cleanup in the same file.

A commit should leave a coherent project state. Splitting a dependency update from the source change that requires it may make the intermediate commit unusable. “Small” means focused, not arbitrarily tiny.

## Rename, delete, and ignore deliberately

```terminal
git mv old-name.py new-name.py
git rm obsolete-file.py
```

`git mv` updates the working tree and index for a rename. Git also detects many renames from content similarity even if you use a normal filesystem move. `git rm` removes the tracked file and stages its deletion; review before committing. For an untracked file, normal filesystem commands apply.

A `.gitignore` file keeps matching **untracked** paths out of normal tracking operations. It does not remove already-tracked files or erase historical secrets. See the hygiene chapter before trying to fix either issue.

## Useful habits

- Start and end with `git status`.
- Review the staged diff; it is what will enter the commit.
- Avoid putting debugging credentials, `.env`, personal notes, or generated caches in a commit.
- Commit when the change forms a meaningful checkpoint.
- Check team instructions before pushing or rewriting any history.

**Checkpoint:** you edit a file, stage it, then edit it again. Which version does `git commit` save? The staged version, until you stage the new edits too.

Official reference: [Git basic snapshot commands](https://git-scm.com/docs/git).

@@ git-inspect|Git, thoroughly|13 · Read history and compare changes|Ask precise questions before changing history.
## The history views you will actually use

```terminal
git log --oneline -n 15
git log --graph --decorate --oneline --all
git show HEAD
git show COMMIT_ID --stat
git log --oneline -- src/app.py
git log --follow -- README.md
```

`--graph` draws the parent relationships, `--decorate` shows reference names, and `--all` includes commits reachable from all refs. Display order in a graph is not a simple checklist of who worked first; parent relationships are the important part.

`--` separates revision/options from path arguments when needed. `--follow` follows the history of one file across detected renames, with limitations; it is not a general cross-project history tracker.

## Read a diff

```diff
--- a/src/config.py
+++ b/src/config.py
@@ -1,2 +1,2 @@
-timeout = 5
+timeout = 15
 retries = 3
```

A line starting `-` existed in the earlier version. A line starting `+` exists in the later version. An unchanged context line helps locate the change. `@@` marks a hunk and its line ranges. Diff headers are not content you paste into the source file.

| Question | Command |
|---|---|
| What have I edited since staging? | `git diff` |
| What is ready for my next commit? | `git diff --staged` |
| What differs from the current commit in tracked working files? | `git diff HEAD` |
| What changed between two endpoints? | `git diff main feature/search` |
| What did my feature introduce since the shared ancestor? | `git diff main...feature/search` |
| What local commits are absent from origin/main? | `git log origin/main..HEAD --oneline` |
| What changes are incoming versus outgoing? | `git log --left-right --oneline HEAD...origin/main` |

**Two dots and three dots differ by command.** With `git log A..B`, you select commits reachable from B but not A. With `git log A...B`, you select commits reachable from either side but not both. With `git diff A...B`, you compare the merge base of A and B to B. Do not transfer the meaning blindly from log to diff.

## Inspect an old file without changing anything

```terminal
git show HEAD~1:README.md
git show main:src/app.py
```

These print historical contents. They do not switch branches or overwrite your working file. Use them before `restore --source=...` when you are not sure which version you need.

## Find why a line exists

```terminal
git blame -L 10,30 -- src/app.py
git log -S 'retry_limit' --oneline -- src/app.py
git log -G 'timeout.*=' --oneline -- src/app.py
```

`blame` attributes lines to the commit that last changed them; it is a navigation tool, not a judgment about a person. Read that commit's message and surrounding change. `-S` looks for a change in the count of a string, while `-G` looks for matching changed lines using a regex.

## Binary search for a regression

Starting condition: a clean working tree, a known good commit, and a reproducible test that distinguishes good from bad.

```terminal
git bisect start
git bisect bad
git bisect good GOOD_COMMIT_ID
```

Git checks out a candidate between the endpoints. Run your test, then say `git bisect good` or `git bisect bad`. Repeat until Git identifies the first bad commit. `git bisect skip` handles an untestable revision, though too many skipped commits can leave an ambiguous result. Finish with:

```terminal
git bisect reset
```

```diagram
known good                                        known bad
A ── B ── C ── D ── E ── F ── G ── H ── I
                    ↑
               test midpoint
       good? search right · bad? search left
```

Automation exists through `git bisect run COMMAND`: exit 0 means good, ordinary nonzero means bad, and 125 means skip. A broken test environment can mislead the search, so prove the endpoints first.

Official references: [git bisect](https://git-scm.com/docs/git-bisect), [git log](https://git-scm.com/docs/git-log), [git diff](https://git-scm.com/docs/git-diff).

@@ git-branches|Git, thoroughly|14 · Branches and merges|Separate work without copying the entire project.
## Creating a branch does not duplicate your files

```terminal
git switch -c feature/search
git branch --show-current
git branch -vv
```

`switch -c` creates a branch at the current commit and switches to it. `git branch NAME` creates without switching. `git switch NAME` switches to an existing branch. Old tutorials often use `checkout`; the newer `switch` and `restore` commands separate two of checkout's historically mixed responsibilities.

Start from the intended base. A feature created from an outdated local main starts outdated too. Fetch and inspect when working with remotes rather than assuming local main is current.

## Draw what a branch means

```diagram
Before creating a feature:
A ─── B                         main ← HEAD

After commits on the feature:
A ─── B                         main
       ╲
        C ─── D                 feature/search ← HEAD
```

Switching updates tracked files to the target snapshot when possible. Uncommitted changes can sometimes move with you if there is no conflict, or Git may refuse to switch to avoid overwriting them. A branch does not automatically own your uncommitted edits. Commit, stash, or use a separate worktree deliberately.

## Fast-forward merge

If main has not advanced since the feature began, its pointer can simply move forward:

```terminal
git switch main
git merge --ff-only feature/search
```

```diagram
Before:
A ─── B ─── C ─── D
      ↑           ↑
     main      feature/search

After:
A ─── B ─── C ─── D
                  ↑
             main + feature/search
```

`--ff-only` refuses if a fast-forward is impossible. That makes it a useful guardrail when you want to avoid an unexpected merge commit.

## True merge when both sides advanced

```diagram
Before:
A ─── B ─── E                   main
       ╲
        C ─── D                 feature/search

After git switch main; git merge feature/search:
A ─── B ─── E ─── M             main
       ╲          ╱
        C ─── D                 feature/search

M has two parents: E and D.
```

The commands in the caption describe two steps; run them separately in your terminal. A merge combines histories and usually merges compatible file changes automatically. If both changes affect the same region or have structural conflicts, Git asks for your decision. The conflicts chapter walks through that process.

`git merge --no-ff feature/search` creates a merge commit even when a fast-forward would be possible, preserving an explicit feature boundary. Follow the repository's merge policy, especially when pull requests enforce it.

## Squash merge

```terminal
git switch main
git merge --squash feature/search
git diff --staged
git commit -m "Add search with empty-state handling"
```

A squash merge prepares the net change as staged content; you create one commit yourself. It does not record the feature tip as a second parent. The original feature commits remain on that feature branch until the branch is deleted, and Git ancestry does not mark them as merged into main in the same way a normal merge does.

## Delete branches deliberately

```terminal
git switch main
git branch -d feature/search
```

`-d` protects against some unmerged-history deletion. It can refuse after a squash merge because the original feature commits are not ancestors of main. Inspect the result before considering `-D`, which forces deletion of the branch reference. Branch deletion does not mean “delete a folder,” but can make unique commits harder to find later.

`git push origin --delete feature/search` deletes the branch on the remote service; that changes shared state. Use it only for a branch that you are authorized to remove. Local and remote branch deletion are separate actions.

Official references: [git switch](https://git-scm.com/docs/git-switch), [git merge](https://git-scm.com/docs/git-merge).

@@ git-remotes|Git, thoroughly|15 · Remotes, pulls, pushes, and reviews|Keep local history and shared history conceptually separate.
## What origin/main actually means

`origin` is a conventional remote nickname, not a special server. A remote has one or more URLs. `origin/main` is a **local remote-tracking ref** recording where main was on origin the last time relevant remote information was fetched. It is not a live network view.

```terminal
git remote -v
git branch -vv
git fetch origin
```

Fetch downloads objects and updates remote-tracking refs according to configuration. It normally does not edit your checked-out source files or merge the downloaded work into your current branch.

```diagram
REMOTE main            your origin/main          your local main
     C       fetch →          C                         B
                                                        │
                        merge --ff-only origin/main ────┘
                                                        ↓
                                                        C
```

## Pull is fetch plus integration

From a clean local main that tracks the intended remote branch:

```terminal
git switch main
git pull --ff-only
```

This fetches and tries to fast-forward. If histories diverged, it stops instead of choosing an integration policy silently. Inspect the divergence. Other explicit choices include `git pull --rebase` and a merge-based pull, but understand the effects before using them.

A more inspectable sequence is:

```terminal
git fetch origin
git log --oneline --left-right HEAD...origin/main
git merge --ff-only origin/main
```

Run this on the branch you intend to update. Do not mechanically merge origin/main into an unrelated release branch.

## Share a feature branch

After local review and testing, and only where remote writes are allowed:

```terminal
git push -u origin feature/search
```

This sends the branch and needed objects to origin, creating or updating that remote branch if permitted. `-u` establishes upstream tracking for convenient future status, pull, and push operations. To avoid ambiguity while learning, you can keep using the explicit remote and branch name.

Before pushing, inspect `git remote -v`, `git branch --show-current`, `git log origin/main..HEAD --oneline`, and the relevant diff. Remote URLs may be HTTPS or SSH; changing the URL does not fix an invalid permission or missing account grant by itself.

## The pull request loop

```diagram
Update main → create feature → edit + test → local commits
                                                ↓
                                      push feature branch
                                                ↓
                                     open PR against main
                                                ↓
                            review + CI → revise + push again
                                                ↓
                                 approved → merge per policy
                                                ↓
                              update local main → clean up
```

CI means automated checks run by your hosting or build service. A pull request can exist while those checks fail. Read the actual failure and fix it; repeatedly pushing the same content does not resolve a reproducible error.

After a PR is merged, switch to main, fetch/pull according to policy, and verify that the expected change is present before deleting your local feature branch. A squash merge and a rebase merge can produce new commit IDs on main.

## A rejected push is information

A non-fast-forward rejection often means the remote branch contains commits your local branch lacks. Fetch, compare, and decide whether to merge or rebase. Do not respond with an unconditional force push. If authentication fails, check the URL, transport, account access, and credential configuration. Many services require an access token or SSH key rather than an account password for Git operations.

## Forks and upstream

In a fork-based workflow, `origin` often points to your fork and `upstream` to the original project. These names are conventions. `git remote add upstream ORIGINAL_REPOSITORY_URL` changes only your local remote configuration; fetching upstream gets its history. Push to the authorized destination, often your fork, and open a PR toward the original project.

Official references: [git fetch](https://git-scm.com/docs/git-fetch), [git pull](https://git-scm.com/docs/git-pull), [git push](https://git-scm.com/docs/git-push).

@@ git-rebase|Git, thoroughly|16 · Rebase, squash, and amend|Rewrite your own history deliberately and understand the new commit IDs.
## Merge and rebase answer different questions

A merge asks: **combine these histories while preserving their ancestry**. A rebase asks: **replay these changes on a different base**. Rebase typically creates replacement commits with new parent relationships and therefore new IDs.

```diagram
Starting point:
A ─── B ─── E                   main
       ╲
        C ─── D                 feature/search

After rebasing feature/search onto main:
A ─── B ─── E                   main
             ╲
              C′ ─── D′         feature/search

C′ and D′ express replayed changes, but are new commits.
Old C and D are no longer the feature's current ancestry.
```

For your own unshared feature branch with a clean working tree:

```terminal
git fetch origin
git branch backup/feature-before-rebase
git rebase origin/main
```

Run these while on the feature branch. The backup reference preserves the committed tip, **not unstaged or untracked files**. Save such work separately first.

If rebase stops, resolve the reported conflicts, stage the resolved files, then use `git rebase --continue`. Use `git rebase --abort` to return to the pre-rebase state. `--skip` drops the current replayed change; it is not a generic way to avoid understanding a conflict.

## When rebase is a good fit

Use it to update your private branch to a newer main, clean up a review branch under an agreed team policy, or reorganize unpublished commits. Avoid rewriting main, release history, or a branch other people depend on unless the team has explicitly coordinated it.

Rebase does not prove that your feature works with the new base. Run the relevant checks afterward. Two changes can merge cleanly and still be semantically incompatible.

## Interactive rebase

Starting condition: at least three suitable local commits, a clean tree, and no shared dependency on those commit IDs.

```terminal
git branch backup/before-cleanup
git rebase -i HEAD~3
```

Git opens a todo list **oldest first**:

```output
pick a1b2c3d Add search endpoint
fixup b2c3d4e Fix typo in search endpoint
reword c3d4e5f Add empty results message
```

`pick` keeps a commit, `reword` changes its message, `edit` stops to modify it, `squash` combines with the preceding commit and edits the combined message, and `fixup` combines while discarding that commit's message. Reordering can break dependencies. Deleting a line drops that commit from the new history. Read the editor's help before saving.

If you want to include the repository's first commit, `HEAD~N` may not exist for your range; `git rebase -i --root` is a separate advanced choice. Do not guess a larger N when Git says the revision is invalid.

## Amend the latest commit

If the latest commit is still yours to rewrite:

```terminal
git add README.md
git commit --amend --no-edit
```

This replaces the latest commit with a new one incorporating staged changes while keeping its message. To change the message, `git commit --amend` opens the editor; check the staged diff first because staged content is included too. Amend is not “add a note to the old commit.” It changes the commit ID.

## Publishing rewritten history: force-with-lease

If a branch was already pushed and your team's policy permits rewriting that specific branch, a normal push may be rejected because its history changed. `--force-with-lease` checks an expected remote state before replacing it. It is safer than unconditional `--force`, but it still rewrites shared history and is not a substitute for coordination.

For a deliberate rewrite, record the expected remote tip **before** rewriting:

```terminal
git fetch origin
expected_remote_tip=$(git rev-parse origin/feature/search)
```

After rewriting locally, review and test, then—only with the required authorization and branch policy—use:

```terminal
git push --force-with-lease=refs/heads/feature/search:"$expected_remote_tip" origin HEAD:refs/heads/feature/search
```

The explicit expected ID guards against replacing a remote tip that changed since your snapshot, including a tip silently refreshed by a background fetch. If the lease fails, fetch and inspect the new work. Do not merely recapture the new ID and force again.

**Decision:** if rewriting shared history is unnecessary, prefer an ordinary follow-up commit or a revert. Your collaborators can continue from stable history.

Official references: [git rebase](https://git-scm.com/docs/git-rebase), [git push and leases](https://git-scm.com/docs/git-push), [git commit](https://git-scm.com/docs/git-commit).

@@ git-cherry|Git, thoroughly|17 · Cherry-pick in real development|Apply a specific commit's change without merging its whole branch.
## The concrete use case

A release branch needs a bug fix that was committed on main. Main also contains unfinished features that must not go into that release. A merge would bring a wider history; cherry-pick lets you apply the selected change to the release branch.

```diagram
Before:
A ─── B ─── C ─── D             main
       ╲      ↑
        R     bug fix C         release/1.4

After selecting C onto release/1.4:
A ─── B ─── C ─── D             main
       ╲
        R ─── C′                release/1.4

C′ is a new commit applying C's change on top of R.
D is not brought over by this cherry-pick.
```

This does not copy a file's entire main-branch version by default. It tries to apply the **change introduced by the chosen commit**, relative to its parent, to your current branch.

## A careful backport recipe

Starting condition: clean working tree, the target release branch exists locally, and you have identified a focused non-merge fix commit whose dependencies are available on the release.

```terminal
git fetch origin
git show --stat FIX_COMMIT_ID
git show FIX_COMMIT_ID
git switch release/1.4
git branch backup/release-before-backport
git cherry-pick -x FIX_COMMIT_ID
```

Replace `FIX_COMMIT_ID` with the actual ID. Ensure the release branch is current according to its own upstream policy before applying the fix. `-x` records the source commit reference in the new message, which helps trace a backport. Run the release's tests after applying it. A clean application is not proof that the fix works on the older code.

## Selecting several commits

```terminal
git cherry-pick FIRST_COMMIT_ID SECOND_COMMIT_ID
```

Explicitly list dependent commits in dependency order. A revision range such as `A..B` excludes A and includes commits reachable from B but not A; that can select more than a simple visual segment when merges are involved. Review the selected list with `git log --oneline --reverse A..B` before applying a range. For a simple linear inclusive range, `A^..B` includes A, provided A has a suitable parent. Beginners are usually better served by an explicit small list.

## What happens when it conflicts

```terminal
git status
```

Edit the conflicted files to the correct combined result, remove conflict markers, and stage only the resolved paths:

```terminal
git add src/parser.py
git cherry-pick --continue
```

`git cherry-pick --abort` abandons the in-progress sequence and restores its starting state. `git cherry-pick --skip` skips the current commit; use that only when you have proved the selected change is unnecessary or already present. Git versions differ in some empty-commit options; follow your installed help and the current operation's instructions.

## Apply the change without immediately committing

`git cherry-pick --no-commit COMMIT_ID` applies the change into the working tree and index so you can inspect or combine it before a commit. It does not make the operation risk-free; existing staged content can complicate the result. Start clean and review carefully. A regular cherry-pick is simpler for a traceable backport.

## Common traps

| Trap | Why it hurts | Better approach |
|---|---|---|
| Pick a fix that depends on an earlier refactor. | It may compile badly or silently change behavior. | Inspect context and backport the minimal independent fix. |
| Cherry-pick the same change repeatedly. | Duplicate IDs or patch-equivalent history becomes confusing. | Check target history, diffs, and whether the behavior is already fixed. |
| Treat cherry-pick as branch synchronization. | Selected patches do not record a full merge relationship. | Use merge or an agreed rebase workflow for ongoing integration. |
| Pick a merge commit without understanding parents. | Git needs a mainline parent to define its change. | Inspect parents; often pick the underlying focused commit instead. |
| Assume “no conflict” means “correct.” | Dependencies and behavior can differ across releases. | Test on the target branch. |

For a merge commit, `git cherry-pick -m 1 MERGE_COMMIT_ID` means use parent 1 as the mainline reference when calculating the change. It does **not** mean “pick the first commit inside this merge.” This is advanced; identify parents with `git show --no-patch --pretty=raw MERGE_COMMIT_ID` first.

## Another use case: a commit on the wrong branch

If you already committed a fix on feature A but it belongs on feature B, you can cherry-pick that commit onto B. Removing it from A is a **separate** decision: reset may be appropriate for an unpublished tip, while revert or a follow-up change may fit shared history. The scenario cookbook gives a guarded recipe.

Official reference: [git cherry-pick](https://git-scm.com/docs/git-cherry-pick).

@@ git-undo|Git, thoroughly|18 · Undo without guessing|Restore edits, move pointers, or add an inverse commit: choose consciously.
## First ask three questions

1. Is the work uncommitted, or is there already a commit?
2. If committed, has anyone else received or depended on it?
3. Do I want to keep the file changes, or discard them?

```diagram
Need to undo something?
        │
        ├── Uncommitted
        │      ├── unstage only → restore --staged FILE
        │      └── discard tracked edits → restore FILE
        │
        └── Committed
               ├── shared history → usually revert COMMIT
               └── private tip history
                      ├── keep changes staged → reset --soft
                      ├── keep changes unstaged → reset --mixed
                      └── discard tracked changes → reset --hard
                          (destructive; inspect and back up first)
```

## Restore: change file contents or staging

| Goal | Command | Effect |
|---|---|---|
| Unstage a path, keep its working edits. | `git restore --staged FILE` | Index is restored from HEAD by default; working file remains. |
| Discard unstaged edits to a tracked path. | `git restore FILE` | Working file is replaced from the index by default. |
| Get a historical file version into your working tree. | `git restore --source=COMMIT_ID -- FILE` | Replaces that working file; does not move the branch. |
| Restore a path into both index and working tree. | `git restore --source=HEAD --staged --worktree -- FILE` | Discards staged and unstaged changes to that path. |

**Overwrite consequence:** file restoration can destroy uncommitted edits. Inspect both `git diff -- FILE` and `git diff --staged -- FILE` first, and save anything needed elsewhere. `git restore FILE` restores from the **index**, which might already contain a staged version—not necessarily the last commit.

## Reset: move the branch tip, with optional index and file changes

Starting example: your private branch is `A—B—C`, with C the latest commit. These rows are **alternatives**, not a sequence:

| Command | New tip | Index | Working files |
|---|---|---|---|
| `git reset --soft HEAD~1` | B | Keeps prior index; C's changes usually remain staged. | Preserved. |
| `git reset --mixed HEAD~1` | B | Reset to B. | Preserved; C's changes usually appear unstaged. |
| `git reset --hard HEAD~1` | B | Reset to B. | Reset to B for tracked content; local work can be lost. |

`--mixed` is the default reset mode. `git reset -- FILE` is a path-based form that updates the index without moving the branch; it overlaps with unstaging via `restore --staged`. Do not assume every form of reset moves HEAD.

```diagram
Before: A ─── B ─── C           feature ← HEAD

Reset:  A ─── B                 feature ← HEAD
               ╲
                C               old tip, no longer on feature
```

**Hard-reset consequence:** `--hard` discards tracked working and staged changes and can remove untracked paths that obstruct writing tracked files. It is not a general untracked-file cleanup tool, but it is destructive enough that you should inspect and preserve local work first. A backup branch protects committed snapshots only. Use reflog promptly to recover a lost committed tip when possible; it cannot reliably restore never-committed edits.

## Revert: preserve history and add an inverse change

```terminal
git revert BAD_COMMIT_ID
```

Run on the branch that should receive the correction, with a clean working tree. Git adds a new commit undoing that commit's change as applied to the current state. Later overlapping changes may cause conflicts. Follow `git status`; resolve, stage, and `git revert --continue`, or use `git revert --abort`.

```diagram
Before: A ─── B ─── C           main
                bad change C

After:  A ─── B ─── C ─── R     main
                        inverse change in R
```

Revert does not erase C or make exposed secrets disappear from history. Reverting a merge requires understanding `-m PARENT_NUMBER` and affects how future merges see ancestry; ask an experienced teammate or inspect the documented merge-revert behavior before doing it on shared main.

## Clean: remove untracked files, not commits

```terminal
git clean -nd
```

This previews untracked files and directories that would be removed. `git clean -fd` performs that deletion. `-x` also includes ignored files, which can include local environments, downloaded data, or secrets. Do not casually run `git clean -fdx`. Untracked files deleted by clean usually have no Git recovery path. Review the dry run immediately before the real operation.

## Practical default

To undo a published bad change, start by considering **revert**. To unstage, use **restore --staged**. To discard one tracked file's edits, use **restore** only after inspection. Use reset when you understand which reference and which file states will change.

Official references: [git restore](https://git-scm.com/docs/git-restore), [git reset](https://git-scm.com/docs/git-reset), [git revert](https://git-scm.com/docs/git-revert), [git clean](https://git-scm.com/docs/git-clean).

@@ git-recovery|Git, thoroughly|19 · Stash, reflog, and worktrees|Pause work, rescue commits, and keep separate checkouts.
## Stash: a local interruption tool

When you need to pause unfinished edits, first inspect `git status`. Then:

```terminal
git stash push -u -m "WIP search form before urgent fix"
git stash list
```

A normal stash includes tracked staged and unstaged changes. `-u` also includes untracked files, but not ignored files. Stashing removes the saved changes from the working tree so you can work elsewhere. It is local and not automatically shared or backed up by a push.

To resume, return to the appropriate branch and inspect the stash:

```terminal
git stash show -p 'stash@{0}'
git stash apply 'stash@{0}'
git status
```

`apply` keeps the stash entry. Verify the restored files and any untracked files included by `-u`; ordinary stash patch output may not display all of those without additional options. After you are certain the intended work is present, `git stash drop 'stash@{0}'` removes that entry. Identify it again before dropping because stash numbers can change when other entries are created or removed.

`pop` applies and drops on success. If it conflicts, the entry is generally retained; inspect instead of repeating pop. `apply --index` also tries to restore the original staged state. A stash applied on a different base can conflict. For longer work, a normal WIP commit on a private branch is often easier to reason about than a pile of unnamed stashes.

There is no universal `git stash --abort` equivalent. If apply conflicts, the original stash remains, but clean-up depends on your previous state. This is a reason to start a restore attempt from a known clean working tree and keep the stash until verification succeeds.

## Reflog: where your local references used to point

```terminal
git reflog --date=local
```

Reflog records local reference movements such as commits, checkouts, resets, and rebases. If you accidentally moved away from a commit:

```terminal
git show CANDIDATE_COMMIT_ID
git branch rescue/lost-work CANDIDATE_COMMIT_ID
```

Creating a rescue branch preserves that committed snapshot without overwriting your current files. Inspect and compare before switching. Reflog entries are local, expire, and are not a permanent backup. Garbage collection can eventually remove unreachable objects. Reflog does not reliably recover arbitrary never-committed edits.

```diagram
feature used to point here ───→ C
               reset          │
feature now points here ────→ B
                              ↑
reflog remembers the move; a rescue branch can point back to C
```

Quoted revision syntax such as `'HEAD@{2}'` is useful when passing reflog selectors through a shell. Read the entry itself rather than guessing that entry 2 always means “before my mistake.”

## Detached HEAD: a historical view without a branch

```terminal
git switch --detach COMMIT_ID
```

This checks out a commit directly. It is useful for inspection or testing, but new commits do not advance an ordinary named branch. To keep work made there, create a branch before leaving:

```terminal
git switch -c rescue/detached-work
```

If you already left, use reflog to find the commit and create a rescue branch at it. Detached HEAD is a state, not corruption.

## Worktrees: multiple directories sharing one repository history

Suppose your project is in `~/Projects/shop` and you need an urgent fix while the current folder contains unfinished work. After fetching and inspecting the intended base, run from the original repository:

```terminal
git worktree add -b hotfix/login ../shop-hotfix main
git worktree list
```

This creates a new branch based on **local main** and checks it out into a separate sibling directory. If you want a freshly fetched remote base instead, explicitly choose `origin/main` after fetching and verifying it.

```diagram
shared repository objects + refs
              │
       ┌──────┴─────────┐
       ▼                ▼
~/Projects/shop    ~/Projects/shop-hotfix
feature/search     hotfix/login
own working files  own working files
own index          own index
```

Worktrees share repository objects and refs; they are separate file checkouts, not independent copies of all Git state. Most normal branch names can be checked out in only one worktree at a time. Uncommitted edits, ignored files, dependencies, and environment files are not automatically copied into the new worktree.

When done and the worktree is clean, use `git worktree remove ../shop-hotfix` from another checkout. It removes that checkout directory, so do not store unrelated files there. The branch still exists until separately deleted. `git worktree prune` cleans stale metadata, not active working files.

If a project rule says **never change the official checkout**, honor it: get the requested approval for repository work, select a separate directory, and work there. Creating a worktree still updates shared Git metadata; when complete metadata separation is required, use an independent local copy/clone according to the project's policy.

Official references: [git stash](https://git-scm.com/docs/git-stash), [git reflog](https://git-scm.com/docs/git-reflog), [git worktree](https://git-scm.com/docs/git-worktree).

@@ git-conflicts|Git, thoroughly|20 · Conflicts, ignore rules, and hygiene|Resolve the intended behavior, not just the conflict markers.
## A conflict means Git needs a human decision

You can conflict on edited lines, file deletion versus modification, renames, or other structural changes. It does not mean you did something wrong. Start with `git status` to identify the operation and affected paths.

```output
<<<<<<< HEAD
timeout = 10
=======
timeout = 30
>>>>>>> feature/search
```

This is file content showing alternative versions. Your job is to replace the whole marked block with the correct final code, not blindly choose one side. Sometimes the correct result combines ideas from both branches or uses a third implementation. Remove all markers, review surrounding code, run the relevant checks, and stage the resolved file.

## Continue the operation you actually started

| In-progress operation | After resolving and staging | To abandon the operation |
|---|---|---|
| Merge | `git merge --continue` | `git merge --abort` |
| Rebase | `git rebase --continue` | `git rebase --abort` |
| Cherry-pick | `git cherry-pick --continue` | `git cherry-pick --abort` |
| Revert | `git revert --continue` | `git revert --abort` |

Begin integration operations with a clean tree whenever possible; aborting a merge with pre-existing changes may not reconstruct every original local edit perfectly. `git status` is your primary guide, and a conflict-resolution GUI can help visualize base, current, and incoming versions.

## Beware “ours” and “theirs”

During a normal merge, ours usually means the currently checked-out branch and theirs the branch being merged. During a rebase, the labels can feel reversed because Git is replaying your commit onto an already checked-out new base. The correct choice follows the actual file content and operation, not the comforting label “mine.” Avoid broad `--ours` / `--theirs` commands as a beginner shortcut.

After resolving, `git diff --check` finds some whitespace and leftover marker issues in unstaged diffs, and `git diff --staged --check` checks the staged diff. Also search the relevant source files for conflict markers and inspect the final result. Passing those checks does not prove the combined logic is correct.

## A useful .gitignore

```gitignore
# Local secrets; commit .env.example with placeholders instead.
.env
.env.*
!.env.example

# Python local state.
.venv/
__pycache__/
*.pyc

# JavaScript dependencies and generated output.
node_modules/
dist/

# macOS Finder metadata.
.DS_Store

# Local logs.
*.log
```

Adapt to the project. A negation pattern beginning `!` makes an exception, but parent-directory exclusions can affect whether Git can descend to that path. A leading slash anchors a pattern to the directory containing the ignore file; a trailing slash targets directories.

```terminal
git check-ignore -v .env
git ls-files .env
git status --ignored --short
```

`check-ignore -v` helps locate a matching rule for an ignored path. A tracked file will usually not be reported as ignored; `git ls-files` tells you whether Git already tracks it. User-specific exclusions can also live in `.git/info/exclude` or a configured global ignore file.

## “I added it to .gitignore but Git still tracks it”

For a file that should remain locally but stop being tracked:

```terminal
git rm --cached .env
git diff --staged
```

This stages removal from the repository snapshot while leaving your working copy. After the commit is shared, other checkouts updating to that commit may have their tracked copy removed, so coordinate important configuration transitions and provide a safe template.

**If the file contained a real credential, revoke or rotate that credential first.** Removing a file in a new commit, ignoring it, or reverting it does not erase it from earlier commits, pull-request diffs, logs, or external copies. History cleanup is a separate coordinated procedure; do not attempt a blind force push.

## Line endings, binaries, and large files

A `.gitattributes` file can declare text normalization rules, for example `*.sh text eol=lf` for shell scripts. Do not add broad normalization rules to an established project without checking the resulting diff. macOS/Linux shell scripts generally need LF line endings; CRLF can cause interpreter errors.

Ordinary Git is not ideal for large frequently changing binaries. Git LFS is a separate tool and service workflow for such files. Ignoring a file after committing it does not remove its historical size. Read project policy before adding datasets, archives, database dumps, or generated media.

Official references: [gitignore](https://git-scm.com/docs/gitignore), [git merge](https://git-scm.com/docs/git-merge), [gitattributes](https://git-scm.com/docs/gitattributes).

@@ git-flows|Git, thoroughly|21 · Git flows, releases, and teams|Choose a collaboration model that fits how the software ships.
## A practical beginner default: short feature branches

Start from current main, create a small branch, make focused commits, open a pull request, pass checks, merge under team policy, and delete the finished branch. This is often called a GitHub Flow-style workflow, though the same pattern works on other hosts.

```diagram
main        A ─── B ─────────── M ─── N
                   ╲           ╱
feature             C ─── D ─── E
                     edit · review · checks
```

Main should be a useful, tested integration branch. Whether every merge deploys immediately is a separate delivery decision. Protecting main against direct unreviewed pushes can enforce the intended process.

## Trunk-based development

Developers integrate very frequently into a shared trunk, often using tiny branches and strong automated checks. Feature flags can separate “code integrated” from “feature enabled.” The main difficulty is keeping changes small and ensuring incomplete work does not destabilize the trunk.

```diagram
trunk   A ── B ── C ── D ── E ── F ── G
             ╲__╱      ╲__╱
           very short-lived branches
```

This is a team practice, not a special Git command. It requires discipline, quick feedback, and agreed release controls.

## Gitflow: separate development and release lines

Traditional Gitflow uses a main release line, a long-lived develop branch, feature branches, release branches, and hotfix branches. It can fit scheduled releases and multiple supported versions, but introduces more branch management and integration work.

```diagram
main        A ────────────────── V1 ─────────── H
             ╲                 ╱               ╱╲
develop       B ── C ── D ── E ── F ── G ────┘  ╲
                   ╲      ╱       ╲               ╲
feature             f1 ─ f2        release fixes   hotfix

Conceptual lanes: release fixes and hotfixes must reach every
applicable maintained line; the exact merge paths follow team policy.
```

Do not introduce Gitflow merely because it has an impressive diagram. If you have one continuously delivered service and a small team, a simpler short-branch workflow may be easier to maintain. If your organization already uses Gitflow, learn its actual branch rules before applying a generic online recipe.

## Compare the choices

| Workflow | Works well when | Main tradeoff |
|---|---|---|
| Short feature branches + PRs | You want clear reviews and a straightforward integration branch. | Large or long-lived branches still accumulate conflicts. |
| Trunk-based | You can integrate small changes frequently with strong checks. | Requires careful incremental design and release controls. |
| Gitflow | You manage release phases or multiple maintained versions. | More branches, backports, and policy decisions. |

## Tags mark points in history

```terminal
git tag --list
git tag -a v1.0.0 -m "Release 1.0.0"
git show v1.0.0
```

The creation command tags the current commit; inspect what HEAD is before running it. An annotated tag stores additional metadata and a message. Tags do not move automatically when you create a new commit. Prefer treating published release tags as immutable.

`git push origin v1.0.0` publishes that specific tag when authorized. Avoid `git push --tags` unless you intend to publish every local tag it selects. Creating a Git tag does not automatically create a release page, build an artifact, or deploy an application; automation may be configured to do those things.

Semantic versioning often uses `MAJOR.MINOR.PATCH` to communicate compatibility intent, but it is a versioning convention, not a Git feature. Follow your product's actual compatibility contract.

## Backports and hotfixes

A hotfix starts from the correct maintained release base, not whichever feature branch is open. Make a minimal fix, validate that release, and ensure the change reaches other supported branches as appropriate. Cherry-picking with traceability can help. A fix present only on the old release can disappear when users upgrade if it never reaches the future mainline.

## Advanced topics to recognize

**Hooks** run local Git-triggered scripts; they are not automatically a substitute for server-side checks. **Submodules** record a specific commit of another repository; cloning the parent does not always initialize them. A project may require `git submodule update --init --recursive`; follow its README. **Signed commits/tags** add identity-verification signals under an organization's key policy; they do not prove a change is correct. **Sparse checkout** selects fewer working-tree paths in a large repository; it is distinct from a shallow clone's limited history.

These topics are worth recognizing, but you do not need to master them before making useful, well-reviewed changes.

Official references: [Git workflows](https://git-scm.com/docs/gitworkflows), [Git tags](https://git-scm.com/docs/git-tag), [GitHub Flow](https://docs.github.com/en/get-started/using-github/github-flow).

@@ git-cookbook|Git, thoroughly|22 · Real-world Git scenarios|Start with the symptom, then choose the smallest appropriate action.
These recipes assume you have inspected `pwd`, `git status`, your current branch, and project rules. Replace uppercase placeholders. Do not paste every recipe in order.

## 1. “I edited files on main but have not committed”

If the changes belong on a new feature branch starting from this same point:

```terminal
git switch -c feature/my-fix
git status
```

The edits remain in place. Review and commit them there. This is easier before you have committed or moved to an incompatible base.

## 2. “My last local commit is on the wrong branch”

Starting condition: one misplaced unpublished **tip** commit on main, at least one parent commit, clean tree, and no collaborator depends on that main tip.

```terminal
git branch feature/my-fix
git reset --hard HEAD~1
git switch feature/my-fix
```

The branch creation preserves the committed tip before main moves back. **The hard reset discards local file-state changes**, so the clean-tree condition matters. If the commit was already shared, do not use this recipe on shared main; coordinate a revert or another appropriate correction instead.

## 3. “The fix exists on another existing branch”

Inspect the commit, switch to the intended destination, and apply it:

```terminal
git show FIX_COMMIT_ID
git switch TARGET_BRANCH
git cherry-pick -x FIX_COMMIT_ID
```

Test on the destination. This does not remove the original commit from the source branch. See the cherry-pick chapter for dependencies and conflicts.

## 4. “I forgot a file in my latest private commit”

```terminal
git add forgotten-file.py
git diff --staged
git commit --amend --no-edit
```

This rewrites the last commit. If already shared and rewriting is not agreed, create a follow-up commit instead.

## 5. “I staged too much”

```terminal
git restore --staged unwanted-file.py
git diff --staged
```

Working edits remain. Use `git add -p` to select individual changes afterward.

## 6. “I want to undo a published bug”

```terminal
git revert BAD_COMMIT_ID
```

This adds an inverse commit. Review and test it before publishing through your normal workflow. A merge commit needs additional parent-aware handling; do not guess `-m 1`.

## 7. “The push was rejected”

```terminal
git fetch origin
git log --left-right --graph --oneline HEAD...origin/feature/search
```

Inspect both sides. For a branch you alone rewrite under team policy, rebasing your work on `origin/feature/search` may fit; for a shared branch, a merge may fit. A permission rejection is a different problem from a non-fast-forward rejection. Do not treat force as a universal repair.

## 8. “I need to fix something urgently without disturbing WIP”

Use `git stash push -u -m "WIP before urgent fix"` for a short interruption, or create a separate worktree with `git worktree add -b hotfix/urgent ../project-hotfix main`. Check that main is the intended current base. A worktree keeps the original files in place, but shares Git metadata.

## 9. “A commit disappeared after reset or rebase”

```terminal
git reflog
git show LOST_COMMIT_ID
git branch rescue/missing-commit LOST_COMMIT_ID
```

This preserves the candidate without overwriting files. Confirm it contains the work you need. Recovering promptly improves your chances; reflog is not permanent storage.

## 10. “I made commits in detached HEAD”

If still there, `git switch -c rescue/detached-work` names the current tip. If you left, find the commit in reflog and create a branch at its ID. Do not create a new branch at an unrelated current tip and assume the lost commit is automatically included.

## 11. “A tracked file should match its last staged version”

Inspect `git diff -- FILE`, preserve any wanted edits, then use `git restore -- FILE`. This **overwrites unstaged edits** from the index. If you wanted the last committed version instead, explicitly use `--source=HEAD` and understand whether staged changes should also be changed.

## 12. “I only need an older version of one file”

```terminal
git show OLD_COMMIT_ID:path/to/file.py
```

That reads without writing. If it is the desired version, `git restore --source=OLD_COMMIT_ID -- path/to/file.py` replaces your working file. Review the diff and commit the restoration as a new change when appropriate.

## 13. “A .gitignore rule does not work”

Use `git ls-files PATH` to check if the path is tracked, then `git check-ignore -v PATH` for applicable ignore rules. Already-tracked files need an explicit tracking change; adding ignore patterns alone does not remove them. Rotate an exposed credential before repository cleanup.

## 14. “A filename case change works on my Mac but fails in CI”

Use an intermediate name, verifying it is unused:

```terminal
git mv README.md readme-case-temp.md
git mv readme-case-temp.md Readme.md
git diff --staged --stat
```

Update imports and links to the intended exact spelling too. Do not “fix” this by assuming the Linux filesystem will ignore case.

## 15. “The PR contains unrelated commits”

Check the PR base branch, your feature's starting point, and the graph. A feature accidentally based on another feature carries that ancestry. A clean new branch from the intended base followed by selected cherry-picks is often easier to reason about than an advanced `rebase --onto` repair. Keep a backup reference before changing anything; do not lose the original work.

## 16. “Merge says Already up to date, but a change seems missing”

Inspect the actual file, previous reverts, and the graph. “Up to date” describes ancestry, not a guarantee that a particular behavior remains enabled. If the original change was merged and then reverted, merging the same old branch again may not reapply it. A carefully reviewed revert-of-revert or a fresh corrected commit may be needed.

## 17. “I stashed and now cannot see a new file”

A default stash excludes untracked files. Check `git status`, `git stash list`, and the files themselves. A stash made with `-u` includes untracked files; ignored files are still excluded. Do not delete the stash until you have verified all intended contents.

## 18. “CI fails, but my laptop passes”

Compare exact runtime versions, operating-system assumptions, filename case, dependency lockfiles, environment-variable names, and commands. Reproduce the failing command locally when possible. Missing untracked configuration and differences between your local filesystem and Linux are common causes.

## 19. “Git opened an editor and I do not know how to exit”

See the editor chapter. In Vim, Escape then `:wq` saves and exits. `:cq` reports failure to the launching program when you intend to cancel. Set a familiar `core.editor` afterward. An empty commit message may also abort a normal commit, but operation-specific behavior differs.

## 20. “I want to delete all local clutter”

First use `git status --ignored --short` and `git clean -nd`. Do not run `clean -fdx` as a general tidying habit; it can remove ignored environments, local data, and secrets with no Git restore path. Delete only the known disposable paths after inspecting them.

@@ git-lab|Git, thoroughly|23 · A complete local Git laboratory|Practice branches, a merge, a backport, an undo, and a rescue without a server.
## Before running it

This lab requires Git and Bash. It creates a **new temporary repository**, sets identity only in that repository, and makes no network calls or pushes. It includes one hard reset **inside this toy repository after all files are committed** so you can practice recovering a committed tip. Do not transplant that reset into an active work project.

The companion `git-lab.sh` contains the same lab commands and can be run with `bash git-lab.sh`. It prints the temporary folder at the end. You can inspect it afterward, but move anything important out of temporary storage before relying on it.

```bash
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
```

The local signing setting avoids a global signing configuration requiring a key for this toy exercise. The local hooks setting avoids unrelated global hooks affecting the practice repository. Your normal repositories keep their own configuration.

## Predict before looking

1. Does release/practice contain `config.txt` after the cherry-pick?
2. After revert, does the backport commit still exist in release history?
3. Did the hard reset delete the object for the committed recovery file immediately?
4. Are `rescue-demo` and `recovered` at the same tip at the end?
5. Does the final merge on main have one parent or two?

<details><summary>Show the answers</summary>

1. No. The release started at the base and selected only the search change.
2. Yes. Revert added an inverse commit; it did not erase the backport.
3. No. The commit remained available and was preserved by creating `recovered` at its ID. Reflog can help find it when you did not save the ID in a variable.
4. No. `rescue-demo` stayed at the reset tip; `recovered` points to the later committed file.
5. Two. Main and feature both advanced from their common base, and the lab made a true merge.

</details>

## An optional manual conflict exercise

In the lab repository, switch to main and create a new branch `conflict/a`. Change the README title to “Title A,” stage it, and commit. Switch to main, create `conflict/b`, change the same title to “Title B,” stage it, and commit. While on conflict/b, merge conflict/a. Git should stop on the conflicting title.

Use `git status`, edit README to the title you actually want, remove markers, stage README, and run `git merge --continue`. Inspect the graph. Repeat in a fresh lab if you want to practice `git merge --abort` instead. This exercise is intentionally manual so you can read the conflict in your own editor.

## Advanced exercise: private rebase

Create a fresh feature from the lab's original base, commit a new independent file, then rebase that feature onto main. Compare the old and new commit IDs. Use a backup branch to preserve the old ID before the rebase. Explain why the content can be equivalent while the commit ID changes.

@@ docker-model|Docker essentials|24 · Images, containers, and Docker on Mac|Understand what Docker packages—and what it does not.
## Why developers use containers

A project may depend on a particular runtime, libraries, filesystem layout, database, and startup command. Docker lets you describe an image and launch isolated processes from it, reducing differences between development and other environments. You still need correct configuration, data handling, security, and compatible CPU architectures.

| Term | Plain-language explanation |
|---|---|
| Image | A packaged filesystem and metadata used to create containers. Think reusable template. |
| Container | An instance created from an image, with process state and a writable layer. |
| Dockerfile | Instructions for building an image. |
| Registry | A service that stores and distributes images. |
| Tag | A name such as `nginx:stable-alpine`; tags can move. |
| Digest | A content identifier used to reference a particular image manifest. |
| Volume | Docker-managed persistent storage independent of an ordinary container's writable layer. |
| Bind mount | A host path made available inside a container. |
| Network | A communication boundary and connectivity mechanism for containers. |
| Compose | A declarative description and CLI for related services. |

```diagram
Dockerfile + selected build-context files
                   │ docker build
                   ▼
                 IMAGE ←── pull / push ──→ registry
                   │ docker run
            ┌──────┴──────┐
            ▼             ▼
       container A    container B
       writable A     writable B
            │             │
            └── optional persistent volume / bind mount
```

One image can produce many containers. Changing a running container's files does not automatically update the image. Removing a container removes its ordinary writable layer; a properly mounted named volume can survive separately.

## Docker on macOS

For typical Linux containers, Docker Desktop runs a Linux environment behind the scenes because macOS does not provide the Linux kernel that those containers need. The `docker` command talks to a Docker daemon through a configured context. Installing just a CLI does not necessarily start or install an engine.

```terminal
docker version
docker info
docker context ls
docker compose version
```

`docker version` distinguishes client and server information. A “cannot connect to the Docker daemon” error often means Docker Desktop is stopped, the context is wrong, or the endpoint is unavailable—not that your application code is broken. Install and start Docker Desktop using the official Mac instructions if you need it.

## Apple silicon and image architecture

Apple silicon uses arm64, while some images or deployment environments use amd64. Prefer multi-platform images that support your machine. `docker run --platform linux/amd64 IMAGE` can request an amd64 image where emulation is supported, but it may be slower and is not a universal fix for every binary or kernel dependency.

A container is not a full independent computer by default, and it is not automatically a secure sandbox for arbitrary untrusted code. Do not run images you do not trust with access to your home folder or Docker's control socket.

## A useful separation

Use your terminal to control Docker. Use the Dockerfile to describe build-time instructions. Use Compose to describe run-time service relationships. Use the application's own tooling to validate behavior. Mixing those roles makes “it works in my container” harder to reproduce.

Official references: [Docker concepts](https://docs.docker.com/get-started/docker-concepts/the-basics/), [Docker Desktop for Mac](https://docs.docker.com/desktop/setup/install/mac-install/).

@@ docker-commands|Docker essentials|25 · Everyday Docker commands|Start, inspect, enter, stop, and remove the intended container.
## Your first container

With Docker installed and running:

```terminal
docker run --rm hello-world
```

Docker obtains the image if needed, creates a container, runs its default command, and removes the container when it exits because of `--rm`. The downloaded image normally remains cached.

Now run a local web server container:

```terminal
docker run -d --name learning-web -p 127.0.0.1:8080:80 nginx:stable-alpine
```

| Piece | Meaning |
|---|---|
| `run` | Create and start a new container. |
| `-d` | Detach: keep it running in the background. |
| `--name learning-web` | Give it a predictable name. |
| `-p 127.0.0.1:8080:80` | Bind Mac loopback port 8080 to container port 80. |
| `nginx:stable-alpine` | Image name and a readable tag. This tag may change over time. |

Open `http://localhost:8080`. If 8080 is in use, choose a different host port, such as `127.0.0.1:8081:80`. The container's nginx still listens on port 80.

```diagram
Mac browser
    │ http://localhost:8080
    ▼
Mac loopback port 8080
    │ published mapping
    ▼
container port 80 → nginx process
```

Without an explicit host IP, a port publication such as `-p 8080:80` normally binds on all host interfaces. For local tutorials, loopback is a useful default. Firewall and networking details still matter; port publication is not an authentication system.

## Inspect before changing

```terminal
docker ps
docker ps -a
docker logs --tail 50 learning-web
docker logs -f learning-web
docker inspect learning-web
docker stats --no-stream learning-web
docker port learning-web
```

`ps` shows running containers; `ps -a` also shows exited ones. An exited container may have completed successfully or crashed—check its status and logs. Control-C stops following `logs -f`; it does not stop the detached container. `inspect` can reveal configuration and environment values, so review before sharing its output.

## Run a command inside a running container

```terminal
docker exec -it learning-web sh
```

`-i` keeps input open and `-t` allocates a terminal. Alpine-based images often have `sh` but not `bash`. `exit` leaves this exec shell; it does not normally stop the web server's original process.

`docker exec` requires a running container. `docker run IMAGE COMMAND` instead creates a new container and overrides its default command as appropriate for the image. This distinction explains many “container is not running” errors.

## Stop, start, and remove

```terminal
docker stop learning-web
docker start learning-web
docker stop learning-web
docker rm learning-web
```

Stop asks the main process to terminate and waits before a forced stop if necessary. Start reuses an existing stopped container and its configuration. Run creates a new one. A name conflict means a container with that name already exists, even if stopped; inspect `docker ps -a` rather than repeatedly running the same creation command.

`docker rm` removes a container's writable layer. `docker rm -f` forces removal of a running container and may interrupt writes. Use the normal stop/remove sequence while learning.

## Images and storage

```terminal
docker image ls
docker image inspect nginx:stable-alpine
docker system df
docker volume ls
docker network ls
```

`docker image rm IMAGE` removes an image reference when allowed, not a running container. Prune commands remove unused resources, but “unused” does not mean “unimportant to you.” `docker system prune -a` can remove more cached images than you expect, and volume pruning can destroy data. Inspect specific resources and remove only what you understand. Do not use broad prune commands as a daily troubleshooting ritual.

Official references: [Docker CLI reference](https://docs.docker.com/reference/cli/docker/), [port publishing](https://docs.docker.com/engine/network/port-publishing/).

@@ docker-build|Docker essentials|26 · Build an image and mount files|A small working project makes Dockerfile instructions concrete.
## Create a separate demo folder

Use a new folder, not your home directory or an existing work repository. Create an `index.html` file there containing:

```html
<!doctype html>
<html lang="en">
<meta charset="utf-8">
<title>My container demo</title>
<h1>Hello from my image</h1>
</html>
```

Create a `Dockerfile` beside it with the following contents. These are **Dockerfile instructions**, not terminal commands:

```dockerfile
FROM python:3.13-slim
WORKDIR /app
COPY index.html /app/index.html
USER 10001:10001
EXPOSE 8000
CMD ["python", "-m", "http.server", "8000", "--bind", "0.0.0.0"]
```

The Python image supplies the interpreter; you do not need Python installed on your Mac to run this image. The base-image tag identifies a version line but is mutable. For strict reproducibility, resolve an approved image and pin an appropriate digest according to your project's update policy.

| Instruction | Role |
|---|---|
| `FROM` | Choose a base image. |
| `WORKDIR` | Set the working directory for following instructions and the default runtime command. |
| `COPY` | Copy selected build-context files into the image. |
| `USER` | Choose the runtime user. This demo can read the copied file without root. |
| `EXPOSE` | Document the intended listening port; it does not publish a host port. |
| `CMD` | Set the default runtime command. The JSON array avoids an extra shell interpretation step. |

This built-in HTTP file server is for development practice, not a production deployment recipe. Binding to `0.0.0.0` **inside** the container lets the port mapping reach it. You still bind the host side to loopback.

## Build and run from the demo directory

```terminal
docker build -t learning-site:1 .
docker run --rm -d --name learning-site -p 127.0.0.1:8082:8000 learning-site:1
```

The final `.` is the build context. `COPY` can use files from that context, subject to ignore rules; it cannot arbitrarily read your entire filesystem. Open `http://localhost:8082` and check the page. Stop with `docker stop learning-site`; `--rm` then removes the container automatically.

If you edit the host's `index.html`, the image's copied version does not change. Rebuild and recreate the container to get the new image contents. An existing container does not automatically adopt a new image just because its tag was rebuilt.

## .dockerignore is separate from .gitignore

An example `.dockerignore` for a real project:

```output
.git
.env
.env.*
.venv
node_modules
__pycache__
*.log
```

This controls files sent into the build context and available to relevant build steps. It does not make already-copied secrets disappear from existing image layers. Do not use `ARG` or `ENV` instructions to bake sensitive build credentials into an image. Docker provides build secret mechanisms for cases that actually need credentials.

## Bind mounts for local iteration

After stopping any old container named learning-site, run from the demo folder:

```terminal
docker run --rm -d --name learning-site -p 127.0.0.1:8082:8000 --mount type=bind,source="$PWD",target=/app,readonly learning-site:1
```

Now the container sees the host directory at `/app`, so editing `index.html` on your Mac changes what the server reads. The read-only flag prevents ordinary writes through this mount. Only mount a folder you intend to expose to the container and to this development server; do not mount your whole home directory.

A mount **hides image files at its target** for the duration of the mount; it does not merge directory contents transparently with the underlying image. Mounting an empty host directory over `/app` can make previously copied application files appear to vanish.

## Named volume versus bind mount

```diagram
Bind mount                       Named volume
Mac project directory            Docker-managed data storage
         │                                  │
         ▼                                  ▼
container /app                   container /var/lib/... 
source iteration                 persistent database data
```

Use a bind mount when the host's exact files should be visible. Use a named volume for data whose lifecycle should be independent of container replacement. On Docker Desktop, named volumes live in Docker's Linux-managed environment, not as an ordinary project subfolder. A named volume is not automatically a backup.

Official references: [Dockerfile reference](https://docs.docker.com/reference/dockerfile/), [bind mounts](https://docs.docker.com/engine/storage/bind-mounts/), [volumes](https://docs.docker.com/engine/storage/volumes/).

@@ compose|Docker essentials|27 · Docker Compose, step by step|Run a real database and its web administration UI with one configuration.
## The example: PostgreSQL + Adminer

This demo uses PostgreSQL and the Adminer database UI. Unlike a dummy two-container example, the UI actually connects to the database through the service name. Use a new folder named `compose-practice`, and create `compose.yaml` inside it with these contents:

```yaml
services:
  db:
    image: postgres:17-alpine
    environment:
      POSTGRES_USER: learner
      POSTGRES_PASSWORD: local-learning-only
      POSTGRES_DB: handbook
    volumes:
      - handbook-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U learner -d handbook"]
      interval: 5s
      timeout: 3s
      retries: 10
      start_period: 10s

  adminer:
    image: adminer:5
    ports:
      - "127.0.0.1:8083:8080"
    depends_on:
      db:
        condition: service_healthy

volumes:
  handbook-data:
```

The credentials are intentionally **fake local practice credentials** in a disposable demo, not a pattern for production password storage. Do not reuse them for real services. Avoid committing real credentials; use your project's approved secret mechanism.

The database data path shown is for the **PostgreSQL 17 image line used here**. Do not change the image to another major version without reading that image's data-directory and upgrade guidance. Database major upgrades are not interchangeable tag edits.

## Start and connect

From the compose-practice directory:

```terminal
docker compose config --quiet
docker compose up -d
docker compose ps
docker compose logs --tail 50 db
```

`config --quiet` validates without printing the resolved configuration, which may contain secret values in real projects. `up -d` creates or reconciles the defined services. Compose creates a default project network and a named volume; the actual resource names normally include a project-name prefix.

Open `http://localhost:8083` and use: **System:** PostgreSQL; **Server:** `db`; **Username:** `learner`; **Password:** `local-learning-only`; **Database:** `handbook`.

```diagram
Mac browser → 127.0.0.1:8083 → Adminer container:8080
                                      │
                         Compose network, hostname db
                                      │
                                      ▼
                              PostgreSQL container:5432
                                      │
                                      ▼
                              named data volume
```

The database does not need a published host port for Adminer to reach it. Inside Adminer's container, `localhost` means Adminer itself. `db` is the service name resolved on the Compose network. From your Mac, `db` is not automatically a resolvable hostname.

`depends_on` with a health condition waits for the database's declared health check before starting the dependent service. It does not provide permanent availability guarantees; an application still needs sensible retry and error handling if a dependency later fails.

## Inspect, execute, and query

```terminal
docker compose logs -f db
docker compose exec db psql -U learner -d handbook -c 'SELECT version();'
docker compose exec db psql -U learner -d handbook
```

The final command opens the PostgreSQL client; `\q` exits. In that client, these practice SQL statements create and query a tiny table:

```sql
CREATE TABLE IF NOT EXISTS notes (id integer PRIMARY KEY, body text NOT NULL);
INSERT INTO notes VALUES (1, 'Volumes preserve data') ON CONFLICT (id) DO NOTHING;
SELECT * FROM notes;
```

SQL is database input, not a shell command. A semicolon terminates the SQL statement. You can also use Adminer's UI to inspect the table.

## Stop versus down versus delete data

| Command | What it does | Named data volume |
|---|---|---|
| `docker compose stop` | Stop existing service containers. | Kept. |
| `docker compose start` | Start those stopped containers. | Reused. |
| `docker compose down` | Remove this project's containers and usual project networks. | Kept by default. |
| `docker compose up -d` | Create/reconcile and start services. | Reused if present. |
| `docker compose down -v` | Also remove project-managed named/attached anonymous volumes as specified. | **Data deleted** for the demo volume. |

**Data deletion consequence:** `down -v` is a deliberate reset of this demo database. Do not use it on data you need without a tested backup. External volumes follow separate ownership semantics and are not removed as ordinary Compose-owned volumes.

Test persistence by inserting the row, running `docker compose down`, starting with `up -d`, then querying again. The row should remain. A volume persists data; it does not magically protect against bad SQL, corruption, a wrong upgrade, or deliberate volume deletion.

## Build changes versus runtime changes

For services using a Dockerfile, `docker compose up -d --build` rebuilds as needed and reconciles containers. `docker compose restart` restarts existing containers; it does not apply every changed image or Compose configuration setting. Read `docker compose config` carefully when troubleshooting environment substitution, but avoid exposing secrets in shared output.

Use the modern `docker compose` command with a space. You may see the older standalone `docker-compose` form in historical tutorials. Compose file formats evolve; this example uses the current top-level `services` structure without an obsolete version declaration.

Official references: [Compose overview](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-docker-compose/), [Compose startup order](https://docs.docker.com/compose/how-tos/startup-order/), [PostgreSQL image usage](https://hub.docker.com/_/postgres), [Adminer image usage](https://hub.docker.com/_/adminer).

@@ troubleshooting|Working habits|28 · A practical troubleshooting method|Reduce uncertainty one question at a time.
## The inspection ladder

```diagram
1. Where am I?            pwd · hostname
             ↓
2. What version/context?  command -v · --version · docker context ls
             ↓
3. What state?            git status · docker compose ps · ps
             ↓
4. What evidence?         error text · logs · diff · exit code
             ↓
5. Smallest hypothesis?   one targeted change
             ↓
6. Did it work?           repeat the original failing check
```

Write down the exact command, working directory, expected result, actual result, and relevant versions. “It doesn't work” is not enough information to reproduce a problem. Remove secrets from the evidence before sharing it.

## Common terminal errors

| Symptom | Likely category | First useful check |
|---|---|---|
| `command not found` | Tool missing, PATH issue, typo, wrong shell. | `command -v TOOL`, `type -a TOOL`, installation docs. |
| `No such file or directory` | Wrong path or missing file/interpreter. | `pwd`, `ls -ld PATH`, inspect script shebang. |
| `Permission denied` | Ownership, execute bit, or access restriction. | `ls -l FILE`, exact operation, containing-directory permissions. |
| `Operation not permitted` on Mac | Privacy/protection or flags may be involved. | Check the target and macOS access settings. |
| `no matches found` | zsh expanded an unmatched wildcard. | Quote patterns meant for another tool, such as `find -name '*.py'`. |
| A quote/continuation prompt | Unclosed quote, bracket, or trailing backslash. | Control-C, then inspect the command. |
| A program appears frozen | Waiting for input, long work, network wait, pager, or deadlock. | Look at prompt state and logs; `q` for a pager, Control-C for interruption. |
| `Address already in use` | Another process owns the port. | `lsof -nP -iTCP:PORT -sTCP:LISTEN`. |
| `bad interpreter` or `^M` | Wrong shebang path or CRLF line endings. | `head -n 1 SCRIPT`, `file SCRIPT`, project editor settings. |

## Common Docker errors

| Symptom | Useful diagnosis |
|---|---|
| Cannot connect to daemon | Start the intended Docker engine and inspect `docker context ls`. |
| Container immediately exits | `docker ps -a`, then `docker logs CONTAINER`; check its configured command and exit status. |
| Name already in use | An existing stopped container may own it; inspect before removal. |
| Port allocated | Check Docker containers and host listeners; change the host port if appropriate. |
| App unreachable despite published port | Verify port mapping, container status, and whether app binds to `0.0.0.0` inside the container. |
| App cannot reach database | Check service hostname, network membership, credentials, readiness, and the app's actual configuration. |
| Files disappeared inside /app | A bind mount may be hiding the image's original files. |
| Permission denied on a mount | Compare container UID/GID, mount mode, host permissions, and Docker Desktop sharing settings. |
| No matching manifest / exec format error | Image or binary architecture may not match your platform. |
| Data missing after restart | Check the volume mount and whether a different Compose project name created a different volume. |
| Disk full | Inspect `docker system df` and your Mac disk; remove specific disposable resources deliberately. |

## A helpful bug report template

```output
Problem: local API fails to start after the configuration change.
Environment: macOS version, architecture, runtime version, relevant tool versions.
Directory / branch: project path and branch name (no sensitive paths if unnecessary).
Reproduce: exact minimal command and safe configuration steps.
Expected: API listens on the documented local port.
Actual: exact relevant error and exit code.
Evidence: a short redacted log excerpt and the relevant diff.
Tried: one or two targeted checks and their results.
```

## Know when to ask for help

Ask before uncertain changes to shared history, production data, system permissions, or credentials. Bring evidence and a specific question: “The database is healthy, but the app uses localhost inside its container; should this setting use the Compose service name db?” That is easier to answer than a screenshot with no context.

@@ finder|Quick reference|29 · A–Z command finder|Find the tool by name, then read its chapter for the surrounding context.
Use the filter below to narrow this reference. Command examples are lookup entries, **not a script to paste in full**. Some tools are optional installations; platform notes identify common differences.

<!-- COMMAND_FINDER -->

@@ glossary|Quick reference|30 · Glossary and final exercises|Words you will hear in real development conversations.
## The vocabulary

| Term | Meaning |
|---|---|
| Argument | A value passed to a command. |
| Built-in | A command implemented by the shell, such as cd. |
| CLI | Command-line interface. |
| Daemon | A long-running background service. |
| Dependency | Another package or service your program relies on. |
| Directory | A folder in the filesystem tree. |
| Exit status | A numeric result returned by a command. |
| Flag / option | An argument that changes a command's behavior. |
| Glob | A shell filename pattern, such as *.txt. |
| Kernel | The OS core responsible for processes, memory, devices, and related services. |
| Pipe | A connection from one process's output to another's input. |
| Process | A running instance of a program. |
| Shell | The program interpreting terminal input or shell scripts. |
| stdin / stdout / stderr | Standard input, normal output, and error output streams. |
| Working directory | The directory against which relative paths are resolved. |
| Commit | A Git snapshot and associated history/metadata. |
| Branch | A movable Git reference to a commit. |
| HEAD | Your currently checked-out position in Git history. |
| Index | Git's staging area for the next commit. |
| Remote | A named repository connection, such as origin. |
| Upstream | Depending on context, a branch's configured tracking target or an original project remote. |
| Merge base | A best common ancestor used when comparing/integrating histories. |
| Fast-forward | Moving a reference forward along existing ancestry without creating a merge commit. |
| Rebase | Replaying commits on a different base, usually creating replacement IDs. |
| Cherry-pick | Applying selected commits' changes to the current branch. |
| Revert | A new commit that applies an inverse change. |
| Reflog | Local record of reference movements. |
| Worktree | A checkout with its own files and index, potentially sharing repository data with others. |
| PR / MR | Pull request / merge request, a hosted review and integration proposal. |
| CI | Continuous integration: automated checks around proposed or integrated changes. |
| Image | Container filesystem template and metadata. |
| Container | Runtime instance created from an image. |
| Bind mount | A host path made visible in a container. |
| Named volume | Docker-managed persistent storage. |
| Registry | Service that stores and distributes container images. |
| Build context | Files made available to a Docker build, filtered by ignore rules. |
| Port mapping | Forwarding a host endpoint to a container endpoint. |
| Idempotent | Repeating an operation has the same intended effect as doing it once. |

## Exercise A: inspect a project before editing

You receive an unfamiliar repository. What do you inspect first?

<details><summary>One good answer</summary>

Check the directory with `pwd`, read project instructions and README, inspect `git status` and the branch, identify dependency manifests and runtime version files, and find the documented run/test commands. If the project requires a separate writable checkout, get the applicable approval and create that before editing. Do not begin with bulk upgrades or recursive cleanup.

</details>

## Exercise B: staged versus edited

You stage version A of a file, then edit it into version B. What does commit record, and how do you inspect both differences?

<details><summary>Show answer</summary>

Commit records staged version A. `git diff --staged` compares that staged version to HEAD, while `git diff` compares the working version B to the staged version A. Stage the new edits if you want B committed instead.

</details>

## Exercise C: a fix on main belongs on a release

Main contains three unrelated features plus a focused bug-fix commit. How can the release receive just the fix, and what might still go wrong?

<details><summary>Show answer</summary>

Inspect the fix and its dependencies, update the intended release branch under policy, and cherry-pick the fix, often with `-x` for traceability. It may conflict, depend on absent code, or apply cleanly but behave incorrectly on that release. Test the target release, not just main.

</details>

## Exercise D: a database container is removed

Does the database necessarily lose its rows?

<details><summary>Show answer</summary>

Rows written only into the container's writable layer are lost with removal. Data in a correctly mounted persistent volume can survive. Deleting the volume, pointing at a different volume, or using an incompatible data layout can still lose or hide the data. Persistence is not a backup.

</details>

## Exercise E: server is healthy, browser cannot reach it

The container is running and logs say port 8000. What should you check?

<details><summary>Show answer</summary>

Check whether the port is published, whether you are using the correct host port, whether the app binds to an accessible interface inside the container, and whether it actually responds. `EXPOSE 8000` alone does not publish it. Test the intended endpoint and inspect `docker port`, logs, and host listeners.

</details>

## Your everyday checklist

Know the directory and machine. Read the relevant project instructions. Know the branch and file state. Make one understandable change. Run appropriate checks. Review exactly what you will commit. Explain the reason. Preserve shared history and data unless a deliberate, authorized change calls for otherwise.

You are making progress when you can **predict what a command will change**, inspect whether it did, and explain how to recover if the result was wrong.

@@ sources|Quick reference|31 · Sources and compatibility notes|Use the documentation for the tool version actually installed.
This handbook was prepared **30 October 2026**, with examples written for macOS, interactive zsh, Git 2.28+ (for the initialization and branch commands used here), and the modern Docker Compose plugin. The explanations and exercises are original; the links below are primary documentation for further detail. The live documentation may describe newer options than the software installed on your machine.

## Terminal and macOS

- [Apple Terminal User Guide](https://support.apple.com/guide/terminal/welcome/mac): Terminal usage and platform-specific behavior.
- [zsh manual: shell grammar](https://zsh.sourceforge.io/Doc/Release/Shell-Grammar.html): command interpretation, pipelines, and quoting.
- [Homebrew installation](https://docs.brew.sh/Installation): supported installation and PATH setup.
- Your local manuals: `man ls`, `man cp`, `man find`, `man sed`, `man chmod`, `man ssh`, and `man rsync` describe the actual installed utilities.

## Git

- [Git reference](https://git-scm.com/docs) and [Pro Git](https://git-scm.com/book/en/v2): a complete official learning path and command reference.
- [Status](https://git-scm.com/docs/git-status), [diff](https://git-scm.com/docs/git-diff), [log](https://git-scm.com/docs/git-log), [commit](https://git-scm.com/docs/git-commit).
- [Switch](https://git-scm.com/docs/git-switch), [merge](https://git-scm.com/docs/git-merge), [rebase](https://git-scm.com/docs/git-rebase), [cherry-pick](https://git-scm.com/docs/git-cherry-pick).
- [Restore](https://git-scm.com/docs/git-restore), [reset](https://git-scm.com/docs/git-reset), [revert](https://git-scm.com/docs/git-revert), [clean](https://git-scm.com/docs/git-clean).
- [Fetch](https://git-scm.com/docs/git-fetch), [pull](https://git-scm.com/docs/git-pull), [push](https://git-scm.com/docs/git-push).
- [Stash](https://git-scm.com/docs/git-stash), [reflog](https://git-scm.com/docs/git-reflog), [worktree](https://git-scm.com/docs/git-worktree), [bisect](https://git-scm.com/docs/git-bisect).
- [Ignore rules](https://git-scm.com/docs/gitignore), [attributes](https://git-scm.com/docs/gitattributes), [workflows](https://git-scm.com/docs/gitworkflows), [tags](https://git-scm.com/docs/git-tag).
- [GitHub Flow](https://docs.github.com/en/get-started/using-github/github-flow): a hosting-provider explanation of the short feature-branch model.

## Docker

- [Docker concepts](https://docs.docker.com/get-started/docker-concepts/the-basics/) and [Mac installation](https://docs.docker.com/desktop/setup/install/mac-install/).
- [Docker CLI](https://docs.docker.com/reference/cli/docker/) and [Dockerfile reference](https://docs.docker.com/reference/dockerfile/).
- [Port publishing](https://docs.docker.com/engine/network/port-publishing/), [bind mounts](https://docs.docker.com/engine/storage/bind-mounts/), [volumes](https://docs.docker.com/engine/storage/volumes/).
- [Compose concepts](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-docker-compose/), [Compose CLI](https://docs.docker.com/reference/cli/docker/compose/), and [startup order](https://docs.docker.com/compose/how-tos/startup-order/).
- [Official PostgreSQL image](https://hub.docker.com/_/postgres) and [Adminer image](https://hub.docker.com/_/adminer) for service-specific configuration.

## Platform differences to remember

| Topic | macOS | Common Linux environment |
|---|---|---|
| Default user shell | Often zsh. | Varies; often Bash on servers. |
| Home path | `/Users/NAME` | Often `/home/NAME`. |
| Core utilities | BSD/Apple variants. | Often GNU variants. |
| In-place sed | Commonly `sed -i '' ...` | Commonly `sed -i ...`. |
| Readlink canonicalization | Options vary by macOS version/tool. | `readlink -f` common in GNU examples. |
| Service manager | launchd. | Often systemd, but not universal. |
| Package manager | Homebrew is a common optional developer choice. | apt, dnf, pacman, apk, or others by distribution. |
| Listener inspection | `lsof` is useful. | `ss` is common; other tools vary. |
| Docker Linux containers | A Linux environment is provided by Docker Desktop or another compatible setup. | Can use the host's Linux kernel directly. |
| Filesystem case | Often insensitive by default; configurations vary. | Commonly sensitive. |

No handbook can predict every organization's branch policy or every tool-version change. Use `--version`, installed help, the repository README, and the exact error message to adapt examples intelligently.
