# Developer Field Guide: learning experience

## Intent and accepted decisions

Teach mainstream developer commands to a beginner first, and retain a substantial advanced reference. The user asked for a lighter default, a distinct Git guide, better real-case diagrams, working interactive practice, Windows as well as macOS/Linux, gcloud basics, local profiles instead of online authentication, progress tracking, cheat-sheet exports, and a public GitHub repository under Anas-Ah25 with GitHub Pages hosting.

The implementation is an entirely static site. Local profiles are explicitly browser-local identities, not authenticated accounts. No remote database, account creation, tracking scripts, or cloud login is part of the site. A profile's progress can be exported and imported by the user. The site must not claim cross-device synchronization.

## Information architecture

Top navigation: Terminal, Git, Docker, gcloud, Practice, Progress. Git has its own entry URL (git.html) and dedicated course navigation. The top bar also has a macOS / Linux / Windows selector. A prominent Everyday / Advanced control chooses learning depth. Default: Everyday, macOS, Terminal overview.

A course overview shows its purpose and a short ordered list of lessons. Reading displays one lesson at a time, with previous/next actions, an optional practice action, and a completion checkbox. It must not render a 20,000-word wall of text on first load. Advanced mode retains the original detailed Unix, Git and Docker chapters and provides explicit Windows references. Common command reference has a dedicated searchable route and follows platform and depth selections.

The Everyday route focuses on pwd/ls/cd, common file work, reading/search, shell basics, project structure, Git everyday work and recoveries, Docker lifecycle/ports/volumes, and gcloud identity/project/context inspection. Uncommon flags and deeper shell internals belong in Advanced. A beginner lesson targets one outcome and roughly 2–5 minutes of reading with concrete command explanations and expected outcomes.

## Platform behavior

macOS examples use zsh/Unix commands. Linux examples use common Bash/Unix commands with explicit distribution notes where package managers and services differ. Windows examples use PowerShell, not cmd.exe or a misleading replacement of Unix flags. Git and Docker CLI commands are common unless shell syntax or paths vary. Advanced historical Unix material must have an explicit shell/platform notice on Windows; native Windows guidance and a PowerShell practice-lab companion are provided. Platform selection updates visible code examples, practice expectations and cheat sheets. Never silently suggest chmod, sudo, grep flags or POSIX shell assignments as native PowerShell syntax.

## Diagrams and teaching cases

Use accessible SVG diagrams with labeled branch lanes, HEAD, commit IDs, ancestry, and short commit descriptions. A stepper pairs each graph change with a real command, observed file state, and expected outcome. Cases: feature work meets an updated main; a release receives only a selected bug fix; conflicting edits are resolved. Separate the lesson's narrative from an operational command block. Show when a command is illustrative and requires a real commit ID.

Interactive explanations do not execute shell commands. A real downloadable local Git lab remains available for actual terminal practice, with clean prerequisites and no network/push behavior.

## Practice model

All browser practice is explicitly a simulation with a documented limited command vocabulary. Each exercise starts from known in-memory state; commands update modeled filesystem or Git state. Correctness is checked from the resulting state and relevant validation actions, not merely by matching one exact typed answer. Common semantically equivalent inputs should work where supported. Unsupported syntax produces a clear message rather than being passed to the real host.

Exercises cover: reading a file after navigating; staging and committing only the intended tracked change; cherry-picking a fix onto a release while leaving an experimental feature out; choosing a local Docker port mapping; activating and verifying the intended gcloud account/project configuration. Reset returns the simulation to its initial state. Hint and solution reveal are supported; recorded completion distinguishes independently completed versus solution-assisted practice. Switching exercises must not falsely award a result from a different state.

## Local profiles and progress

Guest use works without setup. A user can create a named local profile, switch profiles, rename a profile and view a dashboard. Save completed lesson IDs, completed exercise IDs, hint/solution assistance, and preferences in versioned browser-local storage. UI clearly says local profiles are not online accounts and clearing browser data can remove progress. If storage is unavailable, show session-only mode and allow export.

Export progress as versioned JSON with schema validation on import, bounds on size and names, no executable HTML injection, and an explicit merge/replace choice. Default import merges into the current profile; do not silently overwrite another profile. A user can transfer the exported file manually. Prefer preserving unrelated existing profiles.

## Cheat sheets

A route offers short platform-aware cheat sheets for Terminal, Git, Docker and gcloud. Select the desired topics and depth, preview the result, then download Markdown or HTML, or print/save PDF through the browser. Export is a real downloadable file with the selected platform and topics named in its header. The offline content must not depend on remote fonts or scripts. CSV is unnecessary; commands, explanations and cautions are better represented in Markdown/HTML.

## Accessibility and responsive behavior

Keyboard-operable controls, visible focus, meaningful button names, proper labels, semantic headings, announced practice feedback, readable contrast, reduced-motion support and horizontally scrollable code/graph regions without whole-page horizontal overflow. At narrow widths, navigation collapses into a labeled menu; platform/depth choices remain discoverable. Diagram text must have a meaningful accessible title/description. Search should preserve course/context and offer an obvious way back.

## Verification

Test filesystem transitions, Git working/index/history separation, cherry-pick source/target ancestry and excluded changes, incorrect commands, exercise reset, assisted completion, platform changes, profile separation, persistence after reload, export/import validation and merging, empty/invalid imports, filtered cheat sheets and actual downloaded contents, course routing/back/forward, search, keyboard navigation, narrow viewport, static resource paths under a GitHub Pages project prefix, and no console exceptions. Re-execute the real local Git lab only when its contents change. Validate Compose configuration without starting services if Docker is unavailable.

## Publication

Create a new public developer-field-guide repository in the verified Anas-Ah25 account after the revised result is reviewable and validated. Publish only the intended site, teaching examples and documentation; exclude private paths, credentials, temporary QA output and unrelated extraction repository content. Use GitHub Pages from an explicit public static source. Confirm repository visibility/account, Pages configuration, deployment completion and the actual live URL. Do not publish into the user's other GitHub account.

## Implementation choices

Use HTML/CSS/JavaScript without a framework or external runtime dependencies. Keep source and output in a separate local directory. Use shared static assets and entry pages for direct links; a standalone bundle can be exported for offline use. Repository naming, palette and typography may be settled by the implementer. Existing forest/cream editorial styling can be refined rather than discarded.
