'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Routine() {
  const [rows, setRows] = useState(Array(7).fill('').map((_,i)=>({day:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][i], sub:''})))

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="text-blue-600">← Back</Link>
        <h1 className="text-3xl font-bold mt-4">Routine Maker</h1>
        <div className="bg-white p-6 rounded-xl shadow mt-4">
          {rows.map((r,i)=>(
            <div key={i} className="flex gap-2 mb-2">
              <span className="w-12 pt-2">{r.day}</span>
              <input value={r.sub} onChange={e=>{const n=[...rows];n[i].sub=e.target.value;setRows(n)}} placeholder="Subjects" className="flex-1 border p-2 rounded" />
            </div>
          ))}
          <button onClick={()=>window.print()} className="w-full bg-green-600 text-white py-2 rounded mt-4">Print Routine</button>
        </div>
      </div>
    </div>
  )
}
