"use client"
import { useState } from "react"

export default function APR() {
  const [amount,setAmount]=useState(10000); const [rate,setRate]=useState(12); const [fees,setFees]=useState(200); const [years,setYears]=useState(3)
  const monthly = rate/100/12; const n = years*12
  const payment = amount*monthly*Math.pow(1+monthly,n)/(Math.pow(1+monthly,n)-1)
  const totalPaid = payment*n + fees
  const apr = ((totalPaid/amount -1)/years)*100

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2">APR Calculator</h1>
      <p className="text-gray-600 mb-8">Compare true cost of loans worldwide</p>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <input placeholder="Loan Amount" type="number" value={amount} onChange={e=>setAmount(+e.target.value)} className="w-full p-3 border-2 rounded-xl"/>
          <input placeholder="Interest %" type="number" value={rate} onChange={e=>setRate(+e.target.value)} className="w-full p-3 border-2 rounded-xl"/>
          <input placeholder="Fees" type="number" value={fees} onChange={e=>setFees(+e.target.value)} className="w-full p-3 border-2 rounded-xl"/>
          <input placeholder="Years" type="number" value={years} onChange={e=>setYears(+e.target.value)} className="w-full p-3 border-2 rounded-xl"/>
        </div>
        <div className="bg-purple-600 text-white rounded-2xl p-6">
          <div>True APR</div>
          <div className="text-5xl font-bold">{apr.toFixed(2)}%</div>
          <div className="mt-4 text-sm">Monthly: ${payment.toFixed(0)}<br/>Total cost: ${totalPaid.toFixed(0)}</div>
        </div>
      </div>
    </div>
  )
}
