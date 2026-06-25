'use client'

import { useState } from 'react'

const templates = [
  'The only {product} that {benefit} for {audience} without {pain}',
  '{product} for {audience} who want {benefit} in {timeframe}',
  'We help {audience} {benefit} through {unique}',
  'Unlike others, we {unique} so you {benefit}',
]

export default function UspGenerator() {
  const [product, setProduct] = useState('')
  const [audience, setAudience] = useState('')
  const [benefit, setBenefit] = useState('')
  const [usps, setUsps] = useState<string[]>([])

  const generate = () => {
    const p = product || 'our product'
    const a = audience || 'busy founders'
    const b = benefit || 'save time'
    const pain = 'complexity'
    const timeframe = '30 days'
    const unique = 'AI-powered automation'

    const results = templates.map(t =>
      t.replace('{product}', p)
       .replace('{audience}', a)
       .replace('{benefit}', b)
       .replace('{pain}', pain)
       .replace('{timeframe}', timeframe)
       .replace('{unique}', unique)
    )
    setUsps(results)
  }

  return (
    <main className="container mx-auto p-6 max-w-4xl">
      <div className="bg-gradient-to-r from-orange-600 to-red-500 text-white rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl">🚀</span>
          <div>
            <h1 className="text-3xl font-bold">USP Generator</h1>
            <p className="opacity-90">Create unique selling propositions in seconds</p>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-xl p-6 mb-6">
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Product</label>
            <input value={product} onChange={e=>setProduct(e.target.value)} placeholder="e.g. CRM tool" className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Audience</label>
            <input value={audience} onChange={e=>setAudience(e.target.value)} placeholder="e.g. freelancers" className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Benefit</label>
            <input value={benefit} onChange={e=>setBenefit(e.target.value)} placeholder="e.g. close deals faster" className="w-full border rounded-lg px-3 py-2" />
          </div>
        </div>
        <button onClick={generate} className="w-full bg-orange-600 text-white rounded-lg py-3 font-medium hover:bg-orange-700">
          Generate USPs
        </button>
      </div>

      {usps.length > 0 && (
        <div className="space-y-3">
          {usps.map((u, i) => (
            <div key={i} className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex justify-between items-center">
              <span className="font-medium text-orange-900">"{u}"</span>
              <button onClick={()=>navigator.clipboard.writeText(u)} className="text-sm text-orange-600 hover:underline">Copy</button>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
