'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function CryptoProfit() {
  const [buy, setBuy] = useState(30000)
  const [sell, setSell] = useState(45000)
  const [qty, setQty] = useState(0.5)
  const [fee, setFee] = useState(0.1)

  const invested = buy * qty
  const gross = sell * qty
  const fees = (invested + gross) * fee / 100
  const profit = gross - invested - fees
  const roi = invested > 0 ? profit / invested * 100 : 0

  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/finance" className="text-sm text-yellow-600 hover:underline mb-4 inline-block">← Back</Link>
        <div className="bg-white rounded-2xl border border-yellow-200 overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 text-white">
            <h1 className="text-2xl font-bold">₿ Crypto Profit Calculator</h1>
            <p className="text-yellow-100 text-sm">Calculate crypto trade profit with fees</p>
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <input type="number" value={buy} onChange={e=>setBuy(+e.target.value)} placeholder="Buy Price" className="w-full p-3 border rounded-xl" />
              <input type="number" value={sell} onChange={e=>setSell(+e.target.value)} placeholder="Sell Price" className="w-full p-3 border rounded-xl" />
              <input type="number" step="0.001" value={qty} onChange={e=>setQty(+e.target.value)} placeholder="Quantity" className="w-full p-3 border rounded-xl" />
              <input type="number" step="0.01" value={fee} onChange={e=>setFee(+e.target.value)} placeholder="Fee %" className="w-full p-3 border rounded-xl" />
            </div>
            <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200">
              <div className="text-center">
                <div className="text-sm text-gray-600">Net Profit</div>
                <div className={`text-3xl font-bold my-2 ${profit>=0?'text-green-600':'text-red-600'}`}>${profit.toFixed(2)}</div>
                <div className="text-sm">ROI: {roi.toFixed(1)}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
