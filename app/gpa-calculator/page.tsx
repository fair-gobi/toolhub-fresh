'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function GPA() {
  const [subs, setSubs] = useState([{grade:'A', credit:3}])
  const add = () => setSubs([...subs, {grade:'A', credit:3}])

  const gp = { 'A+':4.0, 'A':3.6, 'B+':3.2, 'B':2.8, 'C+':2.4, 'C':2.0, 'D':1.6, 'E':0.8 }
  const total = subs.reduce((s,x)=>s+x.credit,0)
  const points = subs.reduce((s,x)=>s+(gp[x.grade as keyof typeof gp]||0)*x.credit,0)
  const gpa = total? (points/total).toFixed(2) : '0.00'

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="text-blue-600">← Back</Link>
        <h1 className="text-3xl font-bold mt-4">GPA Calculator 🇳🇵</h1>
        <div className="bg-white p-6 rounded-xl shadow mt-4">
          {subs.map((s,i)=>(
            <div key={i} className="flex gap-2 mb-2">
              <select value={s.grade} onChange={e=>{const n=[...subs];n[i].grade=e.target.value;setSubs(n)}} className="border p-2 rounded flex-1">
                {Object.keys(gp).map(g=><option key={g}>{g}</option>)}
              </select>
              <input type="number" value={s.credit} onChange={e=>{const n=[...subs];n[i].credit=+e.target.value;setSubs(n)}} className="border p-2 rounded w-20" />
            </div>
          ))}
          <button onClick={add} className="text-blue-600 mb-4">+ Add Subject</button>
          <div className="text-2xl font-bold text-center p-4 bg-gray-100 rounded">GPA: {gpa}</div>
        </div>
      </div>
    </div>
  )
}
