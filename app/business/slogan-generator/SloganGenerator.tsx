'use client'

import { useState } from 'react'

const templates = [
  '{brand} — {verb} your {noun}',
  'Think {adjective}. Think {brand}.',
  '{brand}: {benefit} made simple',
  'The {adjective} way to {verb}',
  '{verb} smarter with {brand}',
  '{brand} — where {noun} meets {noun2}',
]

const verbs = ['Elevate', 'Simplify', 'Power', 'Transform', 'Unlock', 'Build']
const nouns = ['business', 'ideas', 'future', 'growth', 'success', 'dreams']
const adjectives = ['smart', 'bold', 'simple', 'fast', 'modern', 'clear']
const benefits = ['Innovation', 'Results', 'Freedom', 'Clarity']

export default function SloganGenerator() {
  const [brand, setBrand] = useState('')
  const [slogans, setSlogans] = useState<string[]>([])

  const generate = () => {
    const b = brand || 'YourBrand'
    const results = templates.map(t => 
      t.replace('{brand}', b)
       .replace('{verb}', verbs[Math.floor(Math.random()*verbs.length)])
       .replace('{noun}', nouns[Math.floor(Math.random()*nouns.length)])
       .replace('{noun2}', nouns[Math.floor(Math.random()*nouns.length)])
       .replace('{adjective}', adjectives[Math.floor(Math.random()*adjectives.length)])
       .replace('{benefit}', benefits[Math.floor(Math.random()*benefits.length)])
    )
    setSlogans(results)
  }

  return (
    <main className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">Slogan Generator</h1>
      <p className="text-gray-600 mb-6">Create memorable taglines in seconds</p>
      
      <div className="bg-white border rounded-xl p-6 mb-6">
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Enter your brand name"
          className="w-full border rounded-lg px-3 py-2 mb-4"
        />
        <button onClick={generate} className="w-full bg-blue-600 text-white rounded-lg py-3 font-medium">
          Generate Slogans
        </button>
      </div>

      {slogans.length > 0 && (
        <div className="grid gap-3">
          {slogans.map((s, i) => (
            <div key={i} className="bg-gray-50 border rounded-lg p-4 flex justify-between items-center">
              <span className="font-medium">"{s}"</span>
              <button onClick={() => navigator.clipboard.writeText(s)} className="text-sm text-blue-600">Copy</button>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
