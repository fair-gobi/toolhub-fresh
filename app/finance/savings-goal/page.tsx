'use client'
import { useState } from 'react'
import Link from 'next/link'

const C = ['NPR','INR','USD','EUR','GBP']

export default function SavingsGoal() {
  const [t, setT] = useState(2000000)
  const [y, setY] = useState(5)
  const [r, setR] = useState(10)
  const [c, setC] = useState('NPR')
  
  const mr = r / 100 / 12
  const n = y * 12
  const pmt = t * mr / ((Math.pow(1 + mr, n) - 1) * (1 + mr))
  
  const fmt = (v: number) => new Intl.NumberFormat('en', { 
    style: 'currency', 
    currency: c, 
    maximumFractionDigits: 0 
  }).format(v)

  return (
    <main className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/finance" className="text-sm text-teal-600 hover:underline mb-4 inline-block">
          ← Back to Finance Tools
        </Link>
        
        <div className="bg-white rounded-2xl shadow-sm border border-teal-100 overflow-hidden">
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">🎯</div>
              <div>
                <h1 className="text-2xl font-bold">Savings Goal Calculator</h1>
                <p className="text-teal-100 text-sm">How much to save monthly to reach target</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Currency</label>
                <select value={c} onChange={e=>setC(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl">
                  {C.map(x => <option key={x}>{x}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Target Amount</label>
                <input type="number" value={t} onChange={e=>setT(+e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Time Period: {y} years</label>
                <input type="range" min="1" max="30" value={y} onChange={e=>setY(+e.target.value)} className="w-full accent-teal-600" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Expected Return: {r}%</label>
                <input type="range" min="1" max="20" value={r} onChange={e=>setR(+e.target.value)} className="w-full accent-teal-600" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-100 flex items-center justify-center">
              <div className="text-center w-full">
                <div className="text-sm text-gray-600 mb-2">Monthly SIP Required</div>
                <div className="text-4xl font-bold text-teal-600 mb-2">{fmt(pmt)}</div>
                <div className="text-xs text-gray-500">for {y} years at {r}% return</div>
                <div className="mt-4 pt-4 border-t border-teal-200">
                  <div className="text-sm text-gray-600">Total you will invest</div>
                  <div className="font-semibold">{fmt(pmt * n)}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="px-6 pb-6">
            <div className="bg-teal-50 rounded-xl p-4 border border-teal-100">
              <p className="text-sm text-gray-700">
                <strong>Example:</strong> To reach {fmt(t)} in {y} years, you need to invest {fmt(pmt)} every month. Start early to benefit from compounding.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}