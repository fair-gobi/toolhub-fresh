'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const CURRENCIES = ['NPR','INR','USD','EUR','GBP']

export default function SIPCalculator() {
  useEffect(() => {
    document.title = 'SIP Calculator Nepal India - Monthly SIP Returns'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Free SIP calculator for NPR, INR, USD. Calculate mutual fund SIP returns.')
  }, [])

  const [monthly, setMonthly] = useState(10000)
  const [years, setYears] = useState(10)
  const [rate, setRate] = useState(12)
  const [currency, setCurrency] = useState('NPR')

  const months = years * 12
  const monthlyRate = rate / 12 / 100
  const future = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate)
  const invested = monthly * months
  const gains = future - invested

  const fmt = (n: number) => new Intl.NumberFormat('en', { style: 'currency', currency, maximumFractionDigits: 0 }).format(n)

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/finance" className="text-sm text-blue-600 hover:underline">← Back</Link>
        <div className="bg-white rounded-2xl border mt-4 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <h1 className="text-2xl font-bold">SIP Calculator</h1>
            <p className="text-blue-100 text-sm">Systematic Investment Plan returns</p>
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <select value={currency} onChange={e=>setCurrency(e.target.value)} className="w-full p-3 border rounded-xl">
                {CURRENCIES.map(c => <option key={c}>{c}</option>)}
              </select>
              <div><label className="text-sm">Monthly: {fmt(monthly)}</label><input type="range" min="1000" max="100000" step="1000" value={monthly} onChange={e=>setMonthly(+e.target.value)} className="w-full" /></div>
              <div><label className="text-sm">Years: {years}</label><input type="range" min="1" max="30" value={years} onChange={e=>setYears(+e.target.value)} className="w-full" /></div>
              <div><label className="text-sm">Return: {rate}%</label><input type="range" min="5" max="25" step="0.5" value={rate} onChange={e=>setRate(+e.target.value)} className="w-full" /></div>
            </div>
            <div className="bg-blue-50 rounded-2xl p-6">
              <div className="text-center"><div className="text-sm text-gray-600">Future Value</div><div className="text-3xl font-bold text-blue-600">{fmt(future)}</div></div>
              <div className="mt-4 space-y-2 text-sm"><div className="flex justify-between"><span>Invested</span><span>{fmt(invested)}</span></div><div className="flex justify-between"><span>Gains</span><span className="text-green-600">{fmt(gains)}</span></div></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}