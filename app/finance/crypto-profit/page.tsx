'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CryptoProfit() {
  useEffect(() => {
    document.title = 'Crypto Profit Calculator'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Calculate crypto trading profit with fees.')
  }, [])

  const [buy, setBuy] = useState(30000)
  const [sell, setSell] = useState(45000)
  const [qty, setQty] = useState(0.5)
  const [fee, setFee] = useState(0.1)

  const invested = buy * qty
  const gross = sell * qty
  const fees = (invested + gross) * fee / 100
  const profit = gross - invested - fees
  const roi = (profit / invested) * 100

  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/finance" className="text-sm text-yellow-600 hover:underline">← Back</Link>
        <div className="bg-white rounded-2xl border mt-4 p-6">
          <h1 className="text-2xl font-bold mb-4">₿ Crypto Profit Calculator</h1>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <input type="number" value={buy} onChange={e=>setBuy(+e.target.value)} className="w-full p-3 border rounded-xl" placeholder="Buy Price" />
              <input type="number" value={sell} onChange={e=>setSell(+e.target.value)} className="w-full p-3 border rounded-xl" placeholder="Sell Price" />
              <input type="number" step="0.0001" value={qty} onChange={e=>setQty(+e.target.value)} className="w-full p-3 border rounded-xl" placeholder="Quantity" />
              <input type="number" step="0.01" value={fee} onChange={e=>setFee(+e.target.value)} className="w-full p-3 border rounded-xl" placeholder="Fee %" />
            </div>
            <div className="bg-yellow-50 rounded-xl p-6 text-center">
              <div>Net Profit</div>
              <div className={`text-3xl font-bold ${profit>=0?'text-green-600':'text-red-600'}`}>${profit.toFixed(2)}</div>
              <div className="mt-2">ROI: {roi.toFixed(1)}%</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}


