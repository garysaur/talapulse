import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const Context = createContext(null);
const KEY = 'astrohealth.records.v1';
const profile = { full_name:'Cmdr. Elena Vasquez', call_sign:'VEGA', role:'Flight Engineer · Mission Specialist', mission_name:'Artemis Orbital Analogue III', agency:'Fictional crew profile', mission_day:127 };
const initial = Array.from({ length: 14 }, (_, i) => {
  const d = new Date(Date.now() - (13-i) * 86400000);
  return { id:`seed-${i}`, source:'manual', recorded_at:d.toISOString(), heart_rate:66+Math.round(Math.sin(i)*3), systolic:116+Math.round(Math.cos(i)*3), diastolic:75+Math.round(Math.sin(i/2)*2), sleep_hours:+(7.2+Math.sin(i/2)*.5).toFixed(1), fatigue:Math.max(1,Math.min(10,4+Math.round(Math.cos(i)*1.5))), mood:Math.max(1,Math.min(5,4+Math.round(Math.sin(i/3)))), notes:i%4===0?'Nominal day — exercise and maintenance':'' };
}).reverse();
const defaults = { profile, analysis:null, sensorLatest:null, counts:{total:0,manual:0,sensor:0}, serverTime:new Date().toISOString() };

function analyze(records) {
  const manual = records.filter(r=>r.source!=='puma_sim').sort((a,b)=>new Date(b.recorded_at)-new Date(a.recorded_at));
  const latest = manual[0];
  const specs = [['heart_rate','Heart rate','bpm',0],['systolic','Systolic pressure','mmHg',0],['diastolic','Diastolic pressure','mmHg',0],['sleep_hours','Sleep duration','h',1],['fatigue','Fatigue','/10',0],['mood','Mood','/5',0]];
  const metricMap = {};
  for (const [key,label,unit,decimals] of specs) {
    const values=manual.slice(1,31).map(r=>Number(r[key])).filter(Number.isFinite).sort((a,b)=>a-b);
    const baseline=values.length>=5?(values.length%2?values[(values.length-1)/2]:(values[values.length/2-1]+values[values.length/2])/2):null;
    const value=latest?.[key] == null ? null : Number(latest[key]);
    const delta=baseline==null||value==null?null:value-baseline;
    const state=delta==null?'calibrating':Math.abs(delta)>((key==='fatigue'||key==='mood')?2:Math.max(3,baseline*.14))?'observe':'stable';
    metricMap[key]={key,label,unit,decimals,value,display:value==null?'—':value.toFixed(decimals),baseline,delta,state,series:manual.slice(0,14).reverse().map(r=>Number(r[key])).filter(Number.isFinite),deltaText:delta==null?'Baseline not established yet':`${delta>0?'+':''}${delta.toFixed(decimals)} ${unit} vs baseline`,explanation:delta==null?'Not enough previous check-ins to establish a personal baseline.':`${label} is ${delta>0?'above':'below'} your recent personal baseline.`};
  }
  const flags=Object.values(metricMap).filter(m=>m.state==='observe'||m.state==='attention').map(m=>m.key);
  const overall=Object.values(metricMap).every(m=>m.state==='calibrating')?'calibrating':flags.length?'observe':'stable';
  const changes=flags.map(key=>({key,label:`${metricMap[key].label} changed`,detail:metricMap[key].deltaText,note:metricMap[key].explanation,state:metricMap[key].state}));
  return {hasRecords:!!latest,latestCheckin:latest??null,baselineCount:Math.max(0,manual.length-1),overall,headline:!latest?'No check-ins recorded yet. Complete a daily check-in to begin personal baseline monitoring.':flags.length?metricMap[flags[0]].explanation:'All recorded measurements sit inside your recent personal range.',metricMap,metrics:Object.values(metricMap),flags,changes};
}
function makeData(records) {
 const sorted=[...records].sort((a,b)=>new Date(b.recorded_at)-new Date(a.recorded_at));
 return {...defaults,analysis:analyze(sorted),sensorLatest:sorted.find(r=>r.source==='puma_sim')??null,counts:{total:sorted.length,manual:sorted.filter(r=>r.source!=='puma_sim').length,sensor:sorted.filter(r=>r.source==='puma_sim').length},serverTime:new Date().toISOString()};
}
export function HealthDataProvider({children}) {
 const [records,setRecords]=useState(initial);
 const [pending,setPending]=useState([]);
 const [online,setOnline]=useState(typeof navigator==='undefined'?true:navigator.onLine);
 const [loading,setLoading]=useState(false);
 useEffect(()=>{try{const saved=localStorage.getItem(KEY);if(saved)setRecords(JSON.parse(saved));else localStorage.setItem(KEY,JSON.stringify(initial));}catch{};const on=()=>setOnline(true),off=()=>setOnline(false);window.addEventListener('online',on);window.addEventListener('offline',off);return()=>{window.removeEventListener('online',on);window.removeEventListener('offline',off)}},[]);
 const data=useMemo(()=>makeData(records),[records]);
 const refresh=useCallback(async()=>data,[data]);
 const syncNow=useCallback(async()=>({synced:0,remaining:pending.length}),[pending.length]);
 const submitCheckin=useCallback(async(payload)=>{const entry={...payload,id:`manual-${Date.now()}`,source:'manual',recorded_at:new Date().toISOString()};setRecords(old=>{const next=[entry,...old];try{localStorage.setItem(KEY,JSON.stringify(next));}catch{}return next;});return {queued:false,result:{...makeData([entry,...records]).analysis,analysis:makeData([entry,...records]).analysis,overall:makeData([entry,...records]).analysis.overall,headline:'Check-in recorded in this browser.'}}},[records]);
 const runSensor=useCallback(async()=>{const r={...Object.fromEntries([['heart_rate',58+Math.round(Math.random()*34)],['oxygen_percent',+(95+Math.random()*3.9).toFixed(1)],['co2_mmhg',+(33+Math.random()*11).toFixed(1)],['respiration_rate',+(11+Math.random()*8).toFixed(1)],['airflow_lpm',+(5.2+Math.random()*4.6).toFixed(1)],['skin_temp_c',+(35.6+Math.random()*1.6).toFixed(1)],['gas_pressure_kpa',+(100.4+Math.random()*1.5).toFixed(1)]]),id:`sensor-${Date.now()}`,source:'puma_sim',recorded_at:new Date().toISOString(),notes:'Synthetic PUMA-inspired sample generated by the prototype simulator.'};setRecords(old=>{const next=[r,...old];try{localStorage.setItem(KEY,JSON.stringify(next));}catch{}return next});return r},[]);
 const value=useMemo(()=>({data,loading,error:null,refresh,pending,online,syncing:false,syncNow,submitCheckin,runSensor,records}),[data,loading,refresh,pending,online,syncNow,submitCheckin,runSensor,records]);
 return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useHealthData(){const value=useContext(Context);if(!value)throw new Error('useHealthData must be used inside HealthDataProvider');return value;}
