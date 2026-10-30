from pathlib import Path
import re,json,html,shutil,mistune
ROOT=Path(__file__).parent
OLD=ROOT / "source"
E=lambda s:html.escape(s,quote=True)
class Renderer(mistune.HTMLRenderer):
 def block_code(self,code,info=None):
  lang=(info or 'text').strip();os='all';kind='code'
  if lang in ['mac','linux','windows','unix']:os=lang
  if lang in ['diagram','output']:kind=lang
  if lang=='bash':os='unix'
  if lang=='terminal' and re.search(r'^(brew |xcode-select |sw_vers)',code,re.M):os='mac'
  if lang=='terminal' and re.search(r'^(expected_remote_tip=|practice_dir=|printf|chmod|cd |mkdir|bash |source )',code,re.M):os='unix'
  labels={'unix':'macOS / Linux · shell','mac':'macOS · zsh','linux':'Linux · shell','windows':'Windows · PowerShell','git':'Git CLI · all platforms','cli':'CLI · all platforms','terminal':'Command example · read setup','bash':'Bash script','diagram':'Concept diagram','output':'Reference / expected output','html':'File · HTML','yaml':'File · YAML','dockerfile':'File · Dockerfile','python':'Python example','sql':'SQL · database input','gitignore':'File · .gitignore','diff':'Diff · not a command'}
  return f'<div class="code-block {kind}" data-os="{os}"><div class="code-label"><span>{E(labels.get(lang,lang))}</span><button type="button" data-copy aria-label="Copy {E(labels.get(lang,lang))}">Copy</button></div><pre><code>{html.escape(code.rstrip())}</code></pre></div>\n'
md=mistune.create_markdown(renderer=Renderer(escape=False),plugins=['table'])
def render(s):
 h=md(s);return re.sub(r'(<table>.*?</table>)',r'<div class="table-wrap">\1</div>',h,flags=re.S)
lessons=[]
for text in re.split(r'^@@ (?=[a-z-]+\|)',(ROOT/'lessons.md').read_text(),flags=re.M)[1:]:
 header,body=text.split('\n',1);id,course,title,subtitle=header.split('|',3)
 level='advanced' if course.endswith('-advanced') else 'basics';platforms=['mac','linux','windows']
 if course=='windows-advanced':course='terminal';platforms=['windows']
 elif course=='linux-advanced':course='terminal';platforms=['linux']
 elif course=='gcloud-advanced':course='gcloud'
 lessons.append(dict(id=id,course=course,title=title,subtitle=subtitle,level=level,platforms=platforms,html=render(body),text=re.sub(r'[`#*]','',body),minutes=max(2,round(len(body.split())/180))))
for text in re.split(r'^@@ (?=[a-z-]+\|)',(OLD/'advanced.md').read_text(),flags=re.M)[1:]:
 header,body=text.split('\n',1);id,group,title,subtitle=header.split('|',3)
 if id in ['start','finder','glossary','sources']:continue
 course='git' if id.startswith('git-') else 'docker' if id.startswith('docker-') or id=='compose' else 'terminal'
 title=re.sub(r'^\d+ · ','',title)
 platforms=['mac','linux','windows'] if course in ['git','docker'] or id in ['structure','troubleshooting'] else ['mac','linux']
 lessons.append(dict(id=id,course=course,title=title,subtitle=subtitle,level='advanced',platforms=platforms,html=render(body),text=body,minutes=max(3,round(len(body.split())/180))))
# Original command data is a source reference, not an installed build dependency.
finder_raw=(OLD/'command-index.txt').read_text()
commands=[]
for line in finder_raw.strip().splitlines():
 name,example,desc,chapter,note=[x.replace('§PIPE§','|') for x in line.replace(r'\|','§PIPE§').split('|')]
 topic='git' if name.startswith('git') else 'docker' if name.startswith('docker') else 'terminal'
 common=topic in ['git','docker']
 commands.append(dict(name=name,example=example,desc=desc,note=note,topic=topic,level='advanced',platforms=['mac','linux','windows'] if common else ['mac','linux']))
