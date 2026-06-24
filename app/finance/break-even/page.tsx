'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const CURRENCIES = ['NPR','INR','USD','EUR','GBP']

export default function BreakEven() {
  useEffect(() => {
    document.title = 'Break Even Calculator'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Calculate break-even point for business.')
  }, [])

  const [fixed, setFixed] = useState(50000)
  const [variable, setVariable] = useState(100)
  const [price, setPrice] = useState(250)
  const [currency, setCurrency] = useState('NPR')

  const units = price > variable ? fixed / (price - variable) : 0
  const fmt = (n: number) => new Intl.NumberFormat('en', { style: 'currency', currency, maximumFractionDigits: 0 }).format(n)

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/finance" className="text-sm text-green-600 hover:underline">← Back</Link>
        <div className="bg-white rounded-2xl border mt-4 p-6">
          <h1 className="text-2xl font-bold mb-4">Break-even Calculator</h1>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <select value={currency} onChange={e=>setCurrency(e.target.value)} className="w-full p-3 border rounded-xl">{CURRENCIES.map(c=><option key={c}>{c}</option>)}</select>
              <input type="number" value={fixed} onChange={e=>setFixed(+e.target.value)} className="w-full p-3 border rounded-xl" placeholder="Fixed Costs" />
              <input type="number" value={variable} onChange={e=>setVariable(+e.target.value)} className="w-full p-3 border rounded-xl" placeholder="Variable Cost" />
              <input type="number" value={price} onChange={e=>setPrice(+e.target.value)} className="w-full p-3 border rounded-xl" placeholder="Price" />
            </div>
            <div className="bg-green-50 rounded-xl p-6 text-center">
              <div>Break-even Units</div>
              <div className="text-4xl font-bold text-green-600">{Math.ceil(units)}</div>
              <div className="mt-2">Revenue: {fmt(units * price)}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
