'use client'
import { useState } from 'react'
import Link from 'next/link'
import QRCode from 'qrcode'

export default function PaymentQR() {
  const [number, setNumber] = useState('')
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [qr, setQr] = useState('')

  const generate = async () => {
    const data = `eSewa:${number}|${name}|${amount}`
    const url = await QRCode.toDataURL(data)
    setQr(url)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="text-blue-600">← Back</Link>
        <h1 className="text-3xl font-bold mt-4">eSewa/Khalti QR Generator 🇳🇵</h1>
        <div className="bg-white p-6 rounded-xl shadow mt-4 space-y-3">
          <input placeholder="eSewa/Khalti Number" value={number} onChange={e => setNumber(e.target.value)} className="w-full border p-3 rounded" />
          <input placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} className="w-full border p-3 rounded" />
          <input placeholder="Amount (optional)" value={amount} onChange={e => setAmount(e.target.value)} className="w-full border p-3 rounded" />
          <button onClick={generate} className="w-full bg-green-600 text-white py-3 rounded">Generate QR</button>
          {qr && <img src={qr} className="mx-auto mt-4 w-64" />}
        </div>
      </div>
    </div>
  )
}
