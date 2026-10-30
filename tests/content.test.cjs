const test=require('node:test'),assert=require('node:assert/strict');
global.window={};require('../assets/content.js');require('../assets/cases.js');
const D=window.GUIDE_DATA,C=window.GUIDE_CASES;
test('Every course has a learning path for each platform and depth',()=>{
 for(const course of Object.keys(D.courses))for(const platform of ['mac','linux','windows'])for(const level of ['basics','advanced'])assert.ok(D.lessons.some(l=>l.course===course&&l.level===level&&l.platforms.includes(platform)),course+' '+platform+' '+level);
});
test('Lesson ids are unique and rendered code has valid closing tags',()=>{
 assert.equal(new Set(D.lessons.map(l=>l.id)).size,D.lessons.length);
 for(const lesson of D.lessons){assert.ok(!lesson.html.includes('<\\/code>'));if(lesson.html.includes('<code>'))assert.ok(lesson.html.includes('</code>'));}
});
test('Every diagram edge and branch points to an existing commit node',()=>{
 for(const c of Object.values(C))for(const step of c.steps){const ids=new Set(step.nodes.map(n=>n[0]));assert.equal(ids.size,step.nodes.length);for(const [a,b]of step.edges){assert.ok(ids.has(a));assert.ok(ids.has(b));}for(const [,id]of step.refs)assert.ok(ids.has(id));}
});
test('All cheat sheet entries provide genuine platform selections',()=>{
 for(const sheet of D.sheets)for(const p of ['mac','linux','windows'])assert.ok(typeof sheet[p]==='string'&&sheet[p].length>0);
 assert.ok(D.sheets.some(s=>s.windows.startsWith('Get-Location')));
 assert.ok(D.sheets.some(s=>s.linux.startsWith('ss -ltnp')));
});
