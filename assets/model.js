(function(root){
'use strict';
const exercises={
 navigate:{name:'Find and read the setup notes',topic:'terminal',goal:'Move into docs and read its README.md.',hint:'List the project, enter docs, then read README.md. Windows uses Get-ChildItem, Set-Location, and Get-Content.',solutions:{unix:['ls','cd docs','cat README.md'],windows:['Get-ChildItem','Set-Location docs','Get-Content README.md']}},
 commit:{name:'Commit only the intended change',topic:'git',goal:'Commit the edited README.md on feature/docs. Keep scratch.txt out of the commit.',hint:'Inspect status. Stage README.md explicitly. Review the staged diff and commit with a message.',solutions:{unix:['git status','git add README.md','git diff --staged','git commit -m "Document local setup"'],windows:['git status','git add README.md','git diff --staged','git commit -m "Document local setup"']}},
 cherry:{name:'Backport the invoice fix',topic:'git',goal:'On release/1.4, apply fix f1a2b3c. Preserve the release settings and leave experimental-export.txt out.',hint:'Inspect f1a2b3c, switch to release/1.4, then cherry-pick that fix. e4d5c6b is the experiment.',solutions:{unix:['git show f1a2b3c','git switch release/1.4','git cherry-pick -x f1a2b3c','git status'],windows:['git show f1a2b3c','git switch release/1.4','git cherry-pick -x f1a2b3c','git status']}},
 docker:{name:'Publish the correct local port',topic:'docker',goal:'Run nginx so your computer uses localhost:8080, forwarding to container port 80, with a loopback binding. Then inspect it.',hint:'Port syntax is host-IP:host-port:container-port. Use 127.0.0.1:8080:80, then docker ps.',solutions:{unix:['docker run -d --name practice-web -p 127.0.0.1:8080:80 nginx:stable-alpine','docker ps'],windows:['docker run -d --name practice-web -p 127.0.0.1:8080:80 nginx:stable-alpine','docker ps']}},
 cloud:{name:'Select and verify the cloud context',topic:'gcloud',goal:'Activate learning, set its project to guide-sandbox, then read the selected project back.',hint:'Use config configurations activate, config set project, and config get-value project. All names here are fictional.',solutions:{unix:['gcloud config configurations activate learning','gcloud config set project guide-sandbox','gcloud config get-value project'],windows:['gcloud config configurations activate learning','gcloud config set project guide-sandbox','gcloud config get-value project']}}
};
const clone=x=>JSON.parse(JSON.stringify(x));
function words(line){
 if(typeof line!=='string'||line.length>2000)throw Error('Use a command shorter than 2,000 characters.');
 const out=[];let token='',quote=null,active=false;
 for(let i=0;i<line.length;i++){const c=line[i];if(quote){if(c===quote)quote=null;else token+=c;active=true;continue;}if(c==='"'||c==="'"){quote=c;active=true;}else if(/[\r\n;|&<>]/.test(c))throw Error('This simulator accepts one command at a time, without shell operators.');else if(/\s/.test(c)){if(active){out.push(token);token='';active=false;}}else{token+=c;active=true;}}
 if(quote)throw Error('A quote is still open. Close it and try again.');if(active)out.push(token);return out;
}
function initial(id){if(!exercises[id])throw Error('Unknown exercise.');const common={id,commands:0,assisted:false,done:false};
 if(id==='navigate')return {...common,cwd:'/project',files:{'/project/README.md':'Welcome. Setup details are in docs/README.md.','/project/docs/README.md':'Setup: use the project README to find the run and test commands.'},seen:false};
 if(id==='commit')return {...common,branch:'feature/docs',head:{'README.md':'Old setup'},index:{'README.md':'Old setup'},work:{'README.md':'New documented setup','scratch.txt':'Private scratch note'},commits:[]};
 if(id==='cherry'){const base={'invoice.py':'amount = float(raw_amount)','release.ini':'stable = true'};return {...common,branch:'main',refs:{main:'e4d5c6b','release/1.4':'r100000'},commits:{base001:{parents:[],files:base,message:'Original release'},r100000:{parents:['base001'],files:clone(base),message:'Maintain release 1.4'},f1a2b3c:{parents:['base001'],files:{...base,'invoice.py':'amount = float(raw_amount or 0)'},message:'Handle empty invoice amounts'},e4d5c6b:{parents:['f1a2b3c'],files:{...base,'invoice.py':'amount = float(raw_amount or 0)','experimental-export.txt':'unfinished'},message:'Experiment with export'}},work:{...base,'invoice.py':'amount = float(raw_amount or 0)','experimental-export.txt':'unfinished'}};}
 if(id==='docker')return {...common,container:null,verified:false};
 return {...common,active:'work',configs:{work:{project:'production-placeholder',account:'ops@example.invalid'},learning:{project:'old-practice-project',account:'learner@example.invalid'}},verified:false};
}
function goal(s){if(s.id==='navigate')return s.cwd==='/project/docs'&&s.seen;if(s.id==='commit')return s.branch==='feature/docs'&&s.commits.length>0&&s.head['README.md']==='New documented setup'&&!Object.hasOwn(s.head,'scratch.txt');if(s.id==='cherry')return s.branch==='release/1.4'&&s.work['invoice.py']==='amount = float(raw_amount or 0)'&&s.work['release.ini']==='stable = true'&&!Object.hasOwn(s.work,'experimental-export.txt')&&s.refs['release/1.4']!=='r100000';if(s.id==='docker')return !!s.container&&s.container.running&&s.container.mapping==='127.0.0.1:8080:80'&&s.verified;return s.active==='learning'&&s.configs.learning.project==='guide-sandbox'&&s.verified;}
function pathFor(cwd,p){p=(p||'.').replace(/\\/g,'/');if(p==='~')return '/project';let parts=(p.startsWith('/')?p:cwd+'/'+p).split('/'),out=[];for(const part of parts){if(part==='..')out.pop();else if(part&&part!=='.')out.push(part);}return '/'+out.join('/');}
function diff(a,b){const lines=[];for(const k of new Set([...Object.keys(a),...Object.keys(b)])){if(a[k]!==b[k])lines.push(k+'\n- '+(a[k]??'(absent)')+'\n+ '+(b[k]??'(absent)'));}return lines.join('\n')||'No differences.';}
function run(state,line){const s=clone(state);let t;try{t=words(line);}catch(e){return {state:s,output:e.message,error:true};}if(!t.length)return {state:s,output:'Type a command first.',error:true};s.commands++;let output='',error=false;const fail=m=>{throw Error(m);};
 try{const cmd=t[0].toLowerCase();if(cmd==='help')output='Limited simulation. '+({navigate:'pwd / Get-Location; ls / Get-ChildItem; cd / Set-Location; cat / Get-Content.',commit:'git status, diff [--staged], add FILE, restore --staged FILE, commit -m MESSAGE.',cherry:'git status, log, show COMMIT, switch BRANCH, cherry-pick [-x] COMMIT.',docker:'docker run [-d] [--name NAME] -p MAPPING nginx:TAG; docker ps; docker stop NAME.',cloud:'gcloud auth list; config list; config configurations list/activate NAME; config set/get-value project.'}[s.id]);
 else if(s.id==='navigate'){
 t=t.filter(x=>!['-LiteralPath','-Path'].includes(x));
 if(['pwd','get-location'].includes(cmd))output=s.cwd;
 else if(['ls','get-childitem','dir'].includes(cmd)){const target=pathFor(s.cwd,t[1]);if(!['/project','/project/docs'].includes(target))fail('That folder is not in this exercise.');output=target==='/project'?'README.md\ndocs/':'README.md';}
 else if(['cd','set-location'].includes(cmd)){const p=pathFor(s.cwd,t[1]);if(!['/project','/project/docs'].includes(p))fail('No such practice folder. Use ls or Get-ChildItem to inspect.');s.cwd=p;output='Location: '+p;}
 else if(['cat','get-content'].includes(cmd)){const p=pathFor(s.cwd,t[1]);if(!Object.hasOwn(s.files,p))fail('No such practice file.');output=s.files[p];if(p==='/project/docs/README.md')s.seen=true;}
 else fail('This navigation exercise supports only listing, moving, and reading. Type help.');
 }
 else if(s.id==='commit'){
 if(t[0]!=='git')fail('Use a Git command. Type help for supported operations.');const op=t[1];
 if(op==='status'){output='On branch '+s.branch+'\n'+Object.keys(s.work).map(k=>!Object.hasOwn(s.head,k)?(Object.hasOwn(s.index,k)?'A  ':'?? ')+k:(s.index[k]!==s.head[k]?'M':' ')+(s.work[k]!==s.index[k]?'M':' ')+' '+k).join('\n');}
 else if(op==='diff')output=t.includes('--staged')?diff(s.head,s.index):diff(s.index,Object.fromEntries(Object.entries(s.work).filter(([k])=>Object.hasOwn(s.index,k))));
 else if(op==='add'){const files=t.slice(2);if(!files.length)fail('Name the file to stage.');const selected=files.some(x=>x==='.'||x==='-A')?Object.keys(s.work):files;for(const k of selected)if(!Object.hasOwn(s.work,k))fail('No such practice file: '+k);for(const k of selected)s.index[k]=s.work[k];output='Staged: '+selected.join(', ');}
 else if(op==='restore'&&t[2]==='--staged'){const k=t[3];if(!Object.hasOwn(s.work,k))fail('Choose an existing practice file.');if(Object.hasOwn(s.head,k))s.index[k]=s.head[k];else delete s.index[k];output='Unstaged '+k+'; working content kept.';}
 else if(op==='commit'){const i=t.indexOf('-m');if(i<0||!t[i+1]?.trim())fail('Use a descriptive message: git commit -m "..."');if(diff(s.head,s.index)==='No differences.')fail('Nothing staged. Inspect status and add the intended file.');s.head=clone(s.index);s.commits.push({id:'c0ffee'+s.commits.length,message:t[i+1],files:clone(s.head)});output='Created a local commit: '+t[i+1]+(Object.hasOwn(s.head,'scratch.txt')?'\nThe unrelated scratch file was included. Reset the exercise and stage more selectively.':'');}
 else fail('Unsupported Git operation in this exercise. Type help.');
 }
 else if(s.id==='cherry'){
 if(t[0]!=='git')fail('Use a Git command.');const op=t[1];
 if(op==='status')output='On branch '+s.branch+'\nWorking tree clean\nHEAD: '+s.refs[s.branch];
 else if(op==='log')output=Object.entries(s.refs).map(([b,id])=>b+' → '+id).join('\n');
 else if(op==='show'){const c=s.commits[t[2]];if(!c)fail('Unknown practice commit. Fix: f1a2b3c. Experiment: e4d5c6b.');const parent=s.commits[c.parents[0]];output=t[2]+' '+c.message+'\n'+diff(parent?.files||{},c.files);}
 else if(op==='switch'){const b=t[2];if(!Object.hasOwn(s.refs,b))fail('Available branches: main, release/1.4.');s.branch=b;s.work=clone(s.commits[s.refs[b]].files);output='Switched to '+b;}
 else if(op==='cherry-pick'){const id=t.filter(x=>x!=='-x')[2],c=s.commits[id];if(!c||!['f1a2b3c','e4d5c6b'].includes(id))fail('Choose f1a2b3c (fix) or e4d5c6b (experiment).');const parent=s.commits[c.parents[0]],changes=Object.keys(c.files).filter(k=>c.files[k]!==parent.files[k]);if(changes.every(k=>s.work[k]===c.files[k]))fail('That change is already present here. Check your destination branch.');for(const k of changes)s.work[k]=c.files[k];const next='bacc'+String(Object.keys(s.commits).length).padStart(3,'0');s.commits[next]={parents:[s.refs[s.branch]],files:clone(s.work),message:c.message,source:id};s.refs[s.branch]=next;output='Created '+next+' on '+s.branch+' from '+id+'.\nMain and the source commit remain unchanged.';}
 else fail('Unsupported operation. Type help to see this exercise vocabulary.');
 }
 else if(s.id==='docker'){
 if(t[0]!=='docker')fail('Use a Docker command.');if(t[1]==='ps'){output=s.container&&s.container.running?'practice-web   '+s.container.image+'   '+s.container.mapping:'No running practice containers.';s.verified=!!s.container?.running;}
 else if(t[1]==='run'){let mapping=null,image=null,name='practice-web';for(let i=2;i<t.length;i++){if(['-p','--publish'].includes(t[i]))mapping=t[++i];else if(t[i].startsWith('--publish='))mapping=t[i].slice(10);else if(t[i]==='--name')name=t[++i];else if(['-d','--rm'].includes(t[i]))continue;else if(t[i].startsWith('-'))fail('Unsupported flag in this limited exercise: '+t[i]);else image=t[i];}if(!image||!/^nginx(?::[A-Za-z0-9_.-]+)?$/.test(image))fail('This exercise uses nginx.');if(!mapping)fail('Add a published port with -p.');if(s.container)fail('A practice container already exists. Reset this exercise for a new run.');s.container={mapping,image,name,running:true};s.verified=false;output='Simulated container created. Host mapping: '+mapping+'\nInspect it with docker ps.';}
 else if(t[1]==='stop'&&s.container){s.container.running=false;s.verified=false;output='Practice container stopped.';}
 else fail('Supported here: docker run, docker ps, docker stop.');
 }
 else {
 if(t[0]!=='gcloud')fail('Use gcloud commands in this fictional context.');const c=s.configs[s.active];
 if(t.slice(1).join(' ')==='auth list')output='ACTIVE ACCOUNT\n* '+c.account;
 else if(t.slice(1).join(' ')==='config configurations list')output=Object.entries(s.configs).map(([k,v])=>(k===s.active?'* ':'  ')+k+'  '+v.project).join('\n');
 else if(t[1]==='config'&&t[2]==='configurations'&&t[3]==='activate'){if(!Object.hasOwn(s.configs,t[4]))fail('Available configurations: work, learning.');s.active=t[4];s.verified=false;output='Activated '+s.active;}
 else if(t[1]==='config'&&t[2]==='set'&&t[3]==='project'){if(!t[4]||!/^[a-z][a-z0-9-]+$/.test(t[4]))fail('Provide a project ID.');c.project=t[4];s.verified=false;output='Updated local project property: '+c.project;}
 else if(t[1]==='config'&&t[2]==='get-value'&&t[3]==='project'){output=c.project;s.verified=true;}
 else if(t.slice(1).join(' ')==='config list')output='account = '+c.account+'\nproject = '+c.project;
 else fail('This exercise models configuration inspection and selection only. Type help.');
 }
 }catch(e){output=e.message;error=true;}
 s.done=goal(s);return {state:s,output,error};
}
function validateProgress(input,lessonIds,exerciseIds){
 if(!input||input.format!=='developer-field-guide.progress'||input.version!==1||!input.profile||typeof input.profile.name!=='string')throw Error('This is not a supported Field Guide progress file.');
 const p=input.profile,name=p.name.trim();if(name.length<1||name.length>40)throw Error('Profile name must be 1–40 characters.');if(!Array.isArray(p.completed)||p.completed.length>2000)throw Error('Invalid lesson progress.');if(p.completed.some(x=>typeof x!=='string'||x.length>120))throw Error('Invalid lesson identifier.');
 const completed=[...new Set(p.completed.filter(id=>lessonIds.includes(id)))];const practices={};if(p.practices!==undefined&&(typeof p.practices!=='object'||p.practices===null||Array.isArray(p.practices)))throw Error('Invalid practice records.');
 for(const id of exerciseIds){const v=p.practices?.[id];if(v===undefined)continue;if(!v||typeof v!=='object'||typeof v.completed!=='boolean'||typeof v.assisted!=='boolean')throw Error('Invalid practice result: '+id);practices[id]={completed:v.completed,assisted:v.assisted};}
 return {name,completed,practices};
}
function mergeProgress(current,incoming){const completed=[...new Set([...current.completed,...incoming.completed])];const practices=clone(current.practices||{});for(const [k,v]of Object.entries(incoming.practices||{})){const old=practices[k];if(!old?.completed)practices[k]=v;else if(v.completed)practices[k]={completed:true,assisted:old.assisted&&v.assisted};}return {...current,completed,practices};}
const api={exercises,initial,run,goal,words,validateProgress,mergeProgress};root.GuideModel=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
