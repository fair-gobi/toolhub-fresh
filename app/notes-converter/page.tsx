'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Notes() {
  const [text, setText] = useState('')
  const download = (type:string) => {
    const blob = new Blob([text], {type:'text/plain'})
    const a = document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=`notes.${type}`; a.click()
  }
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-blue-600">← Back</Link>
        <h1 className="text-3xl font-bold mt-4">Notes Converter</h1>
        <div className="bg-white p-6 rounded-xl shadow mt-4">
          <textarea value={text} onChange={e=>setText(e.target.value)} className="w-full h-64 border p-3 rounded" placeholder="Paste your notes..." />
          <div className="flex gap-2 mt-3">
            <button onClick={()=>download('txt')} className="flex-1 bg-blue-600 text-white py-2 rounded">TXT</button>
            <button onClick={()=>download('md')} className="flex-1 bg-purple-600 text-white py-2 rounded">MD</button>
            <button onClick={()=>window.print()} className="flex-1 bg-gray-600 text-white py-2 rounded">PDF</button>
          </div>
        </div>
      </div>
    </div>
  )
}
