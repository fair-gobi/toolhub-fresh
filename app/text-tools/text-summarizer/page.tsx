'use client'
import { useState } from 'react'

export default function Summarizer() {
  const [text, setText] = useState('Paste your long article here. This tool will extract the most important sentences. It works by finding key sentences. You can adjust the summary length below.')
  const [length, setLength] = useState(3)
  
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10)
  const summary = sentences.slice(0, length).join('. ') + '.'
  const reduction = text.length ? Math.round((1 - summary.length / text.length) * 100) : 0

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl p-6 mb-6">
        <h1 className="text-3xl font-bold">📝 Text Summarizer</h1>
        <p>Reduce text by {reduction}%</p>
      </div>
      
      <div className="mb-4 flex gap-4 items-center">
        <label>Summary length:</label>
        <select value={length} onChange={e=>setLength(Number(e.target.value))} className="border rounded px-3 py-1">
          <option value={2}>2 sentences</option>
          <option value={3}>3 sentences</option>
          <option value={5}>5 sentences</option>
        </select>
        <span className="text-sm text-gray-600">{text.split(' ').length} words → {summary.split(' ').length} words</span>
      </div>

      <textarea value={text} onChange={e=>setText(e.target.value)} className="w-full h-48 border rounded-lg p-3 mb-4" placeholder="Paste article, essay, or notes..." />
      
      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
        <div className="flex justify-between mb-2">
          <strong>Summary:</strong>
          <button onClick={()=>navigator.clipboard.writeText(summary)} className="text-xs bg-green-600 text-white px-2 py-1 rounded">Copy</button>
        </div>
        <p>{summary}</p>
      </div>
    </main>
  )
}

