# Read before running. Creates a new temporary toy repository; no network or push.
# The hard reset below happens only after the toy files are committed.
$ErrorActionPreference = 'Stop'
function Invoke-LabGit {
    & git @args
    if ($LASTEXITCODE -ne 0) { throw 'Git command failed; stop and inspect the output.' }
}
$labPath = Join-Path ([System.IO.Path]::GetTempPath()) ('git-learning-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $labPath | Out-Null
Set-Location -LiteralPath $labPath
Invoke-LabGit init -b main
Invoke-LabGit config user.name 'Git Learner'
Invoke-LabGit config user.email 'learner@example.invalid'
Invoke-LabGit config commit.gpgsign false
$emptyHooks = Join-Path $labPath 'empty-hooks'
New-Item -ItemType Directory -Path $emptyHooks | Out-Null
Invoke-LabGit config core.hooksPath $emptyHooks
Set-Content -LiteralPath README.md -Value '# Learning Git'
Invoke-LabGit add README.md
Invoke-LabGit commit -m 'Create practice project'
$baseCommit = (& git rev-parse HEAD)
if ($LASTEXITCODE -ne 0) { throw 'Cannot read the base commit.' }
Invoke-LabGit switch -c feature/search
Set-Content -LiteralPath search.txt -Value 'Search returns matching documents.'
Invoke-LabGit add search.txt
Invoke-LabGit commit -m 'Add search behavior'
$searchCommit = (& git rev-parse HEAD)
if ($LASTEXITCODE -ne 0) { throw 'Cannot read the search commit.' }
Invoke-LabGit switch main
Set-Content -LiteralPath config.txt -Value 'Main branch configuration.'
Invoke-LabGit add config.txt
Invoke-LabGit commit -m 'Add project configuration'
Invoke-LabGit merge --no-ff feature/search -m 'Merge search feature'
Invoke-LabGit switch -c release/practice $baseCommit
Invoke-LabGit cherry-pick -x $searchCommit
Invoke-LabGit revert --no-edit HEAD
if (Test-Path -LiteralPath search.txt) { throw 'The revert did not remove the practice search file.' }
Invoke-LabGit switch main
Invoke-LabGit switch -c rescue-demo
Set-Content -LiteralPath recover.txt -Value 'This committed work can be recovered.'
Invoke-LabGit add recover.txt
Invoke-LabGit commit -m 'Add recovery practice file'
$lostTip = (& git rev-parse HEAD)
if ($LASTEXITCODE -ne 0) { throw 'Cannot read the recovery commit.' }
Invoke-LabGit reset --hard 'HEAD~1'
Invoke-LabGit reflog -5
Invoke-LabGit branch recovered $lostTip
Invoke-LabGit switch recovered
if (-not (Test-Path -LiteralPath recover.txt)) { throw 'Recovery file was not restored.' }
Invoke-LabGit log --graph --decorate --oneline --all
Invoke-LabGit status --short
Write-Output "Lab complete. Repository: $labPath"
