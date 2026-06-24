'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const CURRENCIES = ['NPR','INR','USD','EUR','GBP']

export default function EMI() {
  useEffect(() => {
    document.title = 'Loan EMI Calculator Nepal India'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Free EMI calculator for home, car, personal loan. Calculate monthly EMI in NPR, INR, USD.')
  }, [])

  const [principal, setPrincipal] = useState(1000000)
  const [rate, setRate] = useState(10)
  const [years, setYears] = useState(5)
  const [currency, setCurrency] = useState('NPR')

  const monthlyRate = rate / 12 / 100
  const months = years * 12
  const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1)
  const total = emi * months
  const interest = total - principal
  const fmt = (n: number) => new Intl.NumberFormat('en', { style: 'currency', currency, maximumFractionDigits: 0 }).format(n)

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/finance" className="text-sm text-indigo-600 hover:underline">← Back</Link>
        <div className="bg-white rounded-2xl border mt-4 p-6">
          <h1 className="text-2xl font-bold mb-4">Loan EMI Calculator</h1>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <select value={currency} onChange={e=>setCurrency(e.target.value)} className="w-full p-3 border rounded-xl">{CURRENCIES.map(c=><option key={c}>{c}</option>)}</select>
              <div><label>Principal: {fmt(principal)}</label><input type="range" min="100000" max="10000000" step="50000" value={principal} onChange={e=>setPrincipal(+e.target.value)} className="w-full" /></div>
              <div><label>Rate: {rate}%</label><input type="range" min="5" max="20" step="0.25" value={rate} onChange={e=>setRate(+e.target.value)} className="w-full" /></div>
              <div><label>Years: {years}</label><input type="range" min="1" max="30" value={years} onChange={e=>setYears(+e.target.value)} className="w-full" /></div>
            </div>
            <div className="bg-indigo-50 rounded-xl p-6 text-center">
              <div>Monthly EMI</div><div className="text-3xl font-bold text-indigo-600">{fmt(emi)}</div>
              <div className="mt-4 text-sm">Total Interest: {fmt(interest)}</div>
              <div className="text-sm">Total Payment: {fmt(total)}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
