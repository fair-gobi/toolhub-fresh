'use client';
import { useState, useEffect } from 'react';
export default function GPA() {
  const [subjects, setSubjects] = useState([{name:'Math', credit:3, grade:'A'}]);
  const grades = {A:4, 'A-':3.7, B+:3.3, B:3, 'B-':2.7, C+:2.3, C:2, F:0};

  useEffect(()=>{ const s=localStorage.getItem('gpa'); if(s) setSubjects(JSON.parse(s)); },[]);
  useEffect(()=>{ localStorage.setItem('gpa', JSON.stringify(subjects)); },[subjects]);

  const gpa = subjects.reduce((sum,s)=>sum + grades[s.grade]*s.credit,0) / subjects.reduce((sum,s)=>sum+s.credit,0);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6">GPA Calculator</h1>
        <div className="flex gap-2 mb-4">
          <button onClick={()=>setSubjects([{name:'',credit:3,grade:'A'}])} className="px-3 py-1 bg-gray-200 rounded">Preset: TU</button>
          <button onClick={()=>setSubjects([{name:'',credit:4,grade:'A'}])} className="px-3 py-1 bg-gray-200 rounded">Preset: PU</button>
          <button onClick={()=>localStorage.removeItem('gpa')} className="px-3 py-1 bg-red-100 rounded">Clear Saved</button>
        </div>
        {subjects.map((s,i)=>(
          <div key={i} className="grid grid-cols-4 gap-2 mb-2">
            <input value={s.name} onChange={e=>{const a=[...subjects];a[i].name=e.target.value;setSubjects(a)}} placeholder="Subject" className="border rounded px-2 py-1" />
            <input type="number" value={s.credit} onChange={e=>{const a=[...subjects];a[i].credit=+e.target.value;setSubjects(a)}} className="border rounded px-2 py-1" />
            <select value={s.grade} onChange={e=>{const a=[...subjects];a[i].grade=e.target.value;setSubjects(a)}} className="border rounded px-2 py-1">
              {Object.keys(grades).map(g=><option key={g}>{g}</option>)}
            </select>
            <button onClick={()=>setSubjects(subjects.filter((_,j)=>j!==i))} className="text-red-600">Remove</button>
          </div>
        ))}
        <button onClick={()=>setSubjects([...subjects,{name:'',credit:3,grade:'A'}])} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">+ Add Subject</button>
        <div className="mt-6 p-4 bg-green-50 rounded-lg text-xl font-bold">GPA: {gpa.toFixed(2)}</div>
        <p className="text-sm text-gray-500 mt-2">Auto-saved to browser. Presets for TU/PU.</p>
      </div>
    </main>
  );
}