# Short, task-oriented sheets. Basics never starts with the entire reference.
sheets=[]
def add(topic,task,mac,linux,windows,note='',advanced=False):sheets.append(dict(topic=topic,task=task,mac=mac,linux=linux,windows=windows,note=note,advanced=advanced))
for row in [
 ('Where am I?','pwd','pwd','Get-Location',''),
 ('List files','ls','ls','Get-ChildItem',''),
 ('Include hidden entries','ls -lah','ls -lah','Get-ChildItem -Force','Flags are not interchangeable.'),
 ('Enter a folder','cd docs','cd docs','Set-Location docs','Folder must exist.'),
 ('Go one folder up','cd ..','cd ..','Set-Location ..',''),
 ('Create a folder','mkdir notes','mkdir notes','New-Item -ItemType Directory -Path notes','Creates an entry; inspect if it exists.'),
 ('Read a small file','cat README.md','cat README.md','Get-Content -LiteralPath README.md',''),
 ('Search a literal string',"grep -n -F 'timeout' app.log","grep -n -F 'timeout' app.log","Select-String -LiteralPath app.log -Pattern 'timeout' -SimpleMatch",''),
 ('Follow a log','tail -f app.log','tail -f app.log','Get-Content -LiteralPath app.log -Tail 20 -Wait','Control-C stops following.'),
 ('Copy a file','cp -i note.txt copy.txt','cp -i note.txt copy.txt','Copy-Item note.txt copy.txt -Confirm','Can overwrite a destination.'),
 ('Rename a file','mv -i old.txt new.txt','mv -i old.txt new.txt','Move-Item old.txt new.txt -Confirm','Check the destination.'),
 ('Delete one known file','rm -i reviewed.txt','rm -i reviewed.txt','Remove-Item -LiteralPath reviewed.txt -Confirm','Deletion generally bypasses graphical Trash/Recycle Bin.'),
 ('Locate a command','command -v git','command -v git','Get-Command git',''),
 ('Inspect a listener','lsof -nP -iTCP:8000 -sTCP:LISTEN',"ss -ltnp 'sport = :8000'",'Get-NetTCPConnection -LocalPort 8000 -State Listen','Inspect the owner before stopping it.'),
 ('Read help','man ls','man ls','Get-Help Get-ChildItem -Examples','For Git, use git help COMMAND.'),
 ('Read HTTP headers','curl -I https://example.com','curl -I https://example.com','curl.exe -I https://example.com','curl.exe avoids the Windows PowerShell curl alias.'),
 ('Set a session environment variable','export APP_MODE=development','export APP_MODE=development',"$env:APP_MODE = 'development'",'This shell and future children; not a global change.'),
 ('Print a variable',"printf '%s\n' \"$APP_MODE\"","printf '%s\n' \"$APP_MODE\"",'$env:APP_MODE',''),
 ]:add('terminal',*row)
for task,cmd,note,adv in [
 ('Inspect current state','git status','',False),('Review unstaged edits','git diff','Untracked file contents are not shown.',False),('Stage one file','git add README.md','Selects its contents now, not future edits.',False),('Review the next commit','git diff --staged','',False),('Save a local snapshot','git commit -m "Explain setup"','Local; publishing is separate.',False),('Create a feature branch','git switch -c feature/search','Starts at the current commit.',False),('Switch branches','git switch main','Inspect local changes first.',False),('Inspect history','git log --graph --decorate --oneline --all','',False),('Fetch remote history','git fetch origin','Normally no source-file integration.',False),('Update clean tracking branch','git pull --ff-only','Stops on divergence.',False),('Publish a feature','git push -u origin feature/search','Changes remote state; obey project policy.',False),('Unstage without discarding','git restore --staged README.md','Working edits stay.',False),('Backport one change','git cherry-pick -x COMMIT_ID','Inspect dependencies; test target branch.',False),('Undo a shared bad change','git revert COMMIT_ID','Adds an inverse commit; can conflict.',False),('Replay a private feature','git rebase origin/main','Rewrites commits; coordinate if already shared.',True),('Pause unfinished work','git stash push -u -m "Reason"','Ignored files excluded; local only.',True),('Find a moved-away tip','git reflog','Not permanent backup.',True),('Preserve a found commit','git branch rescue/work COMMIT_ID','Preserves committed content only.',True),('Inspect an old file','git show COMMIT_ID:path/to/file','Read without overwriting.',True),('Create another checkout','git worktree add -b hotfix/name ../project-hotfix main','Shares Git metadata.',True)]:add('git',task,cmd,cmd,cmd,note,adv)
