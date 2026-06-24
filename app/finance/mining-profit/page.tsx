'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function MiningProfit() {
  useEffect(() => {
    document.title = 'Crypto Mining Profit Calculator'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Estimate mining profitability.')
  }, [])

  const [hashrate, setHashrate] = useState(100)
  const [power, setPower] = useState(3250)
  const [cost, setCost] = useState(0.12)
  const [btcPrice, setBtcPrice] = useState(45000)

  const btcPerDay = (hashrate / 100) * 0.0003
  const revenue = btcPerDay * btcPrice
  const electricity = (power / 1000) * 24 * cost
  const profit = revenue - electricity

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/finance" className="text-sm text-gray-600 hover:underline">← Back</Link>
        <div className="bg-white rounded-2xl border mt-4 p-6">
          <h1 className="text-2xl font-bold mb-4">⛏️ Mining Profit Calculator</h1>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <input type="number" value={hashrate} onChange={e=>setHashrate(+e.target.value)} className="w-full p-3 border rounded-xl" placeholder="Hashrate TH/s" />
              <input type="number" value={power} onChange={e=>setPower(+e.target.value)} className="w-full p-3 border rounded-xl" placeholder="Power Watts" />
              <input type="number" step="0.001" value={cost} onChange={e=>setCost(+e.target.value)} className="w-full p-3 border rounded-xl" placeholder="Electricity $/kWh" />
              <input type="number" value={btcPrice} onChange={e=>setBtcPrice(+e.target.value)} className="w-full p-3 border rounded-xl" placeholder="BTC Price" />
            </div>
            <div className="bg-gray-100 rounded-xl p-6 text-center">
              <div>Daily Profit</div>
              <div className={`text-3xl font-bold ${profit>=0?'text-green-600':'text-red-600'}`}>${profit.toFixed(2)}</div>
              <div className="text-sm mt-2">{btcPerDay.toFixed(6)} BTC/day</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
