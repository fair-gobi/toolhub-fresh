'use client'

import { useState } from 'react'

type Item = { desc: string; qty: number; price: number }

export default function InvoiceGenerator() {
  const [company, setCompany] = useState('Your Company')
  const [client, setClient] = useState('')
  const [invoiceNo, setInvoiceNo] = useState('INV-001')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [items, setItems] = useState<Item[]>([{ desc: 'Web Design', qty: 1, price: 500 }])
  const [tax, setTax] = useState(0)

  const addItem = () => setItems([...items, { desc: '', qty: 1, price: 0 }])
  const updateItem = (i: number, field: keyof Item, value: string) => {
    const newItems = [...items]
    newItems[i] = {...newItems[i], [field]: field === 'desc'? value : Number(value) }
    setItems(newItems)
  }

  const subtotal = items.reduce((sum, it) => sum + it.qty * it.price, 0)
  const taxAmount = subtotal * (tax / 100)
  const total = subtotal + taxAmount

  const downloadPDF = () => window.print()

  return (
    <main className="container mx-auto p-6 max-w-4xl">
      <div className="bg-gradient-to-r from-emerald-600 to-green-500 text-white rounded-xl p-6 mb-6 print:hidden">
        <div className="flex items-center gap-3">
          <span className="text-4xl">💵</span>
          <div>
            <h1 className="text-3xl font-bold">Invoice Generator</h1>
            <p className="opacity-90">Create professional invoices — print to PDF</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 print:hidden">
        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold mb-4">Details</h2>
          <input value={company} onChange={e=>setCompany(e.target.value)} placeholder="Your Company" className="w-full border rounded px-3 py-2 mb-3" />
          <input value={client} onChange={e=>setClient(e.target.value)} placeholder="Client Name" className="w-full border rounded px-3 py-2 mb-3" />
          <div className="grid grid-cols-2 gap-3">
            <input value={invoiceNo} onChange={e=>setInvoiceNo(e.target.value)} placeholder="Invoice #" className="border rounded px-3 py-2" />
            <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="border rounded px-3 py-2" />
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold mb-4">Items</h2>
          {items.map((it, i) => (
            <div key={i} className="grid grid-cols-12 gap-2 mb-2">
              <input value={it.desc} onChange={e=>updateItem(i,'desc',e.target.value)} placeholder="Description" className="col-span-6 border rounded px-2 py-1 text-sm" />
              <input type="number" value={it.qty} onChange={e=>updateItem(i,'qty',e.target.value)} className="col-span-2 border rounded px-2 py-1 text-sm" />
              <input type="number" value={it.price} onChange={e=>updateItem(i,'price',e.target.value)} className="col-span-4 border rounded px-2 py-1 text-sm" />
            </div>
          ))}
          <button onClick={addItem} className="text-sm text-emerald-600 mt-2">+ Add item</button>
          <div className="mt-4">
            <label className="text-sm">Tax %</label>
            <input type="number" value={tax} onChange={e=>setTax(Number(e.target.value))} className="w-20 border rounded px-2 py-1 ml-2" />
          </div>
        </div>
      </div>

      {/* Invoice Preview */}
      <div className="bg-white border rounded-xl p-8 mt-6 print:border-0 print:shadow-none">
        <div className="flex justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">{company}</h2>
            <p className="text-gray-600">Invoice</p>
          </div>
          <div className="text-right">
            <p><strong>#{invoiceNo}</strong></p>
            <p className="text-gray-600">{date}</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-600">Bill To:</p>
          <p className="font-medium">{client || 'Client Name'}</p>
        </div>

        <table className="w-full mb-6">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Description</th>
              <th className="text-right py-2">Qty</th>
              <th className="text-right py-2">Price</th>
              <th className="text-right py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, i) => (
              <tr key={i} className="border-b">
                <td className="py-2">{it.desc}</td>
                <td className="text-right">{it.qty}</td>
                <td className="text-right">${it.price}</td>
                <td className="text-right">${(it.qty * it.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end">
          <div className="w-48">
            <div className="flex justify-between py-1"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between py-1"><span>Tax ({tax}%)</span><span>${taxAmount.toFixed(2)}</span></div>
            <div className="flex justify-between py-2 font-bold border-t mt-1"><span>Total</span><span>${total.toFixed(2)}</span></div>
          </div>
        </div>
      </div>

      <button onClick={downloadPDF} className="w-full mt-6 bg-emerald-600 text-white rounded-lg py-3 font-medium hover:bg-emerald-700 print:hidden">
        Download PDF (Print)
      </button>
    </main>
  )
}
