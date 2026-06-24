'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Inflation() {
  useEffect(() => {
    document.title = 'Inflation Calculator'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Calculate future value with inflation.')
  }, [])

  const [amount, setAmount] = useState(100000)
  const [rate, setRate] = useState(6)
  const [years, setYears] = useState(10)

  const future = amount * Math.pow(1 + rate/100, years)
  const loss = ((future - amount) / future) * 100

  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/finance" className="text-sm text-rose-600 hover:underline">← Back</Link>
        <div className="bg-white rounded-2xl border mt-4 p-6">
          <h1 className="text-2xl font-bold mb-4">Inflation Calculator</h1>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <input type="number" value={amount} onChange={e=>setAmount(+e.target.value)} className="w-full p-3 border rounded-xl" placeholder="Today's Money" />
              <input type="number" value={rate} onChange={e=>setRate(+e.target.value)} className="w-full p-3 border rounded-xl" placeholder="Inflation %" />
              <input type="number" value={years} onChange={e=>setYears(+e.target.value)} className="w-full p-3 border rounded-xl" placeholder="Years" />
            </div>
            <div className="bg-rose-50 rounded-xl p-6 text-center">
              <div>Future Equivalent</div>
              <div className="text-3xl font-bold text-rose-600">₹{future.toFixed(0)}</div>
              <div className="text-sm mt-2">Purchasing power loss: {loss.toFixed(1)}%</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

