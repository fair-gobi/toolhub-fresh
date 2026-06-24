'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function InvestmentReturn() {
  useEffect(() => {
    document.title = 'CAGR Calculator'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Calculate CAGR and investment returns.')
  }, [])

  const [initial, setInitial] = useState(100000)
  const [final, setFinal] = useState(200000)
  const [years, setYears] = useState(5)

  const cagr = (Math.pow(final/initial, 1/years) - 1) * 100
  const absolute = ((final - initial) / initial) * 100

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/finance" className="text-sm text-orange-600 hover:underline">← Back</Link>
        <div className="bg-white rounded-2xl border mt-4 p-6">
          <h1 className="text-2xl font-bold mb-4">Investment Return Calculator</h1>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <input type="number" value={initial} onChange={e=>setInitial(+e.target.value)} className="w-full p-3 border rounded-xl" placeholder="Initial" />
              <input type="number" value={final} onChange={e=>setFinal(+e.target.value)} className="w-full p-3 border rounded-xl" placeholder="Final" />
              <input type="number" value={years} onChange={e=>setYears(+e.target.value)} className="w-full p-3 border rounded-xl" placeholder="Years" />
            </div>
            <div className="bg-orange-50 rounded-xl p-6">
              <div>CAGR: <span className="font-bold text-xl">{cagr.toFixed(2)}%</span></div>
              <div className="mt-2">Absolute: {absolute.toFixed(2)}%</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
