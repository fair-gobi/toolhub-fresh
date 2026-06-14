'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function PAN() {
  const [pan, setPan] = useState('')
  const valid = /^\d{9}$/.test(pan)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="text-blue-600">← Back</Link>
        <h1 className="text-3xl font-bold mt-4">PAN/VAT Checker 🇳🇵</h1>
        <div className="bg-white p-6 rounded-xl shadow mt-4">
          <input value={pan} onChange={e=>setPan(e.target.value)} placeholder="Enter 9-digit PAN" maxLength={9} className="w-full border p-3 rounded mb-3" />
          <div className={`p-4 rounded text-center font-bold ${pan? (valid? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800') : 'bg-gray-100'}`}>
            {pan? (valid? '✓ Valid PAN format' : '✗ Invalid (must be 9 digits)') : 'Enter PAN'}
          </div>
          <p className="text-sm text-gray-500 mt-3">Note: Format check only. For real verification, connect to IRD API later.</p>
        </div>
      </div>
    </div>
  )
}
