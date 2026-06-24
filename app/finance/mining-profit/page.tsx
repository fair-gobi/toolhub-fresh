export const metadata = {
  title: 'Crypto Mining Profit Calculator - Mining Profitability',
  description: 'Estimate daily crypto mining profits. Calculate based on hashrate, power consumption, and electricity cost. For Bitcoin and altcoin miners.',
}
'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Mining() {
  const [hash, setHash] = useState(100)
  const [power, setPower] = useState(3250)
  const [cost, setCost] = useState(0.12)
  const [reward, setReward] = useState(0.0003)

  const dailyRev = hash * reward * 24
  const dailyCost = power / 1000 * 24 * cost
  const profit = dailyRev - dailyCost

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/finance" className="text-sm text-gray-600 hover:underline mb-4 inline-block">← Back</Link>
        <div className="bg-white rounded-2xl border overflow-hidden">
          <div className="bg-gradient-to-r from-gray-700 to-gray-900 p-6 text-white">
            <h1 className="text-2xl font-bold">⛏️ Mining Profit Calculator</h1>
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <input type="number" value={hash} onChange={e=>setHash(+e.target.value)} placeholder="Hashrate (TH/s)" className="w-full p-3 border rounded-xl" />
              <input type="number" value={power} onChange={e=>setPower(+e.target.value)} placeholder="Power (W)" className="w-full p-3 border rounded-xl" />
              <input type="number" step="0.01" value={cost} onChange={e=>setCost(+e.target.value)} placeholder="Electricity $/kWh" className="w-full p-3 border rounded-xl" />
              <input type="number" step="0.0001" value={reward} onChange={e=>setReward(+e.target.value)} placeholder="Reward per TH/day" className="w-full p-3 border rounded-xl" />
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="text-sm">Daily Profit</div>
              <div className={`text-3xl font-bold my-2 ${profit>=0?'text-green-600':'text-red-600'}`}>${profit.toFixed(2)}</div>
              <div className="text-xs text-gray-500">Monthly: ${(profit*30).toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
