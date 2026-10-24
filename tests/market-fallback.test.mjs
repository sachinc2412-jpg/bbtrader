import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const source=readFileSync('public/app.js','utf8');
function setup(){
 const storage=new Map();const context=vm.createContext({console,AbortController,AbortSignal,Date,Map,Set,JSON,Number,Error,localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},setTimeout:()=>1,clearTimeout(){},document:{hidden:false,querySelectorAll:()=>[]},fetch:async()=>{throw new Error('offline')}});
 vm.runInContext(readFileSync('public/market-model.js','utf8'),context);
 vm.runInContext(source.slice(source.indexOf('const {validateSnapshot'),source.indexOf('function initChart')),context);
 vm.runInContext('function renderChart(){}',context);
 vm.runInContext(source.slice(source.indexOf('function applySnapshot'),source.indexOf('function startPolling')),context);
 return context;
}
const snapshot=()=>({fetchedAt:new Date(Date.now()-3*86400000).toISOString(),markets:Object.fromEntries(['BTC','ETH','SOL','EUR','GBP'].map(s=>[s,{price:100,change:2}]))});
const candles=[{time:100,open:90,high:105,low:85,close:100}];
test('historical snapshot is permitted only through explicit saved-data path',()=>{
 const c=setup();c.data=snapshot();assert.throws(()=>vm.runInContext('validateSnapshot(data)',c));vm.runInContext('applySnapshot(data,true)',c);assert.equal(vm.runInContext('snapshot.stale',c),true);
});
test('quote request failure retains the shared last successful quote',async()=>{
 const c=setup();c.data=snapshot();vm.runInContext('applySnapshot(data,true)',c);await vm.runInContext('refreshPrices()',c);assert.equal(vm.runInContext('snapshot.markets.BTC.price',c),100);assert.equal(vm.runInContext('snapshot.stale',c),true);
});
test('reload without a live feed restores the persisted quote',async()=>{
 const c=setup();c.data=snapshot();vm.runInContext("saveMarket('markets',data)",c);await vm.runInContext('unavailable()',c);assert.equal(vm.runInContext('snapshot.markets.BTC.price',c),100);
});
test('failed history refresh returns the cached candles for that exact symbol and interval',async()=>{
 const c=setup();c.candles=candles;vm.runInContext("saveMarket('history:BTC:60',{candles,loadedAt:0})",c);const result=await vm.runInContext("getHistory('BTC',60)",c);assert.equal(result[0].close,100);assert.equal(result.length,1);await assert.rejects(vm.runInContext("getHistory('ETH',60)",c));
});
test('closed session does not append weekend candles',()=>{
 const c=setup();c.candles=candles;const result=vm.runInContext("syncCandles(candles,{price:100,change:0,marketClosed:true},60,new Date().toISOString())",c);assert.equal(result.length,1);assert.equal(result[0].time,100);
});
test('invalid cached candles do not pass validation',()=>{
 const c=setup();c.candles=[{time:100,open:90,high:1,low:85,close:100}];assert.equal(vm.runInContext('validHistory(candles)',c),false);
});
test('the dated cold-start backup contains real validated snapshots for every chart option',()=>{
 const c=setup();const backup=JSON.parse(readFileSync('public/market-backup.json','utf8'));c.backup=backup;
 vm.runInContext('validateSnapshot(backup.markets,Date.now(),true)',c);
 assert.equal(vm.runInContext('validIndianSnapshot(backup.india)',c),true);
 for(const symbol of ['BTC','ETH','SOL','EUR','GBP'])for(const interval of [15,60,240,1440]){
  const item=backup.histories[symbol+':'+interval];assert.equal(item.symbol,symbol);assert.equal(item.interval,interval);c.item=item;assert.equal(vm.runInContext('validHistory(item.candles)',c),true);
 }
});
