'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CompoundInterest() {
  useEffect(() => {
    document.title = 'Compound Interest Calculator'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Calculate compound interest with daily monthly yearly compounding.')
  }, [])

  const [principal, setPrincipal] = useState(100000)
  const [rate, setRate] = useState(8)
  const [years, setYears] = useState(5)
  const [freq, setFreq] = useState(12)

  const amount = principal * Math.pow(1 + rate/100/freq, freq * years)
  const interest = amount - principal

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/finance" className="text-sm text-green-600 hover:underline">← Back</Link>
        <div className="bg-white rounded-2xl border mt-4 p-6">
          <h1 className="text-2xl font-bold mb-4">Compound Interest Calculator</h1>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div><label>Principal</label><input type="number" value={principal} onChange={e=>setPrincipal(+e.target.value)} className="w-full p-3 border rounded-xl" /></div>
              <div><label>Rate %</label><input type="number" value={rate} onChange={e=>setRate(+e.target.value)} className="w-full p-3 border rounded-xl" /></div>
              <div><label>Years</label><input type="number" value={years} onChange={e=>setYears(+e.target.value)} className="w-full p-3 border rounded-xl" /></div>
              <div><label>Compounding</label><select value={freq} onChange={e=>setFreq(+e.target.value)} className="w-full p-3 border rounded-xl"><option value="1">Yearly</option><option value="12">Monthly</option><option value="365">Daily</option></select></div>
            </div>
            <div className="bg-green-50 rounded-xl p-6 text-center">
              <div>Future Amount</div>
              <div className="text-3xl font-bold text-green-600">₹{amount.toFixed(0)}</div>
              <div className="mt-4">Interest Earned: ₹{interest.toFixed(0)}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
