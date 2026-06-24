'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Runway() {
  useEffect(() => {
    document.title = 'Startup Runway Calculator'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Calculate how long startup cash will last.')
  }, [])

  const [cash, setCash] = useState(500000)
  const [burn, setBurn] = useState(50000)
  const [revenue, setRevenue] = useState(10000)

  const netBurn = burn - revenue
  const months = netBurn > 0 ? cash / netBurn : 999

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/finance" className="text-sm text-violet-600 hover:underline">← Back</Link>
        <div className="bg-white rounded-2xl border mt-4 p-6">
          <h1 className="text-2xl font-bold mb-4">Startup Runway Calculator</h1>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <input type="number" value={cash} onChange={e=>setCash(+e.target.value)} className="w-full p-3 border rounded-xl" placeholder="Cash in Bank" />
              <input type="number" value={burn} onChange={e=>setBurn(+e.target.value)} className="w-full p-3 border rounded-xl" placeholder="Monthly Burn" />
              <input type="number" value={revenue} onChange={e=>setRevenue(+e.target.value)} className="w-full p-3 border rounded-xl" placeholder="Monthly Revenue" />
            </div>
            <div className="bg-violet-50 rounded-xl p-6 text-center">
              <div>Runway</div>
              <div className="text-4xl font-bold text-violet-600">{months < 999 ? months.toFixed(1) : '∞'}</div>
              <div>months</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

