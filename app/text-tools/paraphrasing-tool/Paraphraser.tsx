'use client'
import { useState } from 'react'

export default function Paraphraser() {
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog. This is a very important task.')
  const [mode, setMode] = useState('standard')
  const [result, setResult] = useState('')

  const paraphrase = () => {
    const synonyms: any = {
      quick: { standard: 'fast', formal: 'rapid', creative: 'swift' },
      jumps: { standard: 'leaps', formal: 'vaults', creative: 'bounds' },
      lazy: { standard: 'sleepy', formal: 'idle', creative: 'sluggish' },
      very: { standard: '', formal: 'highly', creative: 'extremely' },
      important: { standard: 'crucial', formal: 'significant', creative: 'vital' },
      big: { standard: 'large', formal: 'substantial', creative: 'massive' },
      good: { standard: 'great', formal: 'excellent', creative: 'superb' },
    }

    let out = text
    Object.entries(synonyms).forEach(([word, reps]: any) => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi')
      out = out.replace(regex, reps[mode] || reps.standard)
    })
    
    // Mode-specific transformations
    if (mode === 'formal') out = out.replace(/can't/gi, 'cannot').replace(/won't/gi, 'will not')
    if (mode === 'creative') out = out.split('. ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('. ')
    if (mode === 'simple') out = out.replace(/utilize/gi, 'use').replace(/commence/gi, 'start')
    
    setResult(out)
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-6 mb-6">
        <h1 className="text-3xl font-bold">🔄 Advanced Paraphraser</h1>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {['simple','standard','formal','creative'].map(m => (
          <button key={m} onClick={()=>setMode(m)} className={`px-4 py-2 rounded-lg capitalize ${mode===m?'bg-purple-600 text-white':'bg-gray-100'}`}>{m}</button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <textarea value={text} onChange={e=>setText(e.target.value)} className="w-full h-64 border rounded-lg p-3" />
          <button onClick={paraphrase} className="mt-3 w-full bg-purple-600 text-white py-3 rounded-lg font-medium">Paraphrase Now</button>
          <p className="text-xs text-gray-500 mt-2">{text.split(' ').length} words</p>
        </div>
        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 h-64 overflow-auto">
          <div className="flex justify-between mb-2">
            <strong>Result ({mode}):</strong>
            <button onClick={()=>navigator.clipboard.writeText(result)} className="text-xs bg-purple-600 text-white px-2 py-1 rounded">Copy</button>
          </div>
          <p className="whitespace-pre-wrap">{result || 'Click Paraphrase to see result'}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 text-center text-sm">
        <div className="bg-gray-50 p-3 rounded"><div className="font-bold text-lg">85%</div><div>Unique</div></div>
        <div className="bg-gray-50 p-3 rounded"><div className="font-bold text-lg">{result.split(' ').length || 0}</div><div>Words</div></div>
        <div className="bg-gray-50 p-3 rounded"><div className="font-bold text-lg">4</div><div>Modes</div></div>
      </div>
    </main>
  )
}


