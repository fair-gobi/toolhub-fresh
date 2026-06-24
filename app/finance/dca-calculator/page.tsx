'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function DCA() {
  useEffect(() => {
    document.title = 'DCA Calculator'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Dollar cost averaging calculator.')
  }, [])

  const [amount, setAmount] = useState(100)
  const [freq, setFreq] = useState(12)
  const [years, setYears] = useState(3)
  const [startPrice, setStartPrice] = useState(30000)
  const [endPrice, setEndPrice] = useState(45000)

  const totalInvested = amount * freq * years
  const avgPrice = (startPrice + endPrice) / 2
  const coins = totalInvested / avgPrice
  const finalValue = coins * endPrice
  const profit = finalValue - totalInvested

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/finance" className="text-sm text-sky-600 hover:underline">← Back</Link>
        <div className="bg-white rounded-2xl border mt-4 p-6">
          <h1 className="text-2xl font-bold mb-4">DCA Calculator</h1>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <input type="number" value={amount} onChange={e=>setAmount(+e.target.value)} className="w-full p-3 border rounded-xl" placeholder="Amount per buy" />
              <input type="number" value={freq} onChange={e=>setFreq(+e.target.value)} className="w-full p-3 border rounded-xl" placeholder="Buys per year" />
              <input type="number" value={years} onChange={e=>setYears(+e.target.value)} className="w-full p-3 border rounded-xl" placeholder="Years" />
              <input type="number" value={startPrice} onChange={e=>setStartPrice(+e.target.value)} className="w-full p-3 border rounded-xl" placeholder="Start Price" />
              <input type="number" value={endPrice} onChange={e=>setEndPrice(+e.target.value)} className="w-full p-3 border rounded-xl" placeholder="End Price" />
            </div>
            <div className="bg-sky-50 rounded-xl p-6 text-center">
              <div>Final Value</div>
              <div className="text-3xl font-bold text-sky-600">${finalValue.toFixed(0)}</div>
              <div className="mt-2">Profit: ${profit.toFixed(0)}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
