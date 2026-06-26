'use client'
import { useState } from 'react'

export default function Rewriter() {
  const [text, setText] = useState('This is very good product')
  const [tone, setTone] = useState('professional')

  const getRewrites = () => {
    const base = text
    if (tone === 'professional') {
      return [
        base.replace(/very good/gi, 'excellent'),
        base.replace(/very good/gi, 'outstanding').replace(/is/gi, 'represents'),
        base.replace(/good/gi, 'superior'),
        `The product demonstrates ${base.split(' ').slice(-1)} quality`
      ]
    }
    if (tone === 'casual') {
      return [
        base.replace(/very good/gi, 'really great'),
        base.replace(/very good/gi, 'awesome'),
        base.replace(/This is/gi, "It's"),
        base + '!'
      ]
    }
    return [base, base.toUpperCase(), base + '!!!', 'In other words: ' + base]
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl p-6 mb-6">
        <h1 className="text-3xl font-bold">✂️ Sentence Rewriter</h1>
      </div>

      <input value={text} onChange={e=>setText(e.target.value)} className="w-full border rounded-lg p-3 mb-3 text-lg" placeholder="Enter sentence..." />
      
      <div className="flex gap-2 mb-4">
        {['professional','casual','creative'].map(t => (
          <button key={t} onClick={()=>setTone(t)} className={`px-3 py-1 rounded text-sm ${tone===t?'bg-orange-600 text-white':'bg-gray-200'}`}>{t}</button>
        ))}
      </div>

      <div className="space-y-2">
        {getRewrites().map((v,i) => (
          <div key={i} className="p-4 bg-orange-50 border border-orange-200 rounded-lg flex justify-between items-center hover:bg-orange-100">
            <span>{v}</span>
            <button onClick={()=>navigator.clipboard.writeText(v)} className="text-xs text-orange-600 font-medium">COPY</button>
          </div>
        ))}
      </div>
    </main>
  )
}
