'use client';
import { useState, useEffect } from 'react';
export default function GPA() {
  const [subjects, setSubjects] = useState([{name:'', credit:3, grade:'A'}]);
  const grades = {A:4, 'A-':3.7, 'B+':3.3, B:3, 'B-':2.7, 'C+':2.3, C:2, 'D+':1.3, D:1, F:0};
  const [error, setError] = useState('');

  useEffect(()=>{ try{ const s=localStorage.getItem('gpa'); if(s) setSubjects(JSON.parse(s)); }catch{} },[]);
  useEffect(()=>{ try{ localStorage.setItem('gpa', JSON.stringify(subjects)); }catch{} },[subjects]);

  const totalCredits = subjects.reduce((sum,s)=>sum+(Number(s.credit)||0),0);
  const totalPoints = subjects.reduce((sum,s)=>sum + (grades[s.grade]||0)*(Number(s.credit)||0),0);
  const gpa = totalCredits? (totalPoints/totalCredits) : 0;

  const update = (i,field,val)=>{ const a=[...subjects]; a[i][field]=field==='credit'?Number(val):val; setSubjects(a); };

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border">
          <h1 className="text-2xl md:text-3xl font-bold">GPA Calculator Nepal</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Calculate semester GPA for TU, PU, KU. Supports 4.0 scale with A to F. Auto-saves in your browser.</p>

          <div className="flex flex-wrap gap-2 my-4">
            <button onClick={()=>setSubjects([{name:'',credit:3,grade:'A'}])} className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm">TU Preset (3cr)</button>
            <button onClick={()=>setSubjects([{name:'',credit:4,grade:'A'}])} className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm">PU Preset (4cr)</button>
            <button onClick={()=>{localStorage.removeItem('gpa'); setSubjects([{name:'',credit:3,grade:'A'}])}} className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm">Reset</button>
          </div>

          {subjects.map((s,i)=>(
            <div key={i} className="grid grid-cols-12 gap-2 mb-2">
              <input value={s.name} onChange={e=>update(i,'name',e.target.value)} placeholder="Subject" className="col-span-5 md:col-span-6 border rounded-lg px-3 py-2" />
              <input type="number" min="1" max="6" value={s.credit} onChange={e=>update(i,'credit',e.target.value)} className="col-span-3 md:col-span-2 border rounded-lg px-3 py-2" />
              <select value={s.grade} onChange={e=>update(i,'grade',e.target.value)} className="col-span-3 md:col-span-3 border rounded-lg px-3 py-2">{Object.keys(grades).map(g=><option key={g}>{g}</option>)}</select>
              <button onClick={()=>setSubjects(subjects.filter((_,j)=>j!==i))} className="col-span-1 text-gray-400 hover:text-red-500">×</button>
            </div>
          ))}
          <button onClick={()=>setSubjects([...subjects,{name:'',credit:3,grade:'A'}])} className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg">+ Add Subject</button>

          <div className="mt-6 p-4 bg-green-50 rounded-xl flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-400">Total Credits: {totalCredits}</span>
            <span className="text-2xl font-bold text-green-700">GPA: {gpa.toFixed(2)}</span>
          </div>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border mt-6">
          <h2 className="font-semibold text-lg mb-2">About this tool</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">Used by students in Nepal to estimate results before official publication. Formula: GPA = Σ(Grade Point × Credit) / Σ Credits. Grades follow Nepal 4.0 scale. Data never leaves your device.</p>
        </div>
      </div>
    </main>
  );
}
