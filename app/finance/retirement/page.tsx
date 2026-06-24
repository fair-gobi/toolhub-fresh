'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Retirement() {
  useEffect(() => {
    document.title = 'Retirement Calculator'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Plan retirement corpus with inflation.')
  }, [])

  const [currentAge, setCurrentAge] = useState(30)
  const [retireAge, setRetireAge] = useState(60)
  const [monthly, setMonthly] = useState(50000)
  const [current, setCurrent] = useState(500000)

  const years = retireAge - currentAge
  const corpus = current * Math.pow(1.12, years) + monthly * 12 * ((Math.pow(1.12, years) - 1) / 0.12)

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/finance" className="text-sm text-purple-600 hover:underline">← Back</Link>
        <div className="bg-white rounded-2xl border mt-4 p-6">
          <h1 className="text-2xl font-bold mb-4">Retirement Calculator</h1>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <input type="number" placeholder="Current Age" value={currentAge} onChange={e=>setCurrentAge(+e.target.value)} className="w-full p-3 border rounded-xl" />
              <input type="number" placeholder="Retire Age" value={retireAge} onChange={e=>setRetireAge(+e.target.value)} className="w-full p-3 border rounded-xl" />
              <input type="number" placeholder="Monthly Investment" value={monthly} onChange={e=>setMonthly(+e.target.value)} className="w-full p-3 border rounded-xl" />
              <input type="number" placeholder="Current Savings" value={current} onChange={e=>setCurrent(+e.target.value)} className="w-full p-3 border rounded-xl" />
            </div>
            <div className="bg-purple-50 rounded-xl p-6 text-center">
              <div>Retirement Corpus</div>
              <div className="text-3xl font-bold text-purple-600">₹{corpus.toFixed(0)}</div>
              <div className="text-sm mt-2">in {years} years</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
