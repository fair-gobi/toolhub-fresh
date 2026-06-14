'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Esewa() {
  const [text, setText] = useState('')
  const parse = () => {
    const lines = text.split('\n').filter(l=>l.includes('Rs'))
    return lines.map(l=>({raw:l}))
  }
  const data = text? parse() : []

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-blue-600">← Back</Link>
        <h1 className="text-3xl font-bold mt-4">eSewa Statement Parser</h1>
        <div className="bg-white p-6 rounded-xl shadow mt-4">
          <textarea value={text} onChange={e=>setText(e.target.value)} className="w-full h-40 border p-3 rounded" placeholder="Paste eSewa statement text..." />
          {data.length>0 && (
            <div className="mt-4">
              <h3 className="font-bold mb-2">Found {data.length} transactions:</h3>
              <div className="max-h-64 overflow-auto">
                {data.map((d,i)=><div key={i} className="text-sm p-2 border-b">{d.raw}</div>)}
              </div>
              <button onClick={()=>{const csv=data.map(d=>d.raw).join('\n'); const b=new Blob([csv],{type:'text/csv'}); const a=document.createElement('a'); a.href=URL.createObjectURL(b); a.download='esewa.csv'; a.click()}} className="w-full bg-green-600 text-white py-2 rounded mt-3">Download CSV</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
