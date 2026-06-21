"use client"
import { useState } from "react"

export default function TaxCalculator() {
  const [income,setIncome]=useState(600000); const [married,setMarried]=useState(false)
  const slab = married? 600000:500000
  const taxable = Math.max(0,income-slab)
  let tax = 0
  if(taxable>0){ const t1=Math.min(taxable,200000); tax+=t1*0.1 }
  if(taxable>200000){ const t2=Math.min(taxable-200000,300000); tax+=t2*0.2 }
  if(taxable>500000){ const t3=taxable-500000; tax+=t3*0.3 }
  const net = income-tax

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2">Nepal Income Tax Calculator 2082/83</h1>
      <p className="text-gray-600 mb-8">FY 2025/26 tax slabs for salaried individuals.</p>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div><label>Annual Income (Rs)</label><input type="number" value={income} onChange={e=>setIncome(+e.target.value)} className="w-full p-4 border-2 rounded-xl text-xl" /></div>
          <label className="flex items-center gap-3"><input type="checkbox" checked={married} onChange={e=>setMarried(e.target.checked)} className="w-5 h-5" /> Married (Rs 600,000 exemption)</label>
        </div>
        <div className="bg-red-50 rounded-2xl p-8 border-2 border-red-200">
          <div className="text-sm text-red-700">Yearly Tax</div>
          <div className="text-5xl font-bold text-red-700">Rs {tax.toLocaleString()}</div>
          <div className="mt-4 space-y-1 text-sm">
            <div className="flex justify-between"><span>Monthly Tax</span><span>Rs {(tax/12).toFixed(0)}</span></div>
            <div className="flex justify-between"><span>Net Income</span><span>Rs {net.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Effective Rate</span><span>{((tax/income)*100).toFixed(1)}%</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
