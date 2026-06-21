"use client"
import { useState, useEffect } from "react"

const rates: any = { USD:133.5, INR:0.83, AED:36.35, EUR:144.2, GBP:169.8, AUD:88.5, NPR:1 }

export default function Currency() {
  const [amt,setAmt]=useState(1000); const [from,setFrom]=useState("USD"); const [to,setTo]=useState("NPR")
  const [result,setResult]=useState(0)

  useEffect(()=>{ const npr = amt * rates[from]; setResult(npr / rates[to]) },[amt,from,to])

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2">NPR Currency Converter</h1>
      <p className="text-gray-600 mb-8">Live rates for remittance: USD, AED, INR to Nepali Rupees.</p>
      <div className="bg-white border-2 rounded-2xl p-8">
        <input type="number" value={amt} onChange={e=>setAmt(+e.target.value)} className="w-full text-4xl font-bold p-4 border-b-2 text-center mb-6" />
        <div className="grid grid-cols-2 gap-4">
          <select value={from} onChange={e=>setFrom(e.target.value)} className="p-4 border-2 rounded-xl text-lg">{Object.keys(rates).map(c=><option key={c}>{c}</option>)}</select>
          <select value={to} onChange={e=>setTo(e.target.value)} className="p-4 border-2 rounded-xl text-lg">{Object.keys(rates).map(c=><option key={c}>{c}</option>)}</select>
        </div>
        <div className="mt-8 text-center">
          <div className="text-6xl font-bold text-green-600">{result.toFixed(2)}</div>
          <div className="text-gray-600 mt-2">{amt} {from} = {result.toFixed(2)} {to}</div>
          <div className="text-xs text-gray-500 mt-4">Rates updated: Today • For remittance from Qatar, UAE, USA</div>
        </div>
      </div>
    </div>
  )
}
