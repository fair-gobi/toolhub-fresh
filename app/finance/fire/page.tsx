'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const CURRENCIES = ['NPR','INR','USD','EUR','GBP']

export default function FIRE() {
  useEffect(() => {
    document.title = 'FIRE Calculator - Financial Independence Retire Early'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Calculate your FIRE number and years to financial freedom for Nepal and India.')
  }, [])

  const [expenses, setExpenses] = useState(600000)
  const [current, setCurrent] = useState(1000000)
  const [monthly, setMonthly] = useState(50000)
  const [rate, setRate] = useState(12)
  const [currency, setCurrency] = useState('NPR')

  const fireNumber = expenses * 25
  const years = Math.log((fireNumber * rate/1200 + monthly) / (current * rate/1200 + monthly)) / Math.log(1 + rate/1200) / 12
  const fmt = (n: number) => new Intl.NumberFormat('en', { style: 'currency', currency, maximumFractionDigits: 0 }).format(n)

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/finance" className="text-sm text-pink-600 hover:underline mb-4 inline-block">← Back</Link>
        <div className="bg-white rounded-2xl border border-pink-100 overflow-hidden">
          <div className="bg-gradient-to-r from-pink-600 to-rose-600 p-6 text-white">
            <h1 className="text-2xl font-bold">🔥 FIRE Calculator</h1>
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <select value={currency} onChange={e=>setCurrency(e.target.value)} className="w-full p-3 border rounded-xl">{CURRENCIES.map(c => <option key={c}>{c}</option>)}</select>
              <div><label className="text-sm">Annual Expenses: {fmt(expenses)}</label><input type="range" min="100000" max="5000000" step="50000" value={expenses} onChange={e=>setExpenses(+e.target.value)} className="w-full" /></div>
              <div><label className="text-sm">Current: {fmt(current)}</label><input type="range" min="0" max="10000000" step="100000" value={current} onChange={e=>setCurrent(+e.target.value)} className="w-full" /></div>
              <div><label className="text-sm">Monthly: {fmt(monthly)}</label><input type="range" min="5000" max="200000" step="5000" value={monthly} onChange={e=>setMonthly(+e.target.value)} className="w-full" /></div>
            </div>
            <div className="bg-pink-50 rounded-2xl p-6 text-center">
              <div>FIRE Number</div><div className="text-3xl font-bold text-pink-600">{fmt(fireNumber)}</div>
              <div className="mt-4">Years: {years > 0 && isFinite(years) ? years.toFixed(1) : '0'}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
