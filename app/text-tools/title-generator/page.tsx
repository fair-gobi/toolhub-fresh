'use client'
import { useState } from 'react'

export default function TitleGen() {
  const [topic, setTopic] = useState('free online tools')
  const [type, setType] = useState('how-to')

  const templates: any = {
    'how-to': [`How to Use ${topic} in 2026`, `How to Build ${topic} for Free`, `${topic}: A Complete How-To Guide`],
    'list': [`10 Best ${topic} You Need`, `15 Free ${topic} That Actually Work`, `Top 7 ${topic} for Beginners`],
    'question': [`What Are the Best ${topic}?`, `Why ${topic} Matter in 2026?`, `Is ${topic} Worth It?`],
    'seo': [`${topic} - Free Online Tools | Promptoolhub`, `Best ${topic} 2026 - No Signup Required`]
  }

  const titles = templates[type] || []

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">✨ Title Generator</h1>

      <div className="flex gap-3 mb-4">
        <input value={topic} onChange={e=>setTopic(e.target.value)} className="flex-1 border rounded p-3" placeholder="Enter topic..." />
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {Object.keys(templates).map(t => (
          <button key={t} onClick={()=>setType(t)} className={`px-4 py-2 rounded-lg capitalize ${type===t?'bg-indigo-600 text-white':'bg-gray-100'}`}>{t}</button>
        ))}
      </div>

      <div className="space-y-3">
        {titles.map((t:string,i:number) => (
          <div key={i} className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg flex justify-between items-center">
            <span className="font-medium">{t} <span className="text-xs text-gray-500">({t.length} chars)</span></span>
            <button onClick={()=>navigator.clipboard.writeText(t)} className="text-xs bg-indigo-600 text-white px-3 py-1 rounded">Copy</button>
          </div>
        ))}
      </div>
    </main>
  )
}
