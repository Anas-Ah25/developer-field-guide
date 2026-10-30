module.exports = async (page, options = {}) => {
 const context=await page.context().browser().newContext({viewport:{width:1440,height:1000},acceptDownloads:true});
 const p=await context.newPage(),errors=[],results=[];
 p.on('pageerror',e=>errors.push(e.message));
 const base=options.baseURL || 'http://127.0.0.1:8768/v2/';
 function check(value,message){if(!value)throw new Error(message);results.push(message);}
 async function go(hash){await p.goto(base+hash);await p.locator('#main h1').first().waitFor();}
 async function run(command){await p.locator('#practice-command').fill(command);await p.locator('#practice-command').press('Enter');await p.locator('#practice-command').waitFor();}
 async function readDownload(download){const stream=await download.createReadStream();let text='';for await(const chunk of stream)text+=chunk.toString();return text;}
 try{
 await go('');check(await p.getByRole('heading',{name:'The commands you will actually use.',exact:true}).count()===1,'Beginner-first overview loads');
 await p.getByRole('button',{name:'Windows',exact:true}).click();await p.getByRole('link',{name:'Start with the first lesson →',exact:true}).click();
 check(await p.locator('[data-os="windows"]').isVisible(),'Windows shows native PowerShell block');
 check(!await p.locator('[data-os="unix"]').isVisible(),'Windows hides Unix command block');
 await p.getByRole('checkbox',{name:'I have read this lesson'}).check();
 await p.getByRole('link',{name:'Progress',exact:true}).click();
 check((await p.locator('.metric-grid strong').first().textContent())==='1','Read completion reaches the progress dashboard');
 await p.getByLabel('Create another profile',{exact:true}).fill('UI test learner');await p.getByRole('button',{name:'Create',exact:true}).click();
 check((await p.locator('.metric-grid strong').first().textContent())==='0','New local profile has separate progress');
 await p.getByLabel('Current profile',{exact:true}).selectOption('guest');
 check((await p.locator('.metric-grid strong').first().textContent())==='1','Switching back restores guest progress');
 const exported=p.waitForEvent('download');await p.getByRole('button',{name:'Export progress.json'}).click();const exportData=JSON.parse(await readDownload(await exported));
 check(exportData.format==='developer-field-guide.progress'&&exportData.profile.completed.includes('orientation'),'Progress export contains the actual profile state');
 await p.locator('#import-progress').setInputFiles({name:'bad.json',mimeType:'application/json',buffer:Buffer.from('{bad')});
 await p.getByText('That file is not valid JSON.',{exact:true}).waitFor();check(await p.locator('#apply-import').isDisabled(),'Invalid progress JSON cannot be applied');
 const fixture={format:'developer-field-guide.progress',version:1,profile:{name:'Imported',completed:['folders'],practices:{}}};
 await p.locator('#import-progress').setInputFiles({name:'progress.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(fixture))});await p.getByText(/Validated “Imported”/).waitFor();
 await p.getByRole('button',{name:'Import into Guest',exact:true}).click();
 check((await p.locator('.metric-grid strong').first().textContent())==='2','Progress import merges instead of losing existing lessons');
 await p.locator('#import-progress').setInputFiles({name:'progress.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(fixture))});await p.getByText(/Validated “Imported”/).waitFor();
 await p.locator('#import-mode').selectOption('replace');await p.getByRole('button',{name:'Import into Guest',exact:true}).click();
 check((await p.locator('#import-status').textContent()).includes('Confirm replacement'),'Replacing progress requires explicit confirmation');
 await go('#/practice/navigate');await run('Get-ChildItem');await run('Set-Location -Path docs');await run('Get-Content -LiteralPath README.md');
 check((await p.locator('#practice-result').textContent()).includes('Goal verified'),'Native PowerShell practice completes from state');
 await go('#/practice/commit');await p.getByRole('button',{name:'Show a hint',exact:true}).click();await run('git add README.md');await run('git commit -m "Explain setup"');
 check((await p.locator('#practice-result').textContent()).includes('with help'),'Hint-assisted completion is labeled');
 await p.getByRole('button',{name:'Reset attempt',exact:true}).click();await run('git add README.md');await run('git commit -m "Explain setup"');
 check((await p.locator('#practice-result').textContent()).includes('independently'),'A fresh attempt can prove independent completion');
 await go('#/practice/cherry');await run('git cherry-pick f1a2b3c');check(!(await p.locator('#practice-result').textContent()).includes('Goal verified'),'Wrong-branch cherry-pick does not pass');await run('git switch release/1.4');await run('git cherry-pick -x f1a2b3c');check((await p.locator('#practice-result').textContent()).includes('Goal verified'),'Backport practice checks destination and selected content');
 await go('#/practice/docker');await run('docker run -d -p 127.0.0.1:8080:80 nginx');check(!(await p.locator('#practice-result').textContent()).includes('Goal verified'),'Docker practice requires inspection after starting');await run('docker ps');check((await p.locator('#practice-result').textContent()).includes('Goal verified'),'Docker port mapping and inspection pass');
 await go('#/practice/cloud');await run('gcloud config configurations activate learning');await run('gcloud config set project guide-sandbox');check(!(await p.locator('#practice-result').textContent()).includes('Goal verified'),'Cloud context is not passed before verification');await run('gcloud config get-value project');check((await p.locator('#practice-result').textContent()).includes('Goal verified'),'Cloud verification completes the goal');
 await go('#/git/basics/backport');await p.getByRole('button',{name:'Next step →',exact:true}).click();check((await p.locator('.case-explanation h4').textContent()).includes('Inspect exactly'),'Git stepper updates the command/story state');await p.getByRole('button',{name:'Step 4: Apply the selected change',exact:true}).click();check((await p.locator('.case-panels').textContent()).includes('bacc')===false&&(await p.locator('.case-panels').textContent()).includes('no experimental-export.txt'),'Git backport case shows the selected resulting files');
 await go('#/cheats');await p.locator('[data-sheet-topic="terminal"]').check();await p.locator('[data-sheet-topic="git"]').check();await p.locator('[data-sheet-topic="docker"]').uncheck();await p.locator('[data-sheet-topic="gcloud"]').uncheck();
 const dl=p.waitForEvent('download');await p.getByRole('button',{name:'Download Markdown',exact:true}).click();const sheet=await readDownload(await dl);check(sheet.includes('Platform: Windows')&&sheet.includes('Get-Location')&&sheet.includes('git status')&&!sheet.includes('## Docker'),'Downloaded cheat sheet honors platform and topic selection');
 const htmlDl=p.waitForEvent('download');await p.getByRole('button',{name:'Download HTML',exact:true}).click();const html=await readDownload(await htmlDl);check(html.startsWith('<!doctype html>')&&html.includes('Windows'),'HTML cheat-sheet export is a real usable document');
 await p.reload();await p.locator('#main h1').first().waitFor();check(await p.locator('[data-sheet-topic="terminal"]').isChecked(),'Cheat-sheet topic selection persists after reload');
 await p.emulateMedia({media:'print'});check(!await p.locator('.site-header').isVisible(),'Print layout removes navigation');check(await p.locator('#sheet-preview').isVisible(),'Print layout retains the cheat sheet');await p.emulateMedia({media:'screen'});
 await p.goto(base+'git.html');await p.locator('#main h1').first().waitFor();check((await p.locator('#main h1').textContent()).includes('Understand history'),'Dedicated git.html URL opens the Git guide');
 await p.setViewportSize({width:390,height:844});check(await p.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),'390px layout has no whole-page horizontal overflow');
 await p.getByRole('button',{name:'☰ Lessons',exact:true}).click();check(await p.locator('#menu-button').getAttribute('aria-expanded')==='true','Mobile lesson navigation opens');await p.getByRole('link',{name:'01 What Git is remembering',exact:true}).click();check(await p.locator('#menu-button').getAttribute('aria-expanded')==='false','Choosing a lesson closes the mobile menu');
 await p.setViewportSize({width:1440,height:1000});await p.getByRole('button',{name:'Advanced',exact:true}).click();check((await p.locator('#nav-depth').textContent()).includes('Advanced'),'Depth switch exposes the dedicated advanced path');
 await go('#/cheats');await p.getByRole('button',{name:'Advanced',exact:true}).click();check((await p.locator('#main h1').first().textContent()).includes('Build your cheat sheet'),'Depth control keeps the cheat-sheet page open');
 await go('#/reference');await p.getByRole('button',{name:'Everyday',exact:true}).click();check(!(await p.locator('#reference-table').textContent()).includes('git rebase'),'Everyday command finder excludes Advanced entries');
 await p.setViewportSize({width:390,height:844});await p.keyboard.press('Control+k');check(await p.locator('#menu-button').getAttribute('aria-expanded')==='true','Keyboard search shortcut opens mobile navigation');await p.keyboard.press('Escape');
 await p.locator('.skip').focus();await p.keyboard.press('Enter');check((await p.locator('#main h1').first().textContent()).includes('Find the command'),'Skip link focuses content without breaking routing');
 check(errors.length===0,'No browser JavaScript exceptions');
 return {passed:results.length,checks:results,errors};
 }finally{await context.close();}
}
