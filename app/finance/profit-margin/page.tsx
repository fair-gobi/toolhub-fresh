'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ProfitMargin() {
  useEffect(() => {
    document.title = 'Profit Margin Calculator'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Calculate profit margin and markup.')
  }, [])

  const [cost, setCost] = useState(100)
  const [price, setPrice] = useState(150)

  const profit = price - cost
  const margin = price > 0 ? (profit / price) * 100 : 0
  const markup = cost > 0 ? (profit / cost) * 100 : 0

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/finance" className="text-sm text-amber-600 hover:underline">← Back</Link>
        <div className="bg-white rounded-2xl border mt-4 p-6">
          <h1 className="text-2xl font-bold mb-4">Profit Margin Calculator</h1>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div><label>Cost Price</label><input type="number" value={cost} onChange={e=>setCost(+e.target.value)} className="w-full p-3 border rounded-xl" /></div>
              <div><label>Selling Price</label><input type="number" value={price} onChange={e=>setPrice(+e.target.value)} className="w-full p-3 border rounded-xl" /></div>
            </div>
            <div className="bg-amber-50 rounded-xl p-6">
              <div>Profit: ${profit.toFixed(2)}</div>
              <div className="text-xl font-bold">Margin: {margin.toFixed(1)}%</div>
              <div>Markup: {markup.toFixed(1)}%</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
