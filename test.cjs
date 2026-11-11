const {readFileSync}=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const nodes=new Map();
const element=()=>({innerHTML:'',textContent:'',classList:{toggle(){},add(){},remove(){}},click(){}});
const sandbox={console,Blob,URL,setTimeout(){},localStorage:{getItem(){return null},setItem(){}},window:{scrollTo(){}},document:{querySelector(s){if(!nodes.has(s))nodes.set(s,element());return nodes.get(s)},querySelectorAll(){return []},createElement:element},confirm(){return true}};
vm.createContext(sandbox);
vm.runInContext(readFileSync('support.js','utf8')+'\n'+readFileSync('app.js','utf8'),sandbox);
vm.runInContext(`
if(scenarios.length!==10)throw Error('Ten scenarios required');
for(const s of scenarios){
 navigate(s.id);
 const r=rec(s);
 r.selected=s.rows.find(x=>x[0]!==s.target)?.[0]||'';
 if(!validate(s,r))throw Error('Wrong record must fail: '+s.id);
 r.selected=s.target;r.values={};
 act(s);
 if(r.step!==0)throw Error('Empty answers must fail: '+s.id);
 r.values={...s.values};
 if(r.values.summary)r.values.summary='Company 210, PRD-001, C-884: 3 units delayed. Mapping corrected and controlled replay failed. Please investigate business validation and confirm safe recovery.';
 if(validate(s,r))throw Error('Valid fixture rejected: '+s.id+' '+validate(s,r));
 for(const action of s.actions)act(s);
 if(!done(s))throw Error('Completion failed: '+s.id);
 if(!document.querySelector('#main').innerHTML.includes(s.success))throw Error('Missing completion outcome');
}
navigate('home');navigate('reference');navigate('interview');
const sql=scenarios.find(s=>s.id==='sql');
if(!validate(sql,{selected:sql.target,values:{sql:'UPDATE ttcibd001210 SET x=1'}}))throw Error('Write query accepted');
if(!validate(sql,{selected:sql.target,values:{sql:sql.values.sql.replace('210','220')}}))throw Error('Wrong company accepted');
if(!validate(scenarios[4],{selected:'INV-001',values:{available:'120',shortage:'0',action:scenarios[4].values.action}}))throw Error('Bad stock math accepted');
`,sandbox);
assert.ok(nodes.get('#main').innerHTML.includes('Interview rehearsal'));
console.log('PASS: 10 case render/completion flows; wrong records; missing answers; SQL write/company guards; stock reconciliation; overview/reference/interview rendering.');
