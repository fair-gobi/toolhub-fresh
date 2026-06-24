'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ROI() {
  useEffect(() => {
    document.title = 'ROI Calculator'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Calculate return on investment.')
  }, [])

  const [gain, setGain] = useState(150000)
  const [cost, setCost] = useState(100000)

  const roi = cost > 0 ? ((gain - cost) / cost) * 100 : 0
  const profit = gain - cost

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/finance" className="text-sm text-blue-600 hover:underline">← Back</Link>
        <div className="bg-white rounded-2xl border mt-4 p-6">
          <h1 className="text-2xl font-bold mb-4">ROI Calculator</h1>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <input type="number" value={cost} onChange={e=>setCost(+e.target.value)} className="w-full p-3 border rounded-xl" placeholder="Investment Cost" />
              <input type="number" value={gain} onChange={e=>setGain(+e.target.value)} className="w-full p-3 border rounded-xl" placeholder="Return Amount" />
            </div>
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <div>ROI</div>
              <div className={`text-4xl font-bold ${roi>=0?'text-green-600':'text-red-600'}`}>{roi.toFixed(1)}%</div>
              <div className="mt-2">Profit: ${profit.toFixed(0)}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
