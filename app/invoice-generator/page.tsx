'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Invoice() {
  const [items, setItems] = useState([{desc:'', qty:1, rate:0}])
  const total = items.reduce((s,i)=>s+i.qty*i.rate,0)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-blue-600">← Back</Link>
        <h1 className="text-3xl font-bold mt-4">Invoice Generator 🇳🇵</h1>
        <div className="bg-white p-6 rounded-xl shadow mt-4">
          {items.map((it,i)=>(
            <div key={i} className="grid grid-cols-3 gap-2 mb-2">
              <input placeholder="Description" value={it.desc} onChange={e=>{const n=[...items];n[i].desc=e.target.value;setItems(n)}} className="border p-2 rounded" />
              <input type="number" placeholder="Qty" value={it.qty} onChange={e=>{const n=[...items];n[i].qty=+e.target.value;setItems(n)}} className="border p-2 rounded" />
              <input type="number" placeholder="Rate" value={it.rate} onChange={e=>{const n=[...items];n[i].rate=+e.target.value;setItems(n)}} className="border p-2 rounded" />
            </div>
          ))}
          <button onClick={()=>setItems([...items,{desc:'',qty:1,rate:0}])} className="text-blue-600">+ Add Item</button>
          <div className="text-right text-xl font-bold mt-4">Total: Rs. {total}</div>
          <button onClick={()=>window.print()} className="w-full bg-green-600 text-white py-3 rounded mt-4">Print Invoice</button>
        </div>
      </div>
    </div>
  )
}
