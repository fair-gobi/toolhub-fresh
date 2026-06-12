'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function QRGenerator() {
  const [text, setText] = useState('https://toolhub.com')
  const [qr, setQr] = useState('')

  useEffect(() => {
    import('qrcode').then(QR => {
      QR.toDataURL(text, { width: 300, margin: 2 }).then(setQr)
    })
  }, [text])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center font-bold">T</div>
            <span className="font-semibold">ToolHub</span>
          </Link>
          <Link href="/" className="text-sm text-slate-400 hover:text-white">← Back</Link>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">QR Generator</h1>
          <p className="text-slate-400">Create QR codes instantly</p>
        </div>
        <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-8 max-w-2xl mx-auto">
          <input value={text} onChange={e => setText(e.target.value)} className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl mb-6" placeholder="Enter URL or text" />
          {qr && <div className="text-center"><img src={qr} className="mx-auto bg-white p-4 rounded-xl" /><a href={qr} download="qr.png" className="inline-block mt-4 px-6 py-2 bg-blue-500 rounded-lg">Download PNG</a></div>}
        </div>
      </main>
    </div>
  )
}