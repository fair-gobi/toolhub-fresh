'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function EMI() {
  useEffect(() => {
    document.title = 'Loan EMI Calculator Nepal India - EMI Calculator'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Free EMI calculator for home, car, personal loan. Calculate monthly EMI in NPR, INR, USD.')
  }, [])
export default function EMI() {
  useEffect(() => {
    document.title = 'Loan EMI Calculator Nepal India - EMI Calculator'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Free EMI calculator for home, car, personal loan. Calculate monthly EMI in NPR, INR, USD.')
  }, [])
export default function LoanEMI() {
  const [p,setP]=useState(1000000); const [r,setR]=useState(12); const [n,setN]=useState(5)
  const monthly = r/12/100; const months = n*12
  const emi = p*monthly*Math.pow(1+monthly,months)/(Math.pow(1+monthly,months)-1)
  const total = emi*months; const interest = total-p

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2">Loan EMI Calculator Nepal</h1>
      <p className="text-gray-600 mb-8">Calculate monthly EMI for home, car, personal loan. Nepal bank rates.</p>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div><label>Loan Amount (Rs)</label><input type="number" value={p} onChange={e=>setP(+e.target.value)} className="w-full p-4 border-2 rounded-xl text-xl" /></div>
          <div><label>Interest Rate %</label><input type="number" value={r} onChange={e=>setR(+e.target.value)} step="0.1" className="w-full p-4 border-2 rounded-xl text-xl" /></div>
          <div><label>Years</label><input type="number" value={n} onChange={e=>setN(+e.target.value)} className="w-full p-4 border-2 rounded-xl text-xl" /></div>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-8">
          <div className="text-sm opacity-90">Monthly EMI</div>
          <div className="text-5xl font-bold">Rs {emi.toFixed(0).toLocaleString()}</div>
          <div className="mt-6 space-y-2 border-t border-white/20 pt-4">
            <div className="flex justify-between"><span>Total Interest</span><span>Rs {interest.toFixed(0).toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Total Payment</span><span>Rs {total.toFixed(0).toLocaleString()}</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
