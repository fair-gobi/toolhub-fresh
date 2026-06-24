'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function SavingsGoal() {
  useEffect(() => {
    document.title = 'Savings Goal Calculator'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Calculate monthly savings needed to reach your target.')
  }, [])

  const [target, setTarget] = useState(1000000)
  const [years, setYears] = useState(5)
  const [rate, setRate] = useState(10)
  const [current, setCurrent] = useState(0)

  const months = years * 12
  const r = rate / 12 / 100
  const futureCurrent = current * Math.pow(1 + r, months)
  const needed = (target - futureCurrent) * r / ((Math.pow(1 + r, months) - 1) * (1 + r))

  return (
    <main className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/finance" className="text-sm text-teal-600 hover:underline">← Back</Link>
        <div className="bg-white rounded-2xl border mt-4 p-6">
          <h1 className="text-2xl font-bold mb-4">Savings Goal Calculator</h1>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <input type="number" value={target} onChange={e=>setTarget(+e.target.value)} className="w-full p-3 border rounded-xl" placeholder="Target Amount" />
              <input type="number" value={years} onChange={e=>setYears(+e.target.value)} className="w-full p-3 border rounded-xl" placeholder="Years" />
              <input type="number" value={rate} onChange={e=>setRate(+e.target.value)} className="w-full p-3 border rounded-xl" placeholder="Return %" />
              <input type="number" value={current} onChange={e=>setCurrent(+e.target.value)} className="w-full p-3 border rounded-xl" placeholder="Current Savings" />
            </div>
            <div className="bg-teal-50 rounded-xl p-6 text-center">
              <div>Monthly Needed</div>
              <div className="text-3xl font-bold text-teal-600">₹{needed > 0 ? needed.toFixed(0) : 0}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
