'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CashFlow() {
  useEffect(() => {
    document.title = 'Cash Flow Calculator'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Track monthly cash inflow vs outflow.')
  }, [])

  const [inflow, setInflow] = useState(100000)
  const [outflow, setOutflow] = useState(75000)

  const net = inflow - outflow

  return (
    <main className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/finance" className="text-sm text-cyan-600 hover:underline">← Back</Link>
        <div className="bg-white rounded-2xl border mt-4 p-6">
          <h1 className="text-2xl font-bold mb-4">Cash Flow Calculator</h1>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div><label>Monthly Inflow</label><input type="number" value={inflow} onChange={e=>setInflow(+e.target.value)} className="w-full p-3 border rounded-xl" /></div>
              <div><label>Monthly Outflow</label><input type="number" value={outflow} onChange={e=>setOutflow(+e.target.value)} className="w-full p-3 border rounded-xl" /></div>
            </div>
            <div className="bg-cyan-50 rounded-xl p-6 text-center">
              <div>Net Cash Flow</div>
              <div className={`text-4xl font-bold ${net>=0?'text-green-600':'text-red-600'}`}>{net>=0?'+':''}${net.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