for task,cmd,note in [
 ('Inspect engine connection','docker version','Client and server are different.'),('List all containers','docker ps -a','Includes stopped containers.'),('Start a local web demo','docker run -d --name learning-web -p 127.0.0.1:8080:80 nginx:stable-alpine','Host 8080 → container 80; loopback binding.'),('Read recent logs','docker logs --tail 50 learning-web','May contain sensitive values.'),('Stop the service','docker stop learning-web','Requests termination.'),('Remove stopped container','docker rm learning-web','Deletes its writable layer.'),('Inspect Compose config','docker compose config --quiet','Validates without printing resolved values.'),('Start a Compose project','docker compose up -d','Run in the intended project folder.'),('Inspect project services','docker compose ps',''),('Stop Compose containers','docker compose stop','Keeps containers and volumes.'),('Remove Compose containers','docker compose down','Named volumes retained by default; container layers removed.')]:add('docker',task,cmd,cmd,cmd,note)
for task,cmd,note in [
 ('Inspect tool version','gcloud version',''),('Inspect CLI accounts','gcloud auth list','Do not confuse browser login with CLI identity.'),('Inspect current settings','gcloud config list',''),('Read the selected project','gcloud config get-value project',''),('List saved configurations','gcloud config configurations list',''),('Activate a saved context','gcloud config configurations activate learning','Changes local CLI defaults.'),('Choose a project','gcloud config set project YOUR_PROJECT_ID','Does not grant IAM access.'),('Authorize the CLI','gcloud auth login','Starts authorization and stores CLI credentials.'),('Authorize local application ADC','gcloud auth application-default login','Separate credential setup; use when your app needs it.'),('Inspect a project','gcloud projects describe YOUR_PROJECT_ID --format=json','Use an authorized real project ID.'),('List enabled APIs','gcloud services list --enabled --project=YOUR_PROJECT_ID','Read operation; needs permission.')]:add('gcloud',task,cmd,cmd,cmd,note)
for sheet in sheets:
 # Add native PowerShell and cloud entries to the detailed finder without pretending Unix aliases match flags.
 if sheet['topic']=='gcloud':commands.append(dict(name=sheet['task'],example=sheet['mac'],desc=sheet['task'],note=sheet['note'],topic='gcloud',level='basics',platforms=['mac','linux','windows']))
 elif sheet['topic']=='terminal':commands.append(dict(name=sheet['windows'].split()[0],example=sheet['windows'],desc=sheet['task'],note=sheet['note'],topic='terminal',level='basics',platforms=['windows']))
courses={
 'terminal':dict(name='Terminal',tagline='The commands you will actually use.',description='Navigate, read files, find text, and understand what your shell is doing. Start with three commands, not three hundred.',icon='>_',color='green'),
 'git':dict(name='Git',tagline='Understand history. Recover with confidence.',description='A dedicated guide to everyday work, real branching cases, cherry-picking fixes, and handling mistakes.',icon='⑂',color='rust'),
 'docker':dict(name='Docker',tagline='Run your project with a repeatable environment.',description='Images, containers, ports, data, and Compose. Learn the everyday loop before the deeper build reference.',icon='▤',color='blue'),
 'gcloud':dict(name='gcloud',tagline='Know the identity and project behind each command.',description='Inspect accounts, select configurations, understand local credentials, and start with read-first cloud commands.',icon='☁',color='blue')}
(ROOT/'assets'/'content.js').write_text('window.GUIDE_DATA = '+json.dumps(dict(lessons=lessons,courses=courses,sheets=sheets,commands=commands),ensure_ascii=False).replace('</','<\\/')+';\n')
raw=(OLD/'advanced.md').read_text()
parts=re.split(r'^@@ (?=[a-z-]+\|)',raw,flags=re.M)[1:]
full=[]
for part in parts:
 header,body=part.split('\n',1)
 id,group,title,subtitle=header.split('|',3)
 if id not in ['start','finder']: full.append('# '+title+'\n\n'+subtitle+'\n\n'+body.strip())
(ROOT/'advanced-reference.md').write_text('\n\n'.join(full)+'\n')
print(json.dumps({'lessons':len(lessons),'basics':len([x for x in lessons if x['level']=='basics']),'reference_entries':len(commands),'sheets':len(sheets)}))
